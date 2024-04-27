import { useState } from "react";
import { ObjectFilter, hasOwn } from "@Utils/objectExtension";
import {
  MotionJsonValue,
  Options,
  Styles,
  To,
  ToOptions,
  getMotionJson,
} from "@Utils/motionManager";

export interface UseMotionProps {
  id: string;
}

export default function useMotion({ id }: UseMotionProps) {
  const [animationInfo] = useState(() => {
    const motionJson = getMotionJson();

    if (!hasOwn(motionJson, id)) return null;
    return convert(motionJson[id]);
  });

  if (animationInfo === null) {
    throw "Error";
  }

  return animationInfo;
}

function convert(info: MotionJsonValue) {
  const to: To = { x: [], y: [], rotate: [], opacity: [], scale: [] };
  const options: Options = {
    delay: 0,
    duration: 0,
    ease: [],
  };

  const styles: Styles = {
    originX: "50%",
    originY: "50%",
  };

  // mapping to
  info.to.forEach((item) => {
    Object.entries(item).forEach(([key, value]) => {
      const newKey = key as keyof ToOptions;

      if (newKey === "ease") {
        options.ease.push(value);
      } else {
        to[newKey].push(value);
      }
    });
  });

  // mapping options
  options.duration = info.duration;
  options.delay = info.delay;

  // mapping sytles
  styles.originX = info.originX;
  styles.originY = info.originX;

  const filteredTo = ObjectFilter(
    to,
    ({ value }) => !(value instanceof Array && value.length === 0)
  );

  const filteredOptions = ObjectFilter(
    options,
    ({ value }) => !(value instanceof Array && value.length === 0)
  );

  const filteredStyles = ObjectFilter(
    styles,
    ({ value }) => !(value instanceof Array && value.length === 0)
  );

  return { to: filteredTo, options: filteredOptions, styles: filteredStyles };
}
