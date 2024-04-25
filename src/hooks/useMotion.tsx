import { Easing } from "framer-motion";
import { useState } from "react";
import { ObjectFilter, hasOwn } from "@Utils/objectExtension";
import MotionJson from "@Assets/motion/motion.json";

export interface UseMotionProps {
  id: string;
}

export default function useMotion({ id }: UseMotionProps) {
  const [animationInfo] = useState(() => {
    if (!hasOwn(MotionJson, id)) return null;
    // @ts-ignore
    return convert(MotionJson[id]);
  });

  if (animationInfo === null) {
    throw "Error";
  }

  return animationInfo;
}

interface ToOptions {
  x?: number | string;
  y?: number | string;
  rotate?: number | string;
  opacity?: number;
  ease?: Easing;
}

interface MotionJsonValue {
  to: ToOptions[];
  delay: number;
  duration: number;
}

interface To {
  x: (number | string)[];
  y: (number | string)[];
  rotate: (number | string)[];
  opacity: number[];
}

interface Options {
  duration: number;
  delay: number;
  ease: Easing[];
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
