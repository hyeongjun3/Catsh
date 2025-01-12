import background from "@Assets/images/background.png";
import mobileFrame from "@Assets/images/mobileFrame.png";
import mobileHomeScreen from "@Assets/images/mobileHomeScreen.png";
import mobileCat from "@Assets/images/mobileCat.png";
import speechBubble1 from "@Assets/images/speech-bubble1.png";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  return (
    <div
      className={` w-full h-full flex flex-col `}
      style={{ backgroundImage: `url("${background}")` }}
    >
      <MobilePhone />
      <Title />
      <Button />
    </div>
  );
}

//#region sub components
function MobilePhone() {
  return (
    <div className="absolute top-0 bottom-0 left-0 right-0 m-auto w-[320px] h-[604px]">
      <div className="absolute top-[45px] left-0 right-0 m-auto w-[265px] h-[522px] overflow-hidden">
        <img
          className="h-full object-cover absolute top-0 bottom-0 m-auto"
          src={mobileHomeScreen}
        />
        <img
          className="w-[200px] object-cover absolute bottom-0 left-0 right-0 m-auto"
          src={mobileCat}
        />
      </div>
      <div
        className=" w-full h-full absolute"
        style={{
          backgroundImage: `url("${mobileFrame}")`,
        }}
      ></div>
    </div>
  );
}

function Title() {
  return (
    <div className="absolute top-0 bottom-0 left-0 right-0 m-auto w-full h-[604px]">
      <span
        className="absolute top-[100px] left-0 right-0 m-auto font-dogica font-bold text-[66.667px] text-center"
        style={{
          WebkitTextStrokeWidth: 3,
          WebkitTextStrokeColor: "#FFF",
          letterSpacing: "-10px",
        }}
      >
        CATSCH
      </span>
      <div
        className="absolute top-[180px] left-0 right-0 m-auto w-[226px] h-[100px] flex justify-center items-center"
        style={{ backgroundImage: `url("${speechBubble1}")` }}
      >
        <span className="absolute top-[21px] font-galmuri9 font-bold text-[14px] leading-normal">
          우리집 고양이가
          <br />
          인플루언서가 되
        </span>
      </div>
    </div>
  );
}

function Button() {
  const navigate = useNavigate();

  return (
    <div className="absolute bottom-[35px] left-0 right-0 m-auto flex items-center justify-center">
      <button
        className=" h-[64px] w-[240px] font-dogica font-normal leading-normal text-[32px] bg-[#3E2731] text-white letter tracking-[-4.8px]"
        onClick={() => {
          navigate("/name");
        }}
      >
        GO!
      </button>
    </div>
  );
}
//#endregion

//#region logics
//#endregion

//#region styled components
//#endregion
