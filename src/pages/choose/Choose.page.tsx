import Card, { CardProps } from "@Components/Card/Card";
import Base64 from "@Constant/base64";
import { createRepeatBackground, mergeClassName } from "@Utils/styleExtension";
import SampleImage1 from "@Assets/images/sample-image1.png";
import SampleImage2 from "@Assets/images/sample-image2.png";
import SampleImage3 from "@Assets/images/sample-image3.png";
import SampleImage4 from "@Assets/images/sample-image4.png";

export default function ChoosePage() {
  return (
    <div className="flex flex-col h-full">
      <Top />
      <div className="flex flex-col px-[24px] overflow-y-auto gap-[32px]">
        <Middle />
        <Content />
      </div>
    </div>
  );
}

function Top() {
  return (
    <div className=" pt-[24px] pb-[8px] pr-[16px] flex gap-[26px]">
      <div
        className="w-full"
        style={{
          backgroundImage: createRepeatBackground(
            Base64.rectange,
            17,
            20,
            24,
            "row"
          ),
          backgroundPositionX: "left",
          backgroundRepeat: "repeat-x",
          backgroundPositionY: "center",
          transform: "scale(-1,-1)",
        }}
      />
      <button className="min-w-[16px]">
        <IconMenu />
      </button>
    </div>
  );
}

function IconMenu() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.80005 8.00002C4.80005 7.57568 4.96862 7.16871 5.26868 6.86865C5.56874 6.5686 5.9757 6.40002 6.40005 6.40002H25.6C26.0244 6.40002 26.4314 6.5686 26.7314 6.86865C27.0315 7.16871 27.2001 7.57568 27.2001 8.00002C27.2001 8.42437 27.0315 8.83134 26.7314 9.1314C26.4314 9.43145 26.0244 9.60002 25.6 9.60002H6.40005C5.9757 9.60002 5.56874 9.43145 5.26868 9.1314C4.96862 8.83134 4.80005 8.42437 4.80005 8.00002ZM4.80005 16C4.80005 15.5757 4.96862 15.1687 5.26868 14.8687C5.56874 14.5686 5.9757 14.4 6.40005 14.4H25.6C26.0244 14.4 26.4314 14.5686 26.7314 14.8687C27.0315 15.1687 27.2001 15.5757 27.2001 16C27.2001 16.4244 27.0315 16.8313 26.7314 17.1314C26.4314 17.4315 26.0244 17.6 25.6 17.6H6.40005C5.9757 17.6 5.56874 17.4315 5.26868 17.1314C4.96862 16.8313 4.80005 16.4244 4.80005 16ZM4.80005 24C4.80005 23.5757 4.96862 23.1687 5.26868 22.8687C5.56874 22.5686 5.9757 22.4 6.40005 22.4H25.6C26.0244 22.4 26.4314 22.5686 26.7314 22.8687C27.0315 23.1687 27.2001 23.5757 27.2001 24C27.2001 24.4244 27.0315 24.8313 26.7314 25.1314C26.4314 25.4315 26.0244 25.6 25.6 25.6H6.40005C5.9757 25.6 5.56874 25.4315 5.26868 25.1314C4.96862 24.8313 4.80005 24.4244 4.80005 24Z"
        fill="white"
      />
    </svg>
  );
}

function Middle() {
  return (
    <div className="mt-[16px] flex flex-row gap-[24px]">
      <div className="w-[80px] h-[80px] rounded-full bg-[#DAD9D9]">
        <img />
      </div>
      <div className="flex flex-col justify-center gap-[8px] font-yClover font-bold text-[#FCD55F]">
        <span className="text-[24px]">@ catsch</span>
        <span className="text-[16px]">너도 찍어볼래냥?</span>
      </div>
    </div>
  );
}

function Content() {
  const items: [CardProps[], CardProps[]] = [
    [
      {
        label: "생일 축하",
        description: "템플릿이름 길이가 길어질 경우 2줄",
        src: SampleImage1,
      },
      {
        label: "생일 축하",
        description: "템플릿 이름",
        src: SampleImage3,
        disabled: true,
      },
      {
        label: "생일 축하",
        description: "템플릿이름 길이가 길어질 경우 2줄",
        src: SampleImage4,
        disabled: true,
      },
    ],
    [
      {
        label: "인절미",
        description: "템플릿 이름",
        src: SampleImage2,
      },
      {
        label: "키치",
        description: "템플릿 이름",
        src: SampleImage4,
        disabled: true,
      },
      {
        label: "인절미",
        description: "템플릿 이름",
        src: SampleImage2,
        disabled: true,
      },
    ],
  ];

  return (
    <div className="flex flex-row gap-[8px]">
      {items.map((item, idx) => {
        const margin = idx === 1 ? "mt-[88px]" : "";
        return (
          <div
            key={idx}
            className={mergeClassName("flex flex-col gap-[8px] w-full", margin)}
          >
            {item.map((props, idx2) => {
              return <Card key={idx2} {...props} />;
            })}
          </div>
        );
      })}
    </div>
  );
}
