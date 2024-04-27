import Card from "@Components/Card/Card";
import Base64 from "@Constant/base64";
import { createRepeatBackground, mergeClassName } from "@Utils/styleExtension";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import useMotion from "@Hooks/useMotion";
import CatImage2 from "@Assets/images/cat2.png";
import { TemplateType, getTemplate } from "@Utils/templateManager";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@Constant/queryKeys";
import lodash from "lodash";

export default function ChoosePage() {
  const motionContent = useMotion({ id: "choosepage-content" });

  return (
    <motion.div
      className="flex flex-col w-full h-full absolute"
      initial={{ y: "100%" }}
      animate={motionContent.to}
      transition={motionContent.options}
    >
      <Top />
      <div className="flex flex-col px-[24px] overflow-y-auto gap-[32px]">
        <Middle />
        <Content />
      </div>
    </motion.div>
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
      <div className="w-[80px] h-[80px] rounded-full bg-[#DAD9D9] overflow-hidden">
        <img src={CatImage2} className="scale-[1.3]" />
      </div>
      <div className="flex flex-col justify-center gap-[8px] font-yClover font-bold text-[#FCD55F]">
        <span className="text-[24px]">@ catsch</span>
        <span className="text-[16px]">너도 찍어볼래냥?</span>
      </div>
    </div>
  );
}

function Content() {
  const navigate = useNavigate();
  const templateQuery = useQuery({
    queryKey: [QUERY_KEYS.template],
    queryFn: getTemplate,
  });

  // HJ TODO: loading에 기능...
  if (templateQuery.status === "pending") {
    return <div>loading</div>;
  }

  if (templateQuery.status === "error") {
    return <div>error</div>;
  }

  const originTemplates = templateQuery.data;
  const separatedTemplates: [TemplateType[], TemplateType[]] = [[], []];
  originTemplates.forEach((template, idx) => {
    if (idx % 2 === 0) separatedTemplates[0].push(template);
    else separatedTemplates[1].push(template);
  });

  const goNext = (templateId: string) => {
    navigate(`/prepare/${templateId}`);
  };

  return (
    <div className="flex flex-row gap-[8px]">
      {separatedTemplates.map((templates, idx) => {
        const margin = idx === 1 ? "mt-[88px]" : "";
        return (
          <div
            key={idx}
            className={mergeClassName("flex flex-col gap-[8px] w-full", margin)}
          >
            {templates.map((template) => {
              return (
                <Card
                  key={template.id}
                  {...lodash.pick(template, [
                    "thumbnailSrc",
                    "id",
                    "title",
                    "state",
                  ])}
                  onClick={() => goNext(template.id)}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
