import Button from "@Components/button/Button";
import useModal from "@Hooks/useModal";
import { ComponentProps, ReactNode, forwardRef } from "react";
import { createPortal } from "react-dom";
import {
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from "react-hook-form";
import {
  MotionJsonKeyType,
  MotionJsonType,
  MotionJsonValue,
  getMotionJson,
} from "@Utils/motionManager";
import { ObjectClean } from "@Utils/objectExtension";
import { setLocalStorage } from "@Utils/storageExtension";
import { STORAGE_KEYS } from "@Constant/storageKeys";
import MotionJson from "@Assets/motion/motion.json";
import { download } from "@Utils/download";
import getCurrentDate from "@Utils/dateExtension";

interface CheatLayoutProps {
  children: ReactNode;
}

export default function CheatLayout({ children }: CheatLayoutProps) {
  return (
    <>
      {createPortal(
        <div className="absolute top-1 left-0 right-0 py-3 flex justify-center">
          <MotionSettingButton />
        </div>,
        document.body
      )}
      {children}
    </>
  );
}

function MotionSettingButton() {
  const { isOpen, open, close } = useModal();

  return (
    <>
      <Button variant={"primary"} onClick={open}>
        모션 설정
      </Button>
      <MotionSettingModal isOpen={isOpen} onClose={close} />
    </>
  );
}

interface MotionSettingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function MotionSettingModal({ isOpen, onClose }: MotionSettingModalProps) {
  const motionJson = getMotionJson();
  const form = useForm({ defaultValues: motionJson });

  const store = (data: typeof motionJson) => {
    setLocalStorage(STORAGE_KEYS.motion, ObjectClean(data));
  };

  const exportJson = (data: typeof motionJson) => {
    download(`${getCurrentDate()}.json`, JSON.stringify(ObjectClean(data)));
  };

  const reset = () => form.reset(MotionJson);

  if (!isOpen) return <></>;
  return (
    <>
      {createPortal(
        <FormProvider {...form}>
          <div className="absolute bg-[rgb(209,213,219)] top-1 flex w-[calc(100%-16px)] left-0 right-0 m-auto py-4 px-2 rounded-lg flex-col gap-2 z-10">
            <div className="flex justify-between w-full items-center">
              <p className="font-yClover text-base font-bold">모션 설정</p>
              <div className="flex gap-2">
                <Button variant={"primary"} onClick={form.handleSubmit(store)}>
                  저장
                </Button>
                <Button variant={"primary"} onClick={reset}>
                  초기화
                </Button>
                <Button
                  variant={"primary"}
                  onClick={form.handleSubmit(exportJson)}
                >
                  내보내기
                </Button>
                <Button variant={"primary"} onClick={onClose}>
                  닫기
                </Button>
              </div>
            </div>
            <form className="flex flex-col h-[500px] overflow-auto gap-1">
              {Object.entries(motionJson).map(([key, value]) => {
                return (
                  <SettingArea
                    key={key}
                    keyName={key as MotionJsonKeyType}
                    value={value}
                  />
                );
              })}
            </form>
          </div>
        </FormProvider>,
        document.body
      )}
    </>
  );
}

function SettingArea<T extends MotionJsonKeyType>({
  keyName,
}: {
  keyName: T;
  value: MotionJsonValue;
}) {
  const { register, control } = useFormContext<MotionJsonType>();
  const { fields, remove, append } = useFieldArray({
    control,
    name: `${keyName}.to`,
  });

  return (
    <div className="flex flex-col gap-2 rounded-sm border border-sky-100 border-solid py-2 px-1">
      <div className="flex flex-row items-center w-full gap-4">
        <p className="font-yClover font-normal text-[14px] w-[180px]">
          {keyName}
        </p>
        <Button variant={"primary"} onClick={() => append({})}>
          +
        </Button>
      </div>
      <SettingInput
        label="duration"
        type="number"
        step={0.01}
        {...register(`${keyName}.duration`)}
      />
      <SettingInput
        label="delay"
        type="number"
        step={0.01}
        {...register(`${keyName}.delay`)}
      />
      <div className="border-sky-100 border-solid flex flex-col gap-2">
        {fields.map((item, idx) => {
          return (
            <div key={item.id} className="flex flex-row gap-2">
              <div className="flex flex-col">
                {["x", "y", "rotate", "opacity", "ease"].map((key) => {
                  const formName = `${keyName}.to[${idx}].${key}` as const;
                  return (
                    <SettingInput
                      key={key}
                      label={key}
                      {...register(formName)}
                    />
                  );
                })}
              </div>
              <Button variant={"primary"} onClick={() => remove(idx)}>
                -
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface SettingInputProps extends ComponentProps<"input"> {
  label: string;
}

const SettingInput = forwardRef<HTMLInputElement, SettingInputProps>(
  ({ label, ...props }, ref) => {
    return (
      <div className="flex gap-2 items-center">
        <label className="w-[80px] font-yClover">{label}</label>
        <input ref={ref} className="p-1" placeholder="입력" {...props} />
      </div>
    );
  }
);
