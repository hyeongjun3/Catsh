import { AnimatePresence } from "framer-motion";
import { cloneElement } from "react";
import { useLocation, useOutlet } from "react-router-dom";

export default function MobileLayout() {
  const { pathname } = useLocation();
  const outlet = useOutlet();

  return (
    <div className={twMerge("w-screen bg-[##FFF] h-dvh flex justify-center")}>
      <section
        id="mobile-layout"
        className={twMerge("w-[375px] relative h-full overflow-hidden")}
      >
        <AnimatePresence initial={false}>
          {outlet && cloneElement(outlet, { key: pathname })}
        </AnimatePresence>
      </section>
    </div>
  );
}
