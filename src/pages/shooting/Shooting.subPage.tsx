import indexedDBManager from "@Utils/indexedDBManager";
import ShootingManager from "@Utils/shootingManager";
import { mergeClassName } from "@Utils/styleExtension";
import { TemplateReadyType } from "@Utils/templateManager";
import { AnimationScope, motion } from "framer-motion";
import { ComponentProps, forwardRef, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";

// HJ TODO: loading state 제거 및 ref useEffect로 넣어서 cleanup 실행

export default function ShootingSubPage({
  template,
}: {
  template: TemplateReadyType;
}) {
  const navigate = useNavigate();

  const [status, setStatus] = useState<"idle" | "camOn" | "recording">("idle");
  const [shootingManager] = useState(new ShootingManager());
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const goBack = () => navigate(-1);

  const start = async () => {
    if (status === "idle") {
      shootingManager.turnOnCam();
      setStatus("camOn");
    } else if (status === "camOn") {
      shootingManager.recording(async (blob) => {
        await indexedDBManager.addRecordingObject({ id: template.id, blob });
        navigate(`/confirm/${template.id}`);
      });
      await shootingManager.shooting();
      setStatus("recording");
    }
  };

  const flipCamera = () => {
    shootingManager.flipCamera();
  };

  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;
    shootingManager.setUp(
      canvasEl,
      template.recordVideoWebmSrc,
      template.recordVideoMovSrc,
      template.previewVideoSrc,
      template.title
    );

    return () => {
      shootingManager.pause();
    };
  }, []);

  return (
    <div className={twMerge("flex h-full flex-col justify-between")}>
      <div className={twMerge("flex h-full relative")}>
        <canvas
          ref={canvasRef}
          className={twMerge("absolute w-full aspect-[9/16]")}
        />

        {/* <div className={twMerge("absolute bottom-[32px] left-0 right-0 m-auto z-10 w-fit")}>
          <RecordButton />
        </div> */}
        <PlayButton
          className={twMerge(
            "absolute bottom-[32px] left-0 right-0 m-auto z-10"
          )}
          onClick={start}
        >
          {status === "idle" ? "시작" : "촬영"}
        </PlayButton>

        <div
          className={twMerge(
            "absolute top-[24px] left-[14px] flex flex-row items-center gap-[8px]"
          )}
          onClick={goBack}
        >
          <IconBack />
          <p className={twMerge("font-yClover text-white font-bold")}>
            뒤로가기
          </p>
        </div>
        <div
          className={twMerge(
            "absolute top-[24px] right-[14px] flex flex-row justify-center gap-[16px]"
          )}
        >
          <IconButton className={twMerge("bg-[rgba(255,255,255,0.25)]")}>
            <IconStick />
          </IconButton>
          <IconButton
            className={twMerge("bg-[rgba(255,255,255,0.25)]")}
            onClick={flipCamera}
          >
            <IconCamera />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

function IconButton({ className, ...props }: ComponentProps<"button">) {
  return (
    <button
      className={mergeClassName(
        "flex justify-center items-center gap-[4px] p-[8px] rounded-[8px]",
        className
      )}
      {...props}
    />
  );
}

function IconBack() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M12 9.05887V6.49987C11.9997 6.30224 11.9409 6.10914 11.831 5.94488C11.7211 5.78063 11.565 5.65258 11.3825 5.57687C11.2 5.50115 10.9991 5.48117 10.8052 5.51943C10.6113 5.55769 10.4331 5.65248 10.293 5.79187L4 11.9999L10.293 18.2069C10.3857 18.3001 10.4958 18.374 10.6171 18.4245C10.7385 18.4749 10.8686 18.5009 11 18.5009C11.1314 18.5009 11.2615 18.4749 11.3829 18.4245C11.5042 18.374 11.6143 18.3001 11.707 18.2069C11.7999 18.1141 11.8736 18.0038 11.9239 17.8825C11.9742 17.7612 12 17.6312 12 17.4999V15.0109C14.75 15.0789 17.755 15.5769 20 18.9999V17.9999C20 13.3669 16.5 9.55687 12 9.05887Z"
        fill="white"
      />
    </svg>
  );
}

function IconStick() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M3.84506 3.84504C3.30444 4.3857 3.00073 5.11897 3.00073 5.88354C3.00073 6.64812 3.30444 7.38138 3.84506 7.92204L5.43206 9.51005C5.44424 9.49626 5.45691 9.48292 5.47006 9.47005L9.47006 5.47004C9.48293 5.4569 9.49627 5.44423 9.51006 5.43204L7.92206 3.84504C7.3814 3.30443 6.64813 3.00072 5.88356 3.00072C5.11898 3.00072 4.38572 3.30443 3.84506 3.84504ZM10.5681 6.49004C10.5559 6.50384 10.5432 6.51718 10.5301 6.53004L6.53006 10.53C6.5172 10.5432 6.50385 10.5559 6.49006 10.568L16.0781 20.156C16.6219 20.6817 17.3505 20.9726 18.1069 20.9662C18.8632 20.9598 19.5868 20.6564 20.1216 20.1216C20.6565 19.5868 20.9598 18.8632 20.9662 18.1069C20.9727 17.3505 20.6817 16.6219 20.1561 16.078L10.5681 6.49004ZM16.1001 2.30704C16.1354 2.21644 16.1972 2.13861 16.2775 2.08374C16.3578 2.02887 16.4528 1.99951 16.5501 1.99951C16.6473 1.99951 16.7423 2.02887 16.8226 2.08374C16.9029 2.13861 16.9647 2.21644 17.0001 2.30704L17.4301 3.40204C17.4541 3.464 17.4906 3.52032 17.5374 3.56747C17.5842 3.61462 17.6403 3.65159 17.7021 3.67604L18.7931 4.10804C18.8834 4.14403 18.9609 4.2063 19.0155 4.28679C19.07 4.36728 19.0992 4.46229 19.0992 4.55954C19.0992 4.6568 19.07 4.75181 19.0155 4.8323C18.9609 4.91279 18.8834 4.97506 18.7931 5.01104L17.7031 5.44304C17.6413 5.46743 17.5852 5.50425 17.5382 5.55121C17.4913 5.59817 17.4544 5.65427 17.4301 5.71604L17.0001 6.81004C16.9647 6.90065 16.9029 6.97848 16.8226 7.03335C16.7423 7.08822 16.6473 7.11758 16.5501 7.11758C16.4528 7.11758 16.3578 7.08822 16.2775 7.03335C16.1972 6.97848 16.1354 6.90065 16.1001 6.81004L15.6701 5.71504C15.6457 5.65327 15.6089 5.59717 15.5619 5.55021C15.5149 5.50325 15.4588 5.46643 15.3971 5.44204L14.3071 5.01004C14.2167 4.97406 14.1392 4.91179 14.0847 4.8313C14.0301 4.75081 14.0009 4.65579 14.0009 4.55854C14.0009 4.46129 14.0301 4.36628 14.0847 4.28579C14.1392 4.2053 14.2167 4.14303 14.3071 4.10704L15.3971 3.67504C15.4589 3.65054 15.5151 3.61357 15.5621 3.56644C15.609 3.5193 15.6458 3.463 15.6701 3.40104L16.1001 2.30704ZM19.9671 9.13004C20.0024 9.03944 20.0642 8.96161 20.1445 8.90674C20.2248 8.85187 20.3198 8.82251 20.4171 8.82251C20.5143 8.82251 20.6093 8.85187 20.6896 8.90674C20.7699 8.96161 20.8317 9.03944 20.8671 9.13004L21.0231 9.52905C21.0731 9.65405 21.1711 9.75304 21.2961 9.80204L21.6941 9.96004C21.7841 9.9962 21.8612 10.0585 21.9156 10.1388C21.9699 10.2192 21.999 10.314 21.999 10.411C21.999 10.5081 21.9699 10.6029 21.9156 10.6832C21.8612 10.7636 21.7841 10.8259 21.6941 10.862L21.2961 11.02C21.2343 11.0444 21.1782 11.0812 21.1312 11.1282C21.0843 11.1752 21.0474 11.2313 21.0231 11.293L20.8671 11.693C20.8317 11.7836 20.7699 11.8615 20.6896 11.9164C20.6093 11.9712 20.5143 12.0006 20.4171 12.0006C20.3198 12.0006 20.2248 11.9712 20.1445 11.9164C20.0642 11.8615 20.0024 11.7836 19.9671 11.693L19.8101 11.293C19.7858 11.2314 19.7491 11.1753 19.7023 11.1284C19.6556 11.0814 19.5996 11.0445 19.5381 11.02L19.1401 10.862C19.05 10.8259 18.9729 10.7636 18.9185 10.6832C18.8642 10.6029 18.8352 10.5081 18.8352 10.411C18.8352 10.314 18.8642 10.2192 18.9185 10.1388C18.9729 10.0585 19.05 9.9962 19.1401 9.96004L19.5381 9.80204C19.5996 9.77754 19.6556 9.74067 19.7023 9.69372C19.7491 9.64677 19.7858 9.59072 19.8101 9.52905L19.9671 9.13004ZM5.13306 15.307C5.16838 15.2164 5.23024 15.1386 5.31053 15.0837C5.39082 15.0289 5.48581 14.9995 5.58306 14.9995C5.6803 14.9995 5.77529 15.0289 5.85558 15.0837C5.93587 15.1386 5.99773 15.2164 6.03306 15.307L6.19006 15.707C6.21407 15.7689 6.25064 15.8251 6.29746 15.872C6.34427 15.919 6.40032 15.9558 6.46206 15.98L6.86006 16.137C6.9504 16.173 7.02788 16.2353 7.08246 16.3158C7.13704 16.3963 7.16621 16.4913 7.16621 16.5885C7.16621 16.6858 7.13704 16.7808 7.08246 16.8613C7.02788 16.9418 6.9504 17.0041 6.86006 17.04L6.46206 17.198C6.40044 17.2225 6.3445 17.2593 6.29771 17.3063C6.25092 17.3533 6.21428 17.4093 6.19006 17.471L6.03306 17.871C5.99773 17.9617 5.93587 18.0395 5.85558 18.0944C5.77529 18.1492 5.6803 18.1786 5.58306 18.1786C5.48581 18.1786 5.39082 18.1492 5.31053 18.0944C5.23024 18.0395 5.16838 17.9617 5.13306 17.871L4.97606 17.471C4.95183 17.4093 4.91519 17.3533 4.8684 17.3063C4.82161 17.2593 4.76567 17.2225 4.70406 17.198L4.30606 17.04C4.21571 17.0041 4.13823 16.9418 4.08366 16.8613C4.02908 16.7808 3.9999 16.6858 3.9999 16.5885C3.9999 16.4913 4.02908 16.3963 4.08366 16.3158C4.13823 16.2353 4.21571 16.173 4.30606 16.137L4.70406 15.98C4.76577 15.9555 4.82176 15.9185 4.86856 15.8713C4.91535 15.8242 4.95194 15.7679 4.97606 15.706L5.13306 15.307Z"
        fill="white"
      />
    </svg>
  );
}

function IconCamera() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M3.34673 21.5778H20.6529C22.7422 21.5778 23.8072 20.5329 23.8072 18.4638V7.94708C23.8072 5.87793 22.7422 4.84336 20.6529 4.84336H18.3026C17.5192 4.84336 17.2783 4.68265 16.8262 4.18036L16.0123 3.27608C15.5203 2.72408 15.0082 2.42236 13.9633 2.42236H9.96559C8.93102 2.42236 8.41844 2.72408 7.91659 3.27608L7.10273 4.18036C6.66087 4.67236 6.40973 4.84336 5.6263 4.84336H3.3463C1.25702 4.84336 0.192017 5.87793 0.192017 7.94708V18.4638C0.192017 20.5329 1.25745 21.5778 3.34673 21.5778ZM16.2536 16.1135L14.3653 13.6222C14.1039 13.2806 14.2749 12.8388 14.6764 12.8388H16.0324C16.0324 10.3878 14.355 8.68036 11.9944 8.68036C11.2513 8.68036 10.6487 8.86122 10.0359 9.1925C9.35273 9.52422 8.83073 9.1325 8.83073 8.64008C8.83073 8.39922 8.94087 8.12793 9.2323 7.94708C9.87516 7.55536 10.8797 7.21379 11.9944 7.21379C15.1989 7.21379 17.5187 9.54436 17.5187 12.8388H18.7144C19.1259 12.8388 19.2772 13.2708 19.0157 13.6222L17.1172 16.1135C16.9063 16.3946 16.4846 16.4049 16.2536 16.1135ZM11.9944 18.2529C8.79044 18.2529 6.48002 15.8118 6.48002 12.6279H5.28473C4.86302 12.6279 4.72244 12.1861 4.98344 11.8342L6.88202 9.34336C7.09287 9.07208 7.51459 9.05193 7.73573 9.34336L9.6343 11.8342C9.8953 12.1856 9.7243 12.6279 9.31287 12.6279H7.95644C7.95644 14.9581 9.6343 16.7765 11.9944 16.7765C12.7479 16.7765 13.3607 16.5956 13.953 16.2742C14.6563 15.9228 15.1586 16.3445 15.1586 16.8566C15.1586 17.0979 15.0382 17.3289 14.757 17.5196C14.124 17.9311 13.0993 18.2529 11.9944 18.2529Z"
        fill="white"
      />
    </svg>
  );
}

function IconStart() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
    >
      <rect width="80" height="80" rx="40" fill="white" />
      <circle cx="40" cy="40" r="36" fill="black" />
      <circle cx="40" cy="40" r="32" fill="white" />
    </svg>
  );
}

interface PlayButtonProps extends ComponentProps<"button"> {}

function PlayButton({ children, className, ...restProps }: PlayButtonProps) {
  return (
    <button
      className={mergeClassName(
        "w-[80px] aspect-square rounded-full bg-[#FFF] flex items-center justify-center",
        className
      )}
      {...restProps}
    >
      <div
        className={twMerge(
          "w-[72px] aspect-square rounded-full bg-[#000] flex items-center justify-center"
        )}
      >
        <div
          className={twMerge(
            "w-[64px] aspect-square rounded-full bg-[#FBD650] flex items-center justify-center font-yClover text-[16px] font-bold text-[#030712]"
          )}
        >
          {children}
        </div>
      </div>
    </button>
  );
}

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i) => {
    const delay = 1 + i * 0.5;
    return {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
        opacity: { delay, duration: 0.01 },
      },
    };
  },
};

const RecordButton = forwardRef<AnimationScope, {}>((_, ref) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
    >
      <rect width="100" height="100" rx="50" fill="white" fillOpacity="0.5" />
      <motion.circle
        ref={ref}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 0.7 }}
        transition={{ duration: 1 }}
        custom={1}
        cx={50}
        cy={50}
        r={46}
        stroke="#FCD55F"
        strokeWidth={8}
        strokeLinejoin="round"
        strokeLinecap="round"
        className={"origin-center -rotate-90"}
        // className={"rotate-90"}
      />
      <rect x="30" y="30" width="40" height="40" rx="8" fill="white" />
    </svg>
  );
});
