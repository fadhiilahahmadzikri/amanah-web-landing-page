'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  BabyIcon,
  Play,
  SparklesIcon,
  StethoscopeIcon,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { useRef, useState } from 'react';
import {
  AmanahScriptText,
  HealthcareHeading,
  HealthcareText,
} from '@/components/healthcare';
import { ArrowCtaButton } from './ArrowCtaButton';

gsap.registerPlugin(ScrollTrigger);

export function KhitanShowcaseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) {
      return;
    }
    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) {
      return;
    }
    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  useGSAP(
    () => {
      if (!sectionRef.current) {
        return;
      }

      // Animate on scroll: Header icons bounce & heading reveal
      if (headerRef.current) {
        const icons = headerRef.current.querySelector('[data-header-icons]');
        const heading = headerRef.current.querySelector('[data-mask-text]');

        if (icons) {
          gsap.fromTo(
            icons,
            { scale: 0.6, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.8,
              ease: 'back.out(2)',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            },
          );
        }

        if (heading) {
          gsap.fromTo(
            heading,
            { yPercent: 120, opacity: 0 },
            {
              yPercent: 0,
              opacity: 1,
              duration: 1.1,
              ease: 'expo.out',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            },
          );
        }
      }

      // Animate on scroll: Card container entrance
      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          },
        );
      }

      // Animate on scroll: Left text staggered reveal
      if (contentRef.current) {
        const textElements = contentRef.current.querySelectorAll('[data-content-item]');
        if (textElements.length > 0) {
          gsap.fromTo(
            textElements,
            { y: 25, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.9,
              stagger: 0.1,
              ease: 'expo.out',
              scrollTrigger: {
                trigger: cardRef.current ?? sectionRef.current,
                start: 'top 78%',
                toggleActions: 'play none none reverse',
              },
            },
          );
        }
      }

      // Animate on scroll: Right video container scale & fade
      if (videoWrapperRef.current) {
        gsap.fromTo(
          videoWrapperRef.current,
          { scale: 0.94, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: cardRef.current ?? sectionRef.current,
              start: 'top 78%',
              toggleActions: 'play none none reverse',
            },
          },
        );
      }
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="khitan"
      className="
        relative w-full overflow-hidden bg-background py-14
        sm:py-20
        md:py-24
      "
    >
      {/* Header persis seperti referensi: 3 icon di atas, heading ringkas tanpa subtitle */}
      <div
        ref={headerRef}
        className="
          mx-auto mb-10 flex w-full flex-col items-center justify-center px-4
          text-center
          md:mb-14
        "
      >
        <div
          data-header-icons
          className="
            mb-3 flex items-center justify-center gap-2 text-amanah-blue
            select-none
          "
          aria-hidden
        >
          <StethoscopeIcon className="
            size-6
            sm:size-7
          "
          />
          <BabyIcon className="
            size-6
            sm:size-7
          "
          />
          <SparklesIcon className="
            size-6
            sm:size-7
          "
          />
        </div>
        <div className="
          -mb-3 overflow-hidden pb-3
          md:-mb-4 md:pb-4
        "
        >
          <HealthcareHeading
            as="h2"
            data-mask-text
            size="display"
            className="font-medium text-foreground will-change-transform"
          >
            Khitan Nyaman, Anak Tenang.
          </HealthcareHeading>
        </div>
      </div>

      {/* Wrapper mentok kanan-kiri tanpa padding/margin luar, bersatu dengan shell rails dan respect tema */}
      <div
        ref={cardRef}
        className="w-full border-y border-line bg-card text-card-foreground"
      >
        <div className="
          flex w-full flex-col
          lg:flex-row lg:items-stretch
        "
        >
          {/* SISI KIRI: Porsi lebih luas, cerita & kutipan Gibran */}
          <div
            ref={contentRef}
            className="
              flex flex-1 flex-col justify-between p-6
              sm:p-8
              md:p-10
              lg:p-12
              xl:p-14
            "
          >
            <div data-content-item className="-mb-2 overflow-hidden pb-2">
              <AmanahScriptText
                className="inline-block text-foreground"
              >
                Pengalaman Nyata
              </AmanahScriptText>
            </div>

            {/* Headline Kutipan */}
            <div
              data-content-item
              className="
                -mb-3 overflow-hidden pb-3
                md:-mb-4 md:pb-4
              "
            >
              <HealthcareHeading
                as="h2"
                size="subsection"
                className="font-medium text-foreground"
              >
                &ldquo;Gibran aja sudah buktiin, kalau khitan itu nggak semenakutkan yang dibayangkan! 🤩✨&rdquo;
              </HealthcareHeading>
            </div>

            {/* Isi teks narasi */}
            <div
              data-content-item
              className="
                mt-4 flex flex-col gap-4
                sm:mt-5
              "
            >
              <HealthcareText
                className="text-muted-foreground"
              >
                Bukannya nangis, Gibran malah ketiduran saking nyamannya proses khitan di Klinik Amanah Health Care Yogyakarta. 💤👍
              </HealthcareText>
              <HealthcareText
                size="small"
                className="text-muted-foreground/85"
              >
                Buat Ayah &amp; Bunda yang masih ragu pilih tempat khitan untuk si kecil, yuk ke Klinik Amanah aja! Prosesnya cepat, minim sakit, dan ditangani oleh tim profesional.
              </HealthcareText>
            </div>

            {/* Identitas Pasien & Tombol Jadwalkan */}
            <div
              data-content-item
              className="
                mt-8 flex flex-col gap-4 border-t border-line pt-6
                sm:mt-10 sm:flex-row sm:items-center sm:justify-between
              "
            >
              <div>
                <HealthcareText
                  size="small"
                  className="font-semibold text-foreground"
                >
                  Gibran (8 tahun)
                </HealthcareText>
                <HealthcareText size="caption" className="text-muted-foreground">
                  Pasien Khitan Anak Klinik Amanah
                </HealthcareText>
              </div>

              <div>
                <ArrowCtaButton
                  href="https://wa.me/6281234567890?text=Halo%20Klinik%20Amanah,%20saya%20ingin%20jadwalkan%20layanan%20khitan%20anak"
                  treatment="primary"
                >
                  Jadwalkan
                </ArrowCtaButton>
              </div>
            </div>
          </div>

          {/* SISI KANAN: Video Vertikal 9:16 dari Gibran dengan autoplay */}
          <div
            ref={videoWrapperRef}
            className="
              relative flex w-full shrink-0 items-center justify-center
              overflow-hidden border-t border-line bg-muted/30
              lg:w-[380px] lg:border-t-0 lg:border-l
              xl:w-[420px]
            "
          >
            <div className="
              relative aspect-9/16 size-full max-h-[640px] overflow-hidden
              bg-black
            "
            >
              <video
                ref={videoRef}
                src="/assets/videos/khitan-anak-gibran.mp4"
                autoPlay
                loop
                muted={isMuted}
                playsInline
                className="size-full object-cover"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />

              {/* Tombol Play/Pause Video */}
              <button
                type="button"
                onClick={togglePlay}
                aria-label={isPlaying ? 'Jeda video' : 'Putar video'}
                className="
                  group absolute inset-0 z-10 flex cursor-pointer items-center
                  justify-center bg-transparent transition-colors
                  hover:bg-black/20
                "
              >
                {!isPlaying && (
                  <span className="
                    flex size-14 items-center justify-center rounded-full border
                    border-white/40 bg-black/60 text-white shadow-lg
                    backdrop-blur-md transition-transform
                    group-hover:scale-110
                  "
                  >
                    <Play className="ml-1 size-6 text-white" />
                  </span>
                )}
              </button>

              {/* Tombol Audio Mute/Unmute */}
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
                    ? <VolumeX className="size-4" />
                    : <Volume2 className="size-4 text-emerald-400" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default KhitanShowcaseSection;
