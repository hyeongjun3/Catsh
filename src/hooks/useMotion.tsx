import { useState } from "react";
import { ObjectFilter, hasOwn } from "@Utils/objectExtension";
import {
  MotionJsonValue,
  Options,
  To,
  getMotionJson,
} from "@Utils/motionManager";

export interface UseMotionProps {
  id: string;
}

export default function useMotion({ id }: UseMotionProps) {
  const [animationInfo] = useState(() => {
    const motionJson = getMotionJson();

    if (!hasOwn(motionJson, id)) return null;
    // @ts-ignore
    return convert(motionJson[id]);
  });

  if (animationInfo === null) {
    throw "Error";
  }

  return animationInfo;
}

function convert(info: MotionJsonValue) {
  const to: To = { x: [], y: [], rotate: [], opacity: [] };
  const options: Options = {
    delay: 0,
    duration: 0,
    ease: [],
  };

  info.to.forEach((item) => {
    Object.entries(item).forEach(([key, value]) => {
      if (key === "ease") {
        options.ease.push(value);
      } else {
        // @ts-ignore
        to[key].push(value);
      }
    });
  });

  options.duration = info.duration;
  options.delay = info.delay;

  const filteredTo = ObjectFilter(
    to,
    ({ value }) => !(value instanceof Array && value.length === 0)
  );

  const filteredOptions = ObjectFilter(
    options,
    ({ value }) => !(value instanceof Array && value.length === 0)
  );

  return { to: filteredTo, options: filteredOptions };
}
