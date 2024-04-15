import Button from "@Components/button/Button";
import Templates from "@Constant/templates";
import { useNavigate, useParams } from "react-router-dom";

export default function PreparePage() {
  const { templateId } = useParams();
  const navigate = useNavigate();

  // @ts-expect-error
  const templateInfo: (typeof Templates)["id1"] = Templates?.[templateId];

  if (!templateInfo) {
    throw new Error("invalid template id");
  }

  const goBack = () => navigate(-1);

  const { label, title, description, src } = templateInfo;

  return (
    <div className="w-full h-full flex  flex-col  justify-between">
      <div className="relative w-full overflow-hidden max-h-full">
        <img className="w-full h-full" src={src} />
        <div className="absolute top-0 flex flex-col w-full h-full py-[24px] px-[16px] justify-between">
          <div className="flex flex-row justify-between">
            <button
              className="flex flex-row items-center gap-[8px]"
              onClick={goBack}
            >
              <div>
                <BackIcon />
              </div>
              <div className="font-yClover text-white font-bold">뒤로가기</div>
            </button>
            <button className="flex justify-center items-center w-[40px] h-[40px] bg-[rgba(255,255,255,0.25)] rounded-[8px]">
              <IconSound />
            </button>
          </div>
          <div className="flex flex-col gap-[20px]">
            <div className="flex flex-col gap-[8px]">
              <div className="py-[4px] px-[8px] w-fit rounded-full bg-[#FCD55F] font-yClover font-bold text-[#191919]">
                {label}
              </div>
              <div className="font-yClover font-bold text-white leading-5">
                {title}
              </div>
            </div>
            <div className="flex flex-col gap-[8px] font-yClover font-regular text-white">
              {description.map((item) => (
                <div key={item}>{item}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center pt-[52px] pb-[40px] px-[16px] gap-[16px] justify-center">
        <Button className="w-full" variant={"primary"}>
          직접 촬영할래
        </Button>
        <Button className="w-full" variant={"primary"}>
          업로르할래
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

function IconSound() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
    >
      <path
        d="M2.04617 14.4299C1.60587 13.6959 1.37329 12.856 1.37329 12C1.37329 11.1441 1.60587 10.3042 2.04617 9.57016C2.18156 9.34419 2.36273 9.14905 2.57804 8.99728C2.79335 8.8455 3.03803 8.74044 3.29635 8.68886L5.42784 8.26206C5.55495 8.23689 5.6696 8.16891 5.75266 8.06944L8.35626 4.94335C9.8444 3.15557 10.5897 2.26294 11.2532 2.50341C11.9192 2.74388 11.9192 3.90719 11.9192 6.23382V17.7688C11.9192 20.0941 11.9192 21.2562 11.2545 21.4979C10.591 21.7371 9.84566 20.8445 8.35752 19.058L5.75014 15.9306C5.6674 15.8314 5.55324 15.7634 5.42658 15.738L3.29509 15.3112C3.03677 15.2596 2.79209 15.1546 2.57678 15.0028C2.36147 14.851 2.18156 14.6559 2.04617 14.4299Z"
        fill="white"
      />
      <path
        d="M15.1121 7.54826C16.2867 8.7229 16.9495 10.3142 16.9559 11.9755C16.9622 13.6367 16.3117 15.233 15.1461 16.4166M20.3004 4.87793C22.1799 6.75719 23.2404 9.30317 23.2507 11.961C23.2611 14.6188 22.2205 17.173 20.3558 19.0668"
        stroke="white"
        strokeWidth="2.518"
        strokeLinecap="round"
      />
    </svg>
  );
}
