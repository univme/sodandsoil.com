"use client";

import { useState } from "react";
import Link from "next/link";

const videos = [
  {
    id: "0cBNdbboUbA",
    title: "Palmetto Turf Installation",
    detail: "A real Express Turf Renovation project",
  },
  {
    id: "OdvtYv_AvjY",
    title: "Turf Installation in Action",
    detail: "From the jobsite to the finished lawn",
  },
] as const;

export default function VideoGallery({ full = false }: { full?: boolean }) {
  const [active, setActive] = useState<string[]>([]);

  return (
    <div className="video-gallery">
      <div className="video-gallery-grid">
        {videos.map((video) => {
          const playing = active.includes(video.id);
          return (
            <article className="video-card" key={video.id}>
              <div className="video-frame">
                {playing ? (
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
                    title={video.title + " — Express Turf Renovation"}
                    loading="lazy"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                ) : (
                  <button
                    className="video-play"
                    type="button"
                    onClick={() => setActive((current) => [...current, video.id])}
                    aria-label={`Play ${video.title}`}
                    style={{
                      backgroundImage: `linear-gradient(0deg, rgba(4, 35, 27, .62), rgba(4, 35, 27, .08)), url("https://i.ytimg.com/vi/${video.id}/hqdefault.jpg")`,
                    }}
                  >
                    <span className="video-play-icon" aria-hidden="true">▶</span>
                    <span className="video-play-label">WATCH PROJECT VIDEO</span>
                  </button>
                )}
              </div>
              <div className="video-caption">
                <span className="eyebrow">FROM THE FIELD</span>
                <h3>{video.title}</h3>
                <p>{video.detail}</p>
              </div>
            </article>
          );
        })}
      </div>
      <div className="video-gallery-footer">
        <div>
          <p className="eyebrow">MORE BEHIND THE SCENES</p>
          <p>Follow current installations, outdoor transformations and crew updates.</p>
        </div>
        <div className="buttons">
          <a className="btn outline" href="https://www.tiktok.com/@expressrenovation" target="_blank" rel="noopener noreferrer">WATCH ON TIKTOK ↗</a>
          <a className="btn outline" href="https://www.youtube.com/@expressturfrenovation" target="_blank" rel="noopener noreferrer">MORE ON YOUTUBE ↗</a>
          {!full && <Link className="btn orange" href="/social">VIEW VIDEO GALLERY ↗</Link>}
        </div>
      </div>
    </div>
  );
}
