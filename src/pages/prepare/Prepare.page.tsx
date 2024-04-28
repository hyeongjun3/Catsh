import Button from "@Components/button/Button";
import IconCat from "@Components/icons/IconCat";
import IconSound from "@Components/icons/IconSound";
import VideoPlayer from "@Components/video/VideoPlayer";
import useLateTemplate from "@Hooks/useLateTemplate";
import useVideo from "@Hooks/useVideo";
import { mergeClassName } from "@Utils/styleExtension";
import { useNavigate, useParams } from "react-router-dom";

export default function PreparePage() {
  const navigate = useNavigate();

  const { templateId } = useParams();
  const templateQuery = useLateTemplate();

  const { isMuted, toggleMute } = useVideo({ defaultMuted: false });

  if (templateQuery.status === "pending") return <div>loading</div>;
  if (templateQuery.status === "error") return <div>error</div>;

  const template = templateQuery.data.find(
    (template) => template.id === templateId
  );

  if (!template || template.state !== "ready") return <div>error</div>;

  const goBack = () => navigate(-1);
  const goShooting = () => navigate(`/shooting/${templateId}`);

  return (
    <div className="w-full h-full flex  flex-col  justify-between">
      <div className="relative w-full overflow-hidden max-h-full">
        <VideoPlayer src={template.previewVideoSrc} muted={isMuted} />

        <div className="absolute top-0 flex flex-col w-full h-full py-[24px] px-[16px] justify-between pointer-events-none">
          <div className="flex flex-row justify-between">
            <button
              className="flex flex-row items-center gap-[8px] pointer-events-auto"
              onClick={goBack}
            >
              <div>
                <BackIcon />
              </div>
              <div className="font-yClover text-white font-bold">뒤로가기</div>
            </button>
            <button
              className={mergeClassName(
                "flex justify-center items-center w-[40px] h-[40px] bg-[rgba(255,255,255,0.25)] rounded-[8px] pointer-events-auto"
              )}
              onClick={toggleMute}
            >
              <IconSound />
            </button>
          </div>
          <div className="flex flex-col gap-[8px]">
            <p className="font-yClover font-bold text-[24px] text-white leading-[120%]">
              {template.title}
            </p>
            <div className="flex flex-1 gap-[8px]">
              <IconCat />
              <p className="flex flex-col w-full gap-[8px] font-yClover font-normal text-[14px] leading-[140%] text-white whitespace-pre-line">
                {template.description}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute w-full bottom-[25px] flex flex-row items-center pt-[52px] pb-[40px] px-[16px] gap-[16px] justify-center">
        <Button
          className="w-full h-[56px]"
          variant={"primary"}
          onClick={goShooting}
        >
          직접 촬영할래
        </Button>
        <Button className="w-full h-[56px] bg-[#9CA3AF]" variant={"primary"}>
          업로드할래
        </Button>
      </div>
    </div>
  );
}

function BackIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M12 9.05911V6.50011C11.9997 6.30249 11.9409 6.10938 11.831 5.94513C11.7211 5.78087 11.565 5.65282 11.3825 5.57711C11.2 5.5014 10.9991 5.48141 10.8052 5.51967C10.6113 5.55793 10.4331 5.65273 10.293 5.79211L4 12.0001L10.293 18.2071C10.3857 18.3003 10.4958 18.3742 10.6171 18.4247C10.7385 18.4752 10.8686 18.5011 11 18.5011C11.1314 18.5011 11.2615 18.4752 11.3829 18.4247C11.5042 18.3742 11.6143 18.3003 11.707 18.2071C11.7999 18.1143 11.8736 18.0041 11.9239 17.8828C11.9742 17.7615 12 17.6314 12 17.5001V15.0111C14.75 15.0791 17.755 15.5771 20 19.0001V18.0001C20 13.3671 16.5 9.55711 12 9.05911Z"
        fill="white"
      />
    </svg>
  );
}
