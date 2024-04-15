import SampleImage1 from "@Assets/images/sample-image1.png";
import SampleImage2 from "@Assets/images/sample-image2.png";
import SampleImage3 from "@Assets/images/sample-image3.png";
import SampleImage4 from "@Assets/images/sample-image4.png";

const Templates = {
  id1: {
    label: "생일 축하",
    title: "템플릿이름 길이가 길어질 경우 2줄",
    src: SampleImage1,
    description: [
      "템플릿 설명이 한 줄 정도 들어갈 것 같음",
      "이런 영상이 필요해요! 이런 영상을 찍어요!",
    ],
  },
  id2: {
    label: "인절미",
    title: "템플릿 이름",
    src: SampleImage2,
    description: [
      "템플릿 설명이 한 줄 정도 들어갈 것 같음",
      "이런 영상이 필요해요! 이런 영상을 찍어요!",
    ],
  },
  id3: {
    label: "생일 축하",
    title: "템플릿 이름",
    src: SampleImage3,
    disabled: true,
    description: [
      "템플릿 설명이 한 줄 정도 들어갈 것 같음",
      "이런 영상이 필요해요! 이런 영상을 찍어요!",
    ],
  },
  id4: {
    label: "생일 축하",
    title: "템플릿이름 길이가 길어질 경우 2줄",
    src: SampleImage4,
    disabled: true,
    description: [
      "템플릿 설명이 한 줄 정도 들어갈 것 같음",
      "이런 영상이 필요해요! 이런 영상을 찍어요!",
    ],
  },
};

export default Templates;
