import Button from "@Components/button/Button";
import Base64 from "@Constant/base64";
import { createRepeatBackground } from "@Utils/styleExtension";
import { motion, useAnimate } from "framer-motion";
import { useNavigate } from "react-router-dom";
import CatHandImage from "@Assets/images/cat4.png";
import { useState } from "react";

export default function LandingPage() {
  const navigate = useNavigate();
  const [scope, animate] = useAnimate();
  const [isPlaying, setIsPlaying] = useState(false);

  const goNext = () => navigate("/choose");

  const playAnimation = () => {
    if (isPlaying) return;

    setIsPlaying(true);
    animate(
      scope.current,
      {
        x: [100, -100, 100, -100],
        y: [250, 200, 160, 250],
        rotate: [0, 0, 0, 0],
        opacity: [0, 1, 0, 1],
      },
      { duration: 0.3, ease: ["easeIn", "easeOut", "easeOut", "easeOut"] }
    ).then(() => {
      goNext();
    });
  };

  return (
    <>
      <motion.div
        className="flex flex-col h-full overflow-hidden absolute w-full"
        exit={{ y: [0, "-100%"] }}
        transition={{ duration: 3 }}
      >
        <div className="h-full relative px-[16px] flex w-full justify-between gap-[9px]">
          <MovieSide />
          <Center />
          <MovieSide />
          <div
            className="absolute w-[100px] left-0 right-0 m-auto bottom-0 translate-y-full"
            ref={scope}
          >
            <CatHand />
          </div>
        </div>
      </motion.div>
      <motion.div exit={{ opacity: [1, 0] }} transition={{ duration: 2 }}>
        <Button
          variant="primary"
          className="absolute w-[calc(100%-32px)] h-[56px] bottom-[32px] left-0 right-0 m-auto"
          onClick={playAnimation}
        >
          시작해보자냥
        </Button>
      </motion.div>
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
    <div className="w-full pt-[24px]">
      <div className="flex gap-[24px] flex-col">
        <CatBackground />
        <CatBackground />
      </div>
      <div className="flex mt-[60px] w-full flex-col justify-center">
        <h1 className="flex flex-col justify-center text-center text-[#FCD55F] font-yClover text-[40px] font-bold gap-[8px]">
          <span>캣치</span>
          <span>catsch</span>
        </h1>
        <p className="mt-[16px] flex flex-col justify-center text-center text-[#FCD55F] font-yClover text-[16px] font-regular gap-[8px]">
          <span>우리집 고영희도 가능한</span>
          <span>초간단 숏츠 제작</span>
        </p>
      </div>
    </div>
  );
}

function CatBackground() {
  return (
    <div className="w-full h-[200px] bg-slate-100 rounded-[4px]">
      고양이 이미지 ㅜㅜ
    </div>
  );
}

function CatHand() {
  return <img src={CatHandImage} />;
}
