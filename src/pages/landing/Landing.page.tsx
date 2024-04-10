import Button from "@Components/button/Button";
import Base64 from "@Constant/base64";
import { createRepeatBackground } from "@Utils/styleExtension";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="flex flex-col h-full">
      <div className="h-full px-[16px] flex w-full justify-between gap-[9px]">
        <MovieSide />
        <Center />
        <MovieSide />
      </div>
      <div className="pt-[28px] pb-[32px]  flex items-center justify-center">
        <Button variant="primary" className="w-[324px] h-[56px]">
          시작해보자냥
        </Button>
      </div>
    </div>
  );
}

function MovieSide() {
  return (
    <div
      className="min-w-[32px] h-full"
      style={{
        backgroundImage: createRepeatBackground(Base64.rectange, 32, 24, 28),
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
