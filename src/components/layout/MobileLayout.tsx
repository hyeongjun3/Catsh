import { AnimatePresence } from "framer-motion";
import { cloneElement } from "react";
import { useLocation, useOutlet } from "react-router-dom";

export default function MobileLayout() {
  const { pathname } = useLocation();
  const outlet = useOutlet();

  return (
    <div className="w-screen bg-white h-dvh flex justify-center">
      <section
        id="mobile-layout"
        className="w-[500px] relative h-full bg-[#1A1A1A] overflow-auto"
      >
        <AnimatePresence initial={false}>
          {outlet && cloneElement(outlet, { key: pathname })}
        </AnimatePresence>
      </section>
    </div>
  );
}
