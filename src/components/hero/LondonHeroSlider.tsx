"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  "https://images.openai.com/static-rsc-4/Dofk9OBw5JxHsr3xLnp7Zar5YLn9x-TevuNzUj79RQJnsz6zaSyw_XHptCIXCKK-Tq0dKiEYtbp_ih-Y8ZFrUdpYwDYq2I_2dpcB1UOyLd7t1nch352Mm_yO5uWK1tKt43wChnND_eG_0B7XPLrABNQWS6JZgG4lyOV1SmrSLUTrk8Jx8bB00ihbDAz2x60f?purpose=fullsize",
  "https://content-viajes.nationalgeographic.com.es/medio/2023/03/24/big-ben-y-alrededores_852e28a7_475606798_230324072203_1280x841.jpg",
  "https://content.api.news/v3/images/bin/3716fb7a3b0ff447d5316b01036386cf",
  "https://gotripzi.com/_astro/london-uk-hero.CCbex9_q.webp",
  "https://imgmd.net/images/v1/guia/2024669/londres.jpg",
  "https://images.openai.com/static-rsc-4/4bFBPVUvYrxiZa4OAniEVMIjPZZbZtb9Y0qOa7wYbUPh3qk5xnMTLTvbrYOu4-nXkDsD4W2ubCxIdHaYYDBzRZnCRtNl4c65quhacAhBQRgA7LY8E4tzNCGW1YQSVaqjtDG7dIBwVD4rS1c8t9Be9IoJ4XLOkf09hO77-caK28TFSnOBma1ltRNuvi38tkrm?purpose=fullsize",
  "https://images.openai.com/static-rsc-4/01HN8V-7LKQKcSvA58hd4YtTAZ7SsD-1w8og46piI7mq1f5R-Q43LQbegO-6H2SHTR5X3svOSQsfDs8l6bnqh-aelXvxOzW0fIR3tz6m8cNEw5JaquwPuHt04zwQrSsJi-q4jNK0ZWVkIfrGkoj26xpnIWo9NIb4Z2GIKI6UXc1fmzz-68jUbpJBB7HUX2eV?purpose=fullsize",
  "https://images.openai.com/static-rsc-4/PnzutyP4gmLic8eHDVD06ivzOQDco450O4hJ51oBI-InGIj-S4tv3y5desDyzrfiHIIoNRlLVVlsHYXfs4ZHuWEwUxX8gsJq1lPSWRoeDe3_tVGSMIJff5YJ6iSXTvUUd0vP4LybjM3O1XW2Q67HVsstdBt2aymJ0_PjlTSZbnGbH6RtYoYba0Kzi0jkuiKH?purpose=fullsize",
];

export default function LondonHeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="absolute inset-0">
      {images.map((image, index) => (
        <div
          key={image}
          className={`
          absolute
          inset-0
          transition-all
          duration-[3000ms]
          ease-in-out
          ${current === index ? "opacity-100 scale-100" : "opacity-0 scale-105"}
        `}
        >
          <img
            src={image}
            alt=""
            className="
            w-full
            h-full
            object-cover
            scale-110
            animate-[kenburns_15s_linear_infinite]
          "
          />
        </div>
      ))}

      {/* Overlay oscuro */}
      <div
        className="
        absolute
        inset-0
        bg-gradient-to-br
        from-blue-950/90
        via-blue-900/80
        to-cyan-900/75
      "
      />

      {/* Overlay adicional */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Indicadores estilo Netflix */}
      <div
        className="
        absolute
        bottom-8
        left-1/2
        -translate-x-1/2
        flex
        items-center
        gap-3
        z-30
      "
      >
        {images.map((_, index) => (
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
                ? "w-12 bg-white shadow-lg"
                : "w-2 bg-white/40 hover:bg-white/70"
            }
          `}
          />
        ))}
      </div>

      {/* Contador 
      <div
        className="
        absolute
        bottom-7
        right-8
        z-30
        px-4
        py-2
        rounded-full
        bg-black/30
        backdrop-blur-md
        text-white
        text-sm
        font-medium
      "
      >
        {current + 1} / {images.length}
      </div>*/}
    </div>
  );
}
