import { useCallback, useState } from "react";

interface UseVideoProps {
  defaultMuted: boolean;
}

// HJ TODO: 범용적으로 바꾸기 가능
export default function useVideo({ defaultMuted }: UseVideoProps) {
  const [isMuted, setIsMuted] = useState(defaultMuted);

  const mute = useCallback(() => {
    setIsMuted(true);
  }, []);

  const unMute = useCallback(() => {
    setIsMuted(false);
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  return { isMuted, mute, unMute, toggleMute };
}
