import Link from "next/link";
import VideoGallery from "@/components/VideoGallery";
import { socials } from "@/lib/site";

export const metadata = {
  title: "Project Videos & Social | Express Turf Renovation",
  description: "Watch real project videos from Express Turf Renovation and explore our YouTube, TikTok, Instagram and Facebook channels.",
};

export default function Social() {
  return (
    <>
      <section className="pagehero">
        <div className="shell">
          <p className="eyebrow light">PROJECT VIDEOS & SOCIAL</p>
          <h1>See the work <em>come to life.</em></h1>
          <p>Go behind the scenes of real installations and see outdoor renovations in action.</p>
          <Link href="/" className="btn ivory">← BACK TO HOME</Link>
        </div>
      </section>
      <section className="section shell">
        <p className="eyebrow">FROM OUR YOUTUBE CHANNEL</p>
        <h2>Built with care. <em>Captured on camera.</em></h2>
        <p className="sectiondesc">Two project videos from the company's channel, plus links to follow new work on our active social channels.</p>
        <VideoGallery full />
      </section>
      <section className="darksection">
        <div className="shell">
          <p className="eyebrow light">FOLLOW EXPRESS TURF</p>
          <h2>More stories from <em>the field.</em></h2>
          <div className="sociallist">
            {socials.map(([name, url]) => (
              <a key={name} href={url} target="_blank" rel="noopener noreferrer">{name} ↗</a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
