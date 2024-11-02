import Button from "@Components/button/Button";
import Base64 from "@Constant/base64";
import { createRepeatBackground, mergeClassName } from "@Utils/styleExtension";
import { motion, useAnimate } from "framer-motion";
import { useNavigate } from "react-router-dom";
import CatHandImage from "@Assets/images/cat4.png";
import CatImage1 from "@Assets/images/cat1.png";
import CatImage3 from "@Assets/images/cat3.png";
import { useState } from "react";
import useMotion from "@Hooks/useMotion";

export default function LandingPage() {
  const navigate = useNavigate();
  const [scope, animate] = useAnimate();
  const [isPlaying, setIsPlaying] = useState(false);

  const motionContent = useMotion({ id: "landingpage-content" });
  const motionButton = useMotion({ id: "landingpage-button" });
  const motionCathand = useMotion({ id: "landingpage-cathand" });

  const goNext = () => navigate("/choose");

  const playAnimation = () => {
    if (isPlaying) return;

    setIsPlaying(true);
    animate(scope.current, motionCathand.to, motionCathand.options).then(() => {
      goNext();
    });
  };

  return (
    <>
      <motion.div
        className="flex flex-col h-full overflow-hidden absolute w-full"
        exit={motionContent.to}
        transition={motionContent.options}
        style={motionContent.styles}
      >
        <div className="h-full relative px-[16px] flex w-full justify-between gap-[9px]">
          <MovieSide />
          <Center />
          <MovieSide />
        </div>
      </motion.div>
      <motion.div
        exit={motionButton.to}
        transition={motionButton.options}
        style={motionButton.styles}
        className="absolute flex w-full bottom-[32px] left-0 right-0 m-auto justify-center"
      >
        <Button
          variant="primary"
          className="w-[calc(100%-32px)] h-[56px]"
          onClick={playAnimation}
        >
          시작해보자냥
        </Button>
      </motion.div>
      <div
        className="absolute w-[100px] left-0 right-0 m-auto bottom-0 translate-y-full"
        ref={scope}
        style={motionCathand.styles}
      >
        <CatHand />
      </div>
    </>
  );
}

function MovieSide() {
  return (
    <div
      className="min-w-[32px] h-full"
      style={{
        backgroundImage: createRepeatBackground(
          Base64.rectange,
          32,
          24,
          28,
          "col"
        ),
        backgroundRepeat: "repeat-y",
        backgroundPositionY: "-15px",
      }}
    />
  );
}
function Center() {
  return (
    <div className="flex flex-col w-full max-w-[270px] px-[10px] translate-y-[-5%] mb-[50px]">
      <div className="flex gap-[24px] flex-col flex-1">
        <CatBackground />
        <CatBackground src={CatImage3} imgClassName="translate-y-[-19%]" />
        <CatBackground src={CatImage1} imgClassName="translate-y-[-7%]" />
      </div>
      <div className="flex w-full flex-col justify-center flex-1 gap-[16px]">
        <h1 className="flex flex-col justify-center text-center text-[#FCD55F] font-yClover text-[40px] font-bold gap-[8px]">
          <span>캣치</span>
          <span>catsch</span>
        </h1>
        <p className="flex flex-col justify-center text-center text-[#FCD55F] font-yClover text-[16px] font-regular gap-[8px]">
          <span>우리집 고영희도 가능한</span>
          <span>초간단 숏츠 제작</span>
        </p>
      </div>
    </div>
  );
}

function CatBackground({
  className,
  src = "",
  imgClassName,
}: {
  className?: string;
  src?: string;
  imgClassName?: string;
}) {
  return (
    <div
      className={mergeClassName(
        "w-full rounded-[4px] overflow-hidden",
        className
      )}
      style={{
        background:
          "repeating-conic-gradient(#ffffff 0% 25%, #dadada 0% 50%) 50%/ 50px 50px",
        aspectRatio: 226 / 150,
      }}
    >
      <img src={src} className={imgClassName} />
    </div>
  );
}

function CatHand() {
  return <img src={CatHandImage} />;
}
