import { LandingCat } from "@Pages/landing/Landing.cat";
import { LandingPhone } from "@Pages/landing/Landing.phone";

export default function LandingPage() {
  return (
    <div className={twMerge("relative w-full h-screen")}>
      <LandingPhone />
      <LandingCat />
    </div>
  );
}
