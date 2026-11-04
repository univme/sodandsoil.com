import { makeMetadata } from "@/lib/seo";
import Link from "next/link";
import SocialShowcase from "@/components/SocialShowcase";

export const metadata = makeMetadata({path:"/social",title:"Landscaping Videos & Social Project Gallery",description:"See Express Turf Renovation sod, turf, paver and landscape project photos, plus videos from Southwest Florida jobsites and links to official social channels."});

export default function Social() {
  return (
    <>
      <section className="pagehero showcase-pagehero">
        <div className="shell">
          <p className="eyebrow light">PROJECT PHOTOS & SOCIAL</p>
          <h1>Our work. <em>In the spotlight.</em></h1>
          <p>Take a closer look at real outdoor transformations, watch short project videos and follow the team in the field.</p>
          <Link href="/" className="showcase-back-link">← Back to Home</Link>
        </div>
      </section>
      <section className="section shell showcase-page-section">
        <div className="intro">
          <div>
            <p className="eyebrow">A CLOSER LOOK</p>
            <h2>Real projects. <em>Fresh perspectives.</em></h2>
            <p className="sectiondesc">Browse a few recent project images, explore our video highlights and join the community on your favorite platform.</p>
          </div>
          <Link href="/projects" className="more">FULL PROJECT GALLERY ↗</Link>
        </div>
        <SocialShowcase expanded />
      </section>
      <section className="showcase-cta">
        <div className="shell showcase-cta-inner">
          <div>
            <p className="eyebrow light">YOUR YARD COULD BE NEXT</p>
            <h2>Have a project in mind?</h2>
          </div>
          <Link className="btn ivory" href="/contact">REQUEST AN ESTIMATE ↗</Link>
        </div>
      </section>
    </>
  );
}
