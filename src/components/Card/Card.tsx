import { mergeClassName } from "@Utils/styleExtension";
import { ComponentProps } from "react";

export interface CardProps extends ComponentProps<"button"> {
  label: string;
  description: string;
  src: string;
}

export default function Card({
  label,
  description,
  className,
  src,
  ...restProps
}: CardProps) {
  const { disabled } = restProps;

  return (
    <button
      className={mergeClassName(
        "flex rounded-[14px] overflow-hidden relative aspect-[160/240]",
        className
      )}
      {...restProps}
    >
      <img className="w-full" src={src} />
      <div className="absolute bottom-[12px] left-[12px] right-[19px] flex flex-col gap-[8px] items-start text-left">
        <div className="py-[4px] px-[8px] rounded-full bg-[#FCD55F] font-yClover font-bold text-[#191919]">
          {label}
        </div>
        <div className="font-yClover font-bold text-white leading-5">
          {description}
        </div>
      </div>
      {disabled && (
        <div className="absolute w-full h-full bg-[rgba(0,0,0,0.7)] flex items-center justify-center">
          <span className="font-yClover text-[#DCDCDC] font-bold">
            준비 중이다냥
          </span>
        </div>
      )}
    </button>
  );
}
