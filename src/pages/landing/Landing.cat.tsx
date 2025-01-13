import PhoneCat from "@Assets/images/phone-cat.gif";
import { twMerge } from "tailwind-merge";
export const LandingCat = () => {
  return (
    <div
      className={twMerge(
        "absolute w-[240px] z-20 bottom-[-10px] mx-auto left-0 right-0"
      )}
    >
      <img className={twMerge("w-full")} src={PhoneCat} />
    </div>
  );
};

//#region sub components
//#endregion

//#region logics
//#endregion

//#region styled components
//#endregion
