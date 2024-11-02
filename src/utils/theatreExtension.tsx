import {
  getProject,
  IProject,
  ISheet,
  ISheetObject,
  onChange,
  types,
  UnknownShorthandCompoundProps,
} from "@theatre/core";
import studio from "@theatre/studio";

import { isNil, isNotNil } from "@Utils/check";
import { shareRef } from "@Utils/reactExtension";

import { ComponentType, forwardRef, memo, useEffect, useRef } from "react";

class CustomStudio {
  private static m_instance: CustomStudio;
  private m_isInitialized: Boolean;

  public static getInstance() {
    if (!this.m_instance) this.m_instance = new this();
    return this.m_instance;
  }

  constructor() {
    this.m_isInitialized = false;
  }

  public initialize() {
    if (this.m_isInitialized) return;
    studio.initialize();
    this.extension();
    this.m_isInitialized = true;
  }

  public extension() {}
}

const customStudio = CustomStudio.getInstance();

class Theatre {
  private static m_instance: Theatre;
  private m_project: IProject;
  private m_sheetMap: Map<string, TheatreSheet>;

  public static getInstance() {
    if (!this.m_instance) this.m_instance = new this();
    return this.m_instance;
  }

  constructor() {
    customStudio.initialize();

    this.m_project = getProject("catsch");
    this.m_sheetMap = new Map();

    studio.onSelectionChange((items) => {
      for (const item of items) {
        if (item.type === "Theatre_SheetObject_PublicAPI") {
          const targetSheet = this.getSheet(item.address.sheetId);
          const object = targetSheet.getEl(item.address.objectKey);
          if (isNil(object)) {
            //asert
            return;
          }
          object.animate(
            [
              { outline: "2px solid red", backgroundColor: "yellow" }, // 초기 상태
              {
                outline: "2px solid transparent",
                backgroundColor: "transparent",
              }, // 중간 상태 (깜빡임)
              // { outline: "2px solid red", backgroundColor: "yellow" }, // 다시 원래 상태
            ],
            {
              duration: 1000, // 1초간 애니메이션 지속
              iterations: 2, // 무한 반복
              // easing: "ease-in-out", // 부드러운 전환
            }
          );
        } else {
          console.log(item);
        }
      }
    });
  }

  public getSheet(sheetId: string) {
    if (!this.m_sheetMap.has(sheetId)) {
      const newSheet = new TheatreSheet(this.m_project, sheetId);
      this.m_sheetMap.set(sheetId, newSheet);
    }
    return this.m_sheetMap.get(sheetId)!;
  }
}

interface SheetObjectProps extends UnknownShorthandCompoundProps {
  x: ReturnType<typeof types.number>;
  y: ReturnType<typeof types.number>;
  width: ReturnType<typeof types.number>;
  height: ReturnType<typeof types.number>;
  opacity: ReturnType<typeof types.number>;
  scaleX: ReturnType<typeof types.number>;
  scaleY: ReturnType<typeof types.number>;
  rotate: ReturnType<typeof types.number>;
  transformOrigin: ReturnType<typeof types.string>;
  isHidden: ReturnType<typeof types.boolean>;
}

class TheatreSheet {
  private m_sheet: ISheet;
  private m_objMap: Map<string, ISheetObject<SheetObjectProps>>;
  private m_elMap: Map<string, HTMLElement>;

  constructor(project: IProject, sheetId: string) {
    this.m_sheet = project.sheet(sheetId);
    this.m_objMap = new Map();
    this.m_elMap = new Map();

    onChange(this.m_sheet.sequence.pointer.length, () => {
      console.log("change!");
    });
  }

  public getObject(objectId: string, el?: HTMLElement) {
    if (!this.m_objMap.has(objectId)) {
      const newObject = this.m_sheet.object(objectId, {
        x: types.number(0, { nudgeMultiplier: 1 }),
        y: types.number(0, { nudgeMultiplier: 1 }),
        width: types.number(100, { range: [0, 100], nudgeMultiplier: 1 }),
        height: types.number(100, { range: [0, 100], nudgeMultiplier: 1 }),
        opacity: types.number(1, { range: [0, 1] }),
        scaleX: types.number(1, { nudgeMultiplier: 0.01 }),
        scaleY: types.number(1, { nudgeMultiplier: 0.01 }),
        rotate: types.number(0, { range: [-360, 360], nudgeMultiplier: 1 }),
        transformOrigin: types.string("center"),
        isHidden: types.boolean(false),
      });
      this.m_objMap.set(objectId, newObject);
      isNotNil(el) && this.m_elMap.set(objectId, el);
    }

    return this.m_objMap.get(objectId)!;
  }

  public detachObject(objectId: string) {
    this.m_sheet.detachObject(objectId);
    this.m_objMap.delete(objectId);
    this.m_elMap.delete(objectId);
  }

  public getEl(objectId: string) {
    return this.m_elMap.get(objectId);
  }

  public play() {
    this.m_sheet.sequence.play();
  }
}

const theatre = Theatre.getInstance();
export default theatre;

interface AnimationedProps {
  sheetId: string;
  objectId: string;
}
export function animationed<TProps, TRef extends HTMLElement>(
  { sheetId, objectId }: AnimationedProps,
  Component: ComponentType<TProps>
) {
  const AnimationedComponent = memo(
    forwardRef<TRef, TProps>((props, ref) => {
      const localRef = useRef<TRef>(null);

      useEffect(() => {
        const el = localRef.current;
        if (isNil(el)) return;

        const { width, height } = el.getBoundingClientRect();

        const sheet = theatre.getSheet(sheetId);
        const obj = sheet.getObject(objectId, el);
        const beforeDisplay = getComputedStyle(el).display;

        obj.onValuesChange((values) => {
          el.style.scale = `${values.scaleX} ${values.scaleY}`;
          el.style.opacity = `${values.opacity}`;
          el.style.transform = `translate(${values.x}px, ${values.y}px) rotate(${values.rotate}deg)`;
          el.style.transformOrigin = values.transformOrigin;
          el.style.display = values.isHidden ? "none" : beforeDisplay;

          const pxHeight = height * (values.height / 100);
          const pxWidth = width * (values.width / 100);
          el.style.height = `${pxHeight}px`;
          el.style.width = `${pxWidth}px`;
        });

        return () => {
          sheet.detachObject(objectId);
        };
      }, []);

      return <Component ref={shareRef(localRef, ref)} {...props} />;
    })
  );
  const newDisplayName = Component.displayName ?? Component.name;
  AnimationedComponent.displayName = `Forwarded${newDisplayName}`;

  return AnimationedComponent;
}
