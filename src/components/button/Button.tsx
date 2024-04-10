import { mergeClassName } from "@Utils/styleExtension";
import { ComponentProps } from "react";

type ButtonVariant = "primary";
interface ButtonProps extends ComponentProps<"button"> {
  variant: ButtonVariant;
}

export default function Button({
  variant,
  className,
  ...restprops
}: ButtonProps) {
  const getBoxStyle = () => {
    const defaultStyle =
      "h-[40px] bg-[#FCD55F] px-[16px] flex items-center rounded-[8px] justify-center";
    const hoverStyle =
      "hover:bg-[#FBC82D] hover:shadow-[0px_0px_2px_0px_rgba(251,_200,_45,_0.80),_0px_0px_8px_0px_rgba(251,_200,_45,_0.25)]";
    const activeSytle = "active:bg-[#D7A304]";

    return mergeClassName(defaultStyle, hoverStyle, activeSytle);
  };

  const getBorderStyle = () => {
    const defaultStyle = "border-[#FBC114]";
    const hoverStyle = "hover:border-[F0B605]";
    const activeStyle = "active:border-[D7A304]";

    return mergeClassName(defaultStyle, hoverStyle, activeStyle);
  };

  const getTypo = () => {
    return "font-yClover text-base font-bold text-blue text-center";
  };

  return (
    <button
      className={mergeClassName(
        getBoxStyle(),
        getBorderStyle(),
        getTypo(),
        className
      )}
      {...restprops}
    />
  );
}
