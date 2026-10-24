"use client";

import Image from "next/image";
import { useState } from "react";
import type { BlockVideo } from "@lib/pageBlocks";

/**
 * A video the live site embeds, loaded only on demand.
 *
 * The player iframe is not mounted until the visitor presses play: an embedded
 * YouTube or VK player pulls in several hundred kilobytes of script and sets
 * third-party cookies on page load whether or not anyone watches. Until then
 * this is a still image and a button.
 */
function playerUrl(video: BlockVideo): string {
  if (video.provider === "youtube") {
    return `https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`;
  }
  const [owner, id] = video.id.split("_");
  return `https://vkvideo.ru/video_ext.php?oid=${owner}&id=${id}&hd=2&autoplay=1`;
}

export default function VideoEmbed({
  video,
  title = "Видео",
}: {
  video: BlockVideo;
  title?: string;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-900 shadow-sm">
      {playing ? (
        <iframe
          src={playerUrl(video)}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Смотреть: ${title}`}
          className="group absolute inset-0 w-full h-full"
        >
          {/* VK offers no public thumbnail URL, so it keeps the plain backdrop. */}
          {video.provider === "youtube" && (
            <Image
              src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
              alt=""
              fill
              className="object-cover opacity-90 group-hover:opacity-100 transition-opacity"
              sizes="(max-width: 768px) 100vw, 560px"
            />
          )}
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent-500 text-white shadow-lg group-hover:bg-accent-400 group-hover:scale-105 transition-all">
              <svg aria-hidden="true" className="w-7 h-7 translate-x-0.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </span>
          {video.provider === "vk" && (
            <span className="absolute bottom-3 left-4 text-xs font-semibold text-slate-300">
              VK Видео
            </span>
          )}
        </button>
      )}
    </div>
  );
}
