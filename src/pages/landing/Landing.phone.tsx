import PhoneImage from "@Assets/images/phone.png";
import PhoneInnerImage from "@Assets/images/phone-inner.png";
import PlayButtonLabelImage from "@Assets/images/play-button-label.png";
import PlayButtonImage from "@Assets/images/play-button.png";
import theatre, { animationed } from "@Utils/theatreExtension";
import {
  cObjectLabel,
  cObjectPlayButton,
  cObjectTitle,
  cSheetId,
} from "@Pages/landing/Landing.constant";
import { ComponentProps, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export const LandingPhone = () => {
  return (
    <div
      className={twMerge(
        "flex w-[319px] h-[616px] items-center justify-center absolute top-0 left-0 right-0 bottom-0 m-auto overflow-hidden"
      )}
    >
      <div
        className={`absoulte h-[490px] absolute m-auto left-0 right-0 bg-cover`}
        style={{
          background: `linear-gradient(180deg, rgba(0, 0, 0, 0.80) 2.02%, rgba(0, 0, 0, 0.00) 89.43%), url('${PhoneInnerImage}') 50%, #FFF`,
        }}
      ></div>
      <div className={twMerge("absolute h-full m-auto left-0 right-0")}>
        <img className={twMerge("h-full object-cover")} src={PhoneImage} />
      </div>

      <div className={twMerge("flex items-center justify-center  flex-col")}>
        <ATitle />
        <APlayButtonLabel />
        <APlayButton
          onClick={() => {
            theatre.getSheet(cSheetId).play();
          }}
        />
      </div>
    </div>
  );
};

//#region sub components
interface TitleProps {}
const Title = forwardRef<HTMLSpanElement, TitleProps>((_, ref) => {
  return (
    <span
      className={twMerge(
        "text-white font-normal font-galmuri9 leading-normal whitespace-nowrap"
      )}
      ref={ref}
    >
      우리집 고양이가
      <br />
      인플루언서가 되
    </span>
  );
});
Title.displayName = "Title";
const ATitle = animationed(
  { sheetId: cSheetId, objectId: cObjectTitle },
  Title
);

interface PlayButtonLabelProps {}
const PlayButtonLabel = forwardRef<HTMLDivElement, PlayButtonLabelProps>(
  (_, ref) => {
    return (
      <div className={twMerge("w-[200px] mt-[32px]")} ref={ref}>
        <img src={PlayButtonLabelImage} />
      </div>
    );
  }
);
PlayButtonLabel.displayName = "PlayButtonLabel";
const APlayButtonLabel = animationed(
  {
    sheetId: cSheetId,
    objectId: cObjectLabel,
  },
  PlayButtonLabel
);

interface PlayButtonProps extends ComponentProps<"button"> {}
const PlayButton = forwardRef<HTMLButtonElement, PlayButtonProps>(
  ({ ...restProps }, ref) => {
    return (
      <button className={twMerge("w-[80px] mt-[4px]")} ref={ref} {...restProps}>
        <img src={PlayButtonImage} />
      </button>
    );
  }
);
PlayButton.displayName = "PlayButton";
const APlayButton = animationed(
  { sheetId: cSheetId, objectId: cObjectPlayButton },
  PlayButton
);

//#endregion

//#region logics
//#endregion

//#region styled components
//#endregion
