// HJ TODO: 유틸 아님 파일 분리 필요
import MotionJson from "@Assets/motion/motion.json";
import { Easing } from "framer-motion";
import { getLocalStorage } from "./storageExtension";
import { STORAGE_KEYS } from "@Constant/storageKeys";

export interface ToOptions {
  x?: number | string;
  y?: number | string;
  rotate?: number | string;
  opacity?: number;
  ease?: Easing;
}

export interface MotionJsonValue {
  to: ToOptions[];
  delay: number;
  duration: number;
}

export interface To {
  x: (number | string)[];
  y: (number | string)[];
  rotate: (number | string)[];
  opacity: number[];
}

export interface Options {
  duration: number;
  delay: number;
  ease: Easing[];
}

export type MotionJsonKeyType = keyof typeof MotionJson;
export type MotionJsonType = Record<MotionJsonKeyType, MotionJsonValue>;

export function getMotionJson(): MotionJsonType {
  return getLocalStorage(STORAGE_KEYS.motion, MotionJson) as MotionJsonType;
}
