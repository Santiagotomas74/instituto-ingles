"use client";

import { useEffect, useState } from "react";

const desktopImages = [
  "https://images.openai.com/static-rsc-4/Dofk9OBw5JxHsr3xLnp7Zar5YLn9x-TevuNzUj79RQJnsz6zaSyw_XHptCIXCKK-Tq0dKiEYtbp_ih-Y8ZFrUdpYwDYq2I_2dpcB1UOyLd7t1nch352Mm_yO5uWK1tKt43wChnND_eG_0B7XPLrABNQWS6JZgG4lyOV1SmrSLUTrk8Jx8bB00ihbDAz2x60f?purpose=fullsize",
  "https://content-viajes.nationalgeographic.com.es/medio/2023/03/24/big-ben-y-alrededores_852e28a7_475606798_230324072203_1280x841.jpg",
  "https://content.api.news/v3/images/bin/3716fb7a3b0ff447d5316b01036386cf",
  "https://gotripzi.com/_astro/london-uk-hero.CCbex9_q.webp",
  "https://imgmd.net/images/v1/guia/2024669/londres.jpg",
  "https://images.openai.com/static-rsc-4/4bFBPVUvYrxiZa4OAniEVMIjPZZbZtb9Y0qOa7wYbUPh3qk5xnMTLTvbrYOu4-nXkDsD4W2ubCxIdHaYYDBzRZnCRtNl4c65quhacAhBQRgA7LY8E4tzNCGW1YQSVaqjtDG7dIBwVD4rS1c8t9Be9IoJ4XLOkf09hO77-caK28TFSnOBma1ltRNuvi38tkrm?purpose=fullsize",
  "https://images.openai.com/static-rsc-4/01HN8V-7LKQKcSvA58hd4YtTAZ7SsD-1w8og46piI7mq1f5R-Q43LQbegO-6H2SHTR5X3svOSQsfDs8l6bnqh-aelXvxOzW0fIR3tz6m8cNEw5JaquwPuHt04zwQrSsJi-q4jNK0ZWVkIfrGkoj26xpnIWo9NIb4Z2GIKI6UXc1fmzz-68jUbpJBB7HUX2eV?purpose=fullsize",
  "https://images.openai.com/static-rsc-4/PnzutyP4gmLic8eHDVD06ivzOQDco450O4hJ51oBI-InGIj-S4tv3y5desDyzrfiHIIoNRlLVVlsHYXfs4ZHuWEwUxX8gsJq1lPSWRoeDe3_tVGSMIJff5YJ6iSXTvUUd0vP4LybjM3O1XW2Q67HVsstdBt2aymJ0_PjlTSZbnGbH6RtYoYba0Kzi0jkuiKH?purpose=fullsize",
];

const mobileImages = [
  "https://i.pinimg.com/1200x/46/1e/9d/461e9d0b5305ac48bc2167c591c3dcdb.jpg",
  "https://i.pinimg.com/1200x/f3/ea/ff/f3eaff3f5e6bafc87c949e69c3cd3fcc.jpg",
  "https://i.pinimg.com/736x/54/88/70/5488702514ac177a4feb83903a469e7a.jpg",
  "https://i.pinimg.com/1200x/dd/61/80/dd6180800a0817c26d7d2dc3fab6772d.jpg",
  "https://i.pinimg.com/736x/29/c9/8c/29c98c5036fb0c557f8b5ca05a028fb5.jpg",
  "https://i.pinimg.com/736x/ce/b5/ac/ceb5ac29bb48127b86bbab16ab9923d5.jpg",
];

export default function LondonHeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % desktopImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0">
      {/* IMÁGENES */}
      {desktopImages.map((desktopImage, index) => (
        <div
          key={index}
          className={`
            absolute
            inset-0
            transition-all
            duration-[3000ms]
            ease-in-out
            ${
              current === index
                ? "opacity-100 scale-100"
                : "opacity-0 scale-105"
            }
          `}
        >
          {/* DESKTOP */}
          <img
            src={desktopImage}
            alt=""
            className="
              hidden
              md:block
              w-full
              h-full
              object-cover
              md:scale-110
              animate-[kenburns_15s_linear_infinite]
            "
          />

          {/* MOBILE */}
          <img
            src={mobileImages[index]}
            alt=""
            className="
              block
              md:hidden
              w-full
              h-full
              object-cover
              scale-105
              animate-[kenburns_15s_linear_infinite]
            "
          />
        </div>
      ))}

      {/* OVERLAY PRINCIPAL */}
      <div
        className="
          absolute
          inset-0
          bg-slate-950/38
        "
      />

      {/* GRADIENTE PRINCIPAL */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-r
          from-slate-950/75
          via-slate-900/35
          to-blue-950/45
        "
      />

      {/* TONO AZUL/CYAN DEL LADO DERECHO */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-br
          from-transparent
          via-transparent
          to-cyan-900/20
        "
      />

      {/* GRADIENTE INFERIOR */}
      <div
        className="
          absolute
          inset-x-0
          bottom-0
          h-56
          bg-gradient-to-t
          from-slate-950/55
          via-slate-950/20
          to-transparent
        "
      />

      {/* LUZ AZUL */}
      <div
        className="
          absolute
          -top-40
          -right-40
          w-[550px]
          h-[550px]
          rounded-full
          bg-blue-500/15
          blur-3xl
        "
      />

      {/* LUZ CIAN */}
      <div
        className="
          absolute
          -bottom-48
          -left-40
          w-[500px]
          h-[500px]
          rounded-full
          bg-cyan-400/12
          blur-3xl
        "
      />

      {/* INDICADORES */}
      <div
        className="
          absolute
          bottom-5
          md:bottom-8
          left-1/2
          -translate-x-1/2
          flex
          items-center
          gap-2
          md:gap-3
          z-30
        "
      >
        {desktopImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            aria-label={`Ir a imagen ${index + 1}`}
            className={`
              h-2
              rounded-full
              transition-all
              duration-500
              backdrop-blur-md
              ${
                current === index
                  ? "w-10 bg-white shadow-lg"
                  : "w-2 bg-white/40 hover:bg-white/70"
              }
            `}
          />
        ))}
      </div>
    </div>
  );
}
