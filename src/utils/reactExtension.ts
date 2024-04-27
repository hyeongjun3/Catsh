import { MutableRefObject, RefCallback } from "react";

type RefType<T> = MutableRefObject<T> | RefCallback<T> | null;

export const shareRef =
  <T>(localRef: RefType<T>, forwardRef: RefType<T>): RefCallback<T> =>
  (instance) => {
    if (typeof localRef === "function") {
      localRef(instance);
    } else if (localRef && instance) {
      localRef.current = instance;
    }
    if (typeof forwardRef === "function") {
      forwardRef(instance);
    } else if (forwardRef && instance) {
      forwardRef.current = instance;
    }
  };
