import { mergeClassName } from "@Utils/styleExtension";
import { TemplateType } from "@Utils/templateManager";
import { ComponentProps } from "react";

export interface CardProps
  extends Omit<ComponentProps<"button">, "id" | "title">,
    Pick<TemplateType, "id" | "title" | "thumbnailSrc" | "state"> {}

export default function Card({
  id,
  title,
  thumbnailSrc,
  state,
  className,
  ...restProps
}: CardProps) {
  const disabled = state === "preparing";

  return (
    <button
      className={mergeClassName(
        "flex rounded-[14px] overflow-hidden relative aspect-[160/240]",
        className
      )}
      disabled={disabled}
      {...restProps}
    >
      <img className="w-full" src={thumbnailSrc} />
      <div className="absolute bottom-[12px] left-[12px] right-[19px] flex flex-col gap-[8px] items-start text-left">
        <p className="font-yClover font-bold text-white leading-5">{title}</p>
      </div>
      {disabled && (
        <div className="absolute w-full h-full bg-[rgba(0,0,0,0.7)] flex items-center justify-center">
          <p className="font-yClover text-[#DCDCDC] font-bold">준비 중이다냥</p>
        </div>
      )}
    </button>
  );
}
