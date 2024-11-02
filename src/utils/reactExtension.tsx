import {
  ComponentRef,
  ComponentType,
  forwardRef,
  memo,
  MutableRefObject,
  RefCallback,
} from "react";

type RefType<T> = MutableRefObject<T> | RefCallback<T> | null;

export const shareRef =
  <T,>(localRef: RefType<T>, forwardRef: RefType<T>): RefCallback<T> =>
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

export const forwardProps = <TProps,>(Component: ComponentType<TProps>) => {
  return <TForwardProps extends Partial<TProps>>(
    forwardedProps: TForwardProps
  ) => {
    const ForwardedComponent = memo(
      forwardRef<
        ComponentRef<typeof Component>,
        Omit<TProps, keyof TForwardProps>
      >((props, ref) => {
        const mergedProps = { ...forwardedProps, ...props } as TProps;
        return <Component ref={ref} {...mergedProps} />;
      })
    );
    const newDisplayName = Component.displayName ?? Component.name;
    ForwardedComponent.displayName = `Forwarded${newDisplayName}`;

    return ForwardedComponent;
  };
};
