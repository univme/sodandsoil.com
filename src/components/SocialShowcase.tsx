import Link from "next/link";
import { SiFacebook, SiInstagram, SiTiktok, SiYoutube } from "react-icons/si";
import { img, services, socials } from "@/lib/site";

const photos = [
  { title: "Sod installation", image: services[0].image },
  { title: "Artificial turf", image: services[1].image },
  { title: "Pavers & hardscaping", image: services[2].image },
  { title: "Landscape & tree work", image: services[4].image },
  { title: "Outdoor lighting", image: services[5].image },
  { title: "Planting & nursery", image: services[8].image },
];

const videos = [
  { id: "0cBNdbboUbA", title: "Palmetto turf installation" },
  { id: "OdvtYv_AvjY", title: "Turf installation in action" },
];

const platforms = [
  { name: "TikTok", Icon: SiTiktok, color: "tiktok" },
  { name: "YouTube", Icon: SiYoutube, color: "youtube" },
  { name: "Instagram", Icon: SiInstagram, color: "instagram" },
  { name: "Facebook", Icon: SiFacebook, color: "facebook" },
] as const;

export default function SocialShowcase({ expanded = false }: { expanded?: boolean }) {
  return (
    <div className="social-showcase">
      <div className={expanded ? "showcase-photo-grid showcase-photo-grid-expanded" : "showcase-photo-grid"}>
        {photos.slice(0, expanded ? 6 : 4).map(({ title, image }) => (
          <Link
            className="showcase-photo"
            href="/projects"
            key={title}
            aria-label={`Explore ${title.toLowerCase()} project photos`}
          >
            <img
              src={img(image)}
              alt={`Express Turf Renovation ${title.toLowerCase()} project`}
              width={480}
              height={320}
              loading="lazy"
              decoding="async"
            />
            <span aria-hidden="true">{title} <span className="showcase-photo-arrow">↗</span></span>
          </Link>
        ))}
      </div>

      <div className="showcase-detail-grid">
        <section className="showcase-video-panel" aria-labelledby="showcase-video-heading">
          <div className="showcase-panel-heading">
            <div>
              <span className="showcase-kicker">REAL WORK, ON CAMERA</span>
              <h3 id="showcase-video-heading">Watch the transformations</h3>
            </div>
            <a
              href="https://www.youtube.com/@expressturfrenovation"
              className="showcase-text-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Full channel <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="showcase-video-list">
            {videos.map(({ id, title }) => (
              <a
                className="showcase-video-link"
                href={`https://www.youtube.com/watch?v=${id}`}
                key={id}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Watch ${title} on YouTube (opens in a new tab)`}
              >
                <span className="showcase-video-thumb">
                  <img
                    src={`https://i.ytimg.com/vi/${id}/mqdefault.jpg`}
                    width={160}
                    height={90}
                    loading="lazy"
                    decoding="async"
                    alt=""
                  />
                  <span className="showcase-play-mark" aria-hidden="true">▶</span>
                </span>
                <span className="showcase-video-info">
                  <strong>{title}</strong>
                  <span className="showcase-video-provider"><SiYoutube aria-hidden="true" focusable="false"/> YouTube video <span aria-hidden="true">↗</span></span>
                </span>
              </a>
            ))}
          </div>
        </section>

        <section className="showcase-follow-panel" aria-labelledby="showcase-follow-heading">
          <span className="showcase-kicker">FOLLOW EXPRESS TURF</span>
          <h3 id="showcase-follow-heading">Fresh projects, straight from the field.</h3>
          <p>See recent installs, finished landscapes, crew updates and short-form videos.</p>
          <nav aria-label="Express Turf social media profiles" className="showcase-social-links">
            {platforms.map(({ name, Icon, color }) => {
              const profile = socials.find(([socialName]) => socialName === name);
              if (!profile) return null;
              return (
                <a
                  href={profile[1]}
                  className="showcase-social-link"
                  key={name}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className={`showcase-social-icon showcase-social-icon-${color}`} aria-hidden="true">
                    <Icon size={21} focusable="false"/>
                  </span>
                  <span className="showcase-social-name">{name}</span>
                  <span className="showcase-social-arrow" aria-hidden="true">↗</span>
                </a>
              );
            })}
          </nav>
        </section>
      </div>

      {!expanded && (
        <div className="showcase-view-all">
          <span>More projects and behind-the-scenes footage</span>
          <Link className="showcase-view-all-link" href="/social">
            EXPLORE THE SOCIAL GALLERY <span aria-hidden="true">↗</span>
          </Link>
        </div>
      )}
    </div>
  );
}
