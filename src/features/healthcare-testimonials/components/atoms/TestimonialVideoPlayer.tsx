'use client';

import type { TestimonialVideoData } from '../../types';
import { Play, Volume2, VolumeX } from 'lucide-react';
import Image from 'next/image';
import { useRef, useState, useSyncExternalStore } from 'react';

type TestimonialVideoPlayerProps = {
  video: TestimonialVideoData;
};

const emptySubscribe = () => () => {};

export function TestimonialVideoPlayer({ video }: TestimonialVideoPlayerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const isMounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

  const isYouTube = Boolean(video.youtubeId);

  const togglePlay = () => {
    if (isYouTube) {
      const iframe = iframeRef.current;
      if (iframe?.contentWindow) {
        const nextPlaying = !isPlaying;
        iframe.contentWindow.postMessage(
          JSON.stringify({
            event: 'command',
            func: nextPlaying ? 'playVideo' : 'pauseVideo',
            args: [],
          }),
          '*',
        );
        setIsPlaying(nextPlaying);
      }
      return;
    }

    const videoEl = videoRef.current;
    if (!videoEl) {
      return;
    }
    if (isPlaying) {
      videoEl.pause();
      setIsPlaying(false);
    } else {
      videoEl
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  const toggleMute = () => {
    if (isYouTube) {
      const iframe = iframeRef.current;
      if (iframe?.contentWindow) {
        const nextMuted = !isMuted;
        iframe.contentWindow.postMessage(
          JSON.stringify({
            event: 'command',
            func: nextMuted ? 'mute' : 'unMute',
            args: [],
          }),
          '*',
        );
        setIsMuted(nextMuted);
      }
      return;
    }

    const videoEl = videoRef.current;
    if (!videoEl) {
      return;
    }
    videoEl.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div
      className="
        relative aspect-9/16 w-full overflow-hidden bg-black
        lg:aspect-auto lg:size-full
      "
    >
      {/* 1. Mode YouTube Shorts Embed (Controls=0, Autoplay, Muted, Loop, Crop Masking) */}
      {isYouTube && isMounted && (
        <div className="
          relative flex size-full items-center justify-center overflow-hidden
        "
        >
          <iframe
            ref={iframeRef}
            src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${video.youtubeId}&controls=0&modestbranding=1&rel=0&playsinline=1&enablejsapi=1&iv_load_policy=3&disablekb=1&fs=0`}
            title={video.title}
            className="
              size-full scale-[1.2] border-0 object-cover transition-transform
              duration-300 select-none
            "
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}

      {/* 2. Mode Video Lokal (.mp4) jika tanpa YouTube ID */}
      {!isYouTube && video.src && (
        <video
          ref={videoRef}
          src={video.src}
          poster={video.poster}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="size-full object-cover"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
      )}

      {/* 3. Mode Placeholder Gambar Poster dengan Badge "Video Segera Hadir" */}
      {!isYouTube && !video.src && (
        <div className="
          relative flex size-full items-center justify-center bg-muted
        "
        >
          {video.poster && (
            <Image
              src={video.poster}
              alt={video.title}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          )}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
          <div className="
            relative z-10 flex flex-col items-center gap-3 p-6 text-center
          "
          >
            <span
              className="
                flex size-14 items-center justify-center rounded-full border
                border-white/30 bg-black/60 text-white shadow-lg
                backdrop-blur-md
              "
            >
              <Play className="ml-1 size-7 text-white/80" />
            </span>
            <span className="
              rounded-full border border-white/20 bg-black/60 px-3.5 py-1.5
              amanah-type-caption font-medium text-white/90 backdrop-blur-md
            "
            >
              Video Segera Hadir
            </span>
          </div>
        </div>
      )}

      {/* Tombol Play/Pause Overlay saat video di-pause */}
      {(isYouTube || Boolean(video.src)) && !isPlaying && (
        <button
          type="button"
          onClick={togglePlay}
          aria-label={isPlaying ? 'Jeda video' : 'Putar video'}
          className="
            group absolute inset-0 z-10 flex cursor-pointer items-center
            justify-center bg-black/40 transition-colors
            hover:bg-black/50
          "
        >
          <span
            className="
              flex size-14 items-center justify-center rounded-full border
              border-white/40 bg-black/60 text-white shadow-lg backdrop-blur-md
              transition-transform
              group-hover:scale-110
            "
          >
            <Play className="ml-1 size-6 text-white" />
          </span>
        </button>
      )}

      {/* Tombol Audio Mute/Unmute Minimalis Signature Klinik Amanah */}
      {(isYouTube || Boolean(video.src)) && (
        <div className="absolute right-4 bottom-4 z-20">
          <button
            type="button"
            onClick={toggleMute}
            aria-label={isMuted ? 'Nyalakan suara' : 'Bisukan suara'}
            className="
              flex size-9 cursor-pointer items-center justify-center
              rounded-full border border-white/20 bg-black/60 text-white
              backdrop-blur-md transition-colors
              hover:bg-black/80
            "
          >
            {isMuted
              ? (
                  <VolumeX className="size-4" />
                )
              : (
                  <Volume2 className="size-4 text-amanah-blue" />
                )}
          </button>
        </div>
      )}
    </div>
  );
}
