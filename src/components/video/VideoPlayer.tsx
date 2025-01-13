import IconPlay from "@Components/icons/IconPlay";
import { shareRef } from "@Utils/reactExtension";
import { mergeClassName } from "@Utils/styleExtension";
import { AnimatePresence, motion } from "framer-motion";
import { ComponentProps, forwardRef, useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

export interface VideoPlayerProps extends ComponentProps<"video"> {}

// HJ TODO: default 값 더 좋게 넘길 수 있을 듯...
const VideoPlayer = forwardRef<HTMLVideoElement, VideoPlayerProps>(
  (
    {
      src = "",
      muted = true,
      autoPlay = true,
      playsInline = false,
      className,
      ...restProps
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const toggleState = () => {
      const videoEl = videoRef.current;
      if (!videoEl) return;

      if (videoEl.paused) {
        videoEl.play();
        setIsPlaying(true);
      } else {
        videoEl.pause();
        setIsPlaying(false);
      }

      setIsVisible(true);
      setTimeout(() => setIsVisible(false), 500);
    };

    // HJ TODO: video manager로 분리 (촬영 페이지에서도 사용되어야됨)
    useEffect(() => {
      const videoEl = videoRef.current;
      if (!videoEl) return;
      function playHandler() {
        setIsPlaying(true);
      }
      function endHandler() {
        setIsPlaying(false);
      }
      videoEl.addEventListener("play", playHandler);
      videoEl.addEventListener("ended", endHandler);
      return () => {
        videoEl.removeEventListener("play", playHandler);
        videoEl.removeEventListener("ended", endHandler);
      };
    }, []);

    return (
      <div className={twMerge("relative w-full aspect-[9/16]")}>
        <video
          ref={shareRef(videoRef, ref)}
          className={mergeClassName("w-full h-full", className)}
          src={src}
          muted={muted}
          autoPlay={autoPlay}
          playsInline={playsInline}
          onClick={toggleState}
          {...restProps}
        />

        <div
          className={twMerge(
            "absolute top-0 bottom-0 left-0 right-0 m-auto w-fit h-fit"
          )}
        >
          <AnimatePresence>
            {isVisible && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              >
                {isPlaying ? <StartButton /> : <PauseButton />}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }
);

VideoPlayer.displayName = "VideoPlayer";

function PauseButton() {
  return (
    <button
      className={twMerge(
        "flex items-center justify-center w-[100px] h-[100px] bg-[#FFFFFF40] rounded-full gap-[8px]"
      )}
    >
      <div
        className={twMerge("w-[16px] h-[40px] rounded-[6px] bg-[#FFFFFF]")}
      />
      <div
        className={twMerge("w-[16px] h-[40px] rounded-[6px] bg-[#FFFFFF]")}
      />
    </button>
  );
}

function StartButton() {
  return (
    <button
      className={twMerge(
        "flex items-center justify-center w-[100px] h-[100px] bg-[#FFFFFF40] rounded-full gap-[8px]"
      )}
    >
      <IconPlay />
    </button>
  );
}

export default VideoPlayer;
