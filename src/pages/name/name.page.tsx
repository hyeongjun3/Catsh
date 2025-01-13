import IconLeft from "@Assets/icons/icon-left.svg";
import { useNavigate } from "react-router-dom";
import SpeechBubble2 from "@Assets/images/speech-bubble2.png";
import CatFull from "@Assets/images/cat-full.png";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

interface NamePageProps {}
export const NamePage = ({}: NamePageProps) => {
  const [name, setName] = useState("");

  return (
    <div className={" w-full h-screen pt-[54px] flex flex-col items-center"}>
      <BackButton />

      <div className={"mt-[87px]"}>
        <div
          className={twMerge(
            "w-[320px] h-[100px] relative flex justify-center"
          )}
          style={{ backgroundImage: `url("${SpeechBubble2}")` }}
        >
          <span
            className={twMerge(
              "absolute top-[29px] font-galmuri9 text-[14px] font-bold"
            )}
          >
            최대 8글자
            <span className={twMerge("text-[#919191]")}>
              (영문 16글자)
            </span>{" "}
            입력 할 수 있어
          </span>
        </div>
      </div>

      <div className={twMerge("mt-[43px]")}>
        <input
          className={twMerge(
            "w-[227px] font-galmuri9 text-[24px] font-bold placeholder:text-[#CED1D5] text-[#3E2731] text-center"
          )}
          placeholder="이름을 입력해주세요"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div
        className={twMerge(
          "flex w-full justify-center items-end mt-auto mb-[48px]  "
        )}
      >
        <img src={CatFull} />
      </div>
    </div>
  );
};

//#region sub components
const BackButton = () => {
  const navigate = useNavigate();

  return (
    <div className={twMerge("flex px-[12px] w-full")}>
      <button onClick={() => navigate(-1)}>
        <img src={IconLeft} />
      </button>
    </div>
  );
};

//#endregion

//#region logics
//#endregion

//#region styled components
//#endregion
