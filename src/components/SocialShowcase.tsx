import Link from "next/link";
import Image from "next/image";
import { SiFacebook, SiInstagram, SiTiktok, SiYoutube } from "react-icons/si";
import { socials } from "@/lib/site";
import { ownerProjects } from "@/lib/owner-projects";
import ProjectImage from "@/components/ProjectImage";

const photos = [
  ownerProjects[3], // finished residential turf
  ownerProjects[0], // custom driveway inlay
  ownerProjects[4], // curved turf detailing
  ownerProjects[5], // commercial palm planting
  ownerProjects[1], // installation process
  ownerProjects[6], // team and materials
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
        {photos.slice(0, expanded ? 6 : 4).map(project => (
          <Link
            className="showcase-photo"
            href={project.href}
            key={project.id}
          >
            <ProjectImage
              project={project}
              sizes={expanded ? "(max-width: 760px) 50vw, 33vw" : "(max-width: 760px) 50vw, 25vw"}
            />
            <span>{project.title} <span className="showcase-photo-arrow" aria-hidden="true">↗</span></span>
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
              >
                <span className="showcase-video-thumb">
                  <Image
                    src={`https://i.ytimg.com/vi/${id}/mqdefault.jpg`}
                    width={160}
                    height={90}
                    sizes="160px"
                    quality={72}
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
