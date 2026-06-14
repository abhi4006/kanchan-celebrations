"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { LoaderCircle, Music2, Volume2 } from "lucide-react";

import { Button } from "@/components/ui/button";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const AUDIO_URL = `${BASE_PATH}/varaha-loop.mp3`;
const SOURCE_START = 5;
const SOURCE_END = 18;

export function ShehnaiPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const loadingRef = useRef(false);
  const [status, setStatus] = useState<"idle" | "loading" | "playing">("idle");
  const [audioError, setAudioError] = useState("");

  const stopMusic = useCallback(() => {
    const audio = audioRef.current;
    loadingRef.current = false;

    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }

    setStatus("idle");
  }, []);

  const startMusic = useCallback(async () => {
    const audio = audioRef.current;

    if (!audio || !audio.paused || loadingRef.current) return;

    loadingRef.current = true;
    setAudioError("");
    setStatus("loading");
    audio.currentTime = 0;
    audio.volume = 0.78;

    try {
      await audio.play();
      loadingRef.current = false;
      setStatus("playing");
    } catch (error) {
      loadingRef.current = false;
      setAudioError(error instanceof Error ? error.message : "Playback failed");
      setStatus("idle");
    }
  }, []);

  useEffect(() => {
    const startOnFirstInteraction = (event: PointerEvent) => {
      const target = event.target;

      if (target instanceof Element && target.closest(".music-button")) {
        return;
      }

      void startMusic();
    };

    void startMusic();

    window.addEventListener("pointerdown", startOnFirstInteraction, {
      once: true
    });

    return () => {
      window.removeEventListener("pointerdown", startOnFirstInteraction);
      stopMusic();
    };
  }, [startMusic, stopMusic]);

  const isPlaying = status === "playing";
  const isLoading = status === "loading";

  return (
    <>
      <audio
        ref={audioRef}
        src={AUDIO_URL}
        preload="auto"
        autoPlay
        loop
        playsInline
        onPlaying={() => {
          loadingRef.current = false;
          setStatus("playing");
        }}
        onWaiting={() => {
          if (!audioRef.current?.paused) {
            loadingRef.current = true;
            setStatus("loading");
          }
        }}
        onError={() => {
          loadingRef.current = false;
          setStatus("idle");
        }}
      />

      <Button
        type="button"
        variant="outline"
        size="sm"
        className="music-button"
        data-source-start={SOURCE_START}
        data-source-end={SOURCE_END}
        data-clip-duration={SOURCE_END - SOURCE_START}
        data-audio-error={audioError}
        aria-pressed={isPlaying}
        aria-label={
          isLoading
            ? "संगीत तैयार हो रहा है"
            : isPlaying
              ? "संगीत बंद करें"
              : "संगीत चलाएँ"
        }
        disabled={isLoading}
        onClick={() => {
          if (isPlaying) {
            stopMusic();
          } else {
            void startMusic();
          }
        }}
      >
        {isLoading ? (
          <LoaderCircle className="music-spinner" aria-hidden="true" />
        ) : isPlaying ? (
          <Volume2 aria-hidden="true" />
        ) : (
          <Music2 className="music-idle" aria-hidden="true" />
        )}
      </Button>
    </>
  );
}
