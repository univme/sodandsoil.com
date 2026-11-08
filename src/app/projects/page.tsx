import Link from "next/link";
import { services } from "@/lib/site";
import ProjectImage from "@/components/ProjectImage";
import { ownerProjects } from "@/lib/owner-projects";
import { makeMetadata } from "@/lib/seo";

export const metadata = makeMetadata({
  path: "/projects",
  title: "Real Turf, Pavers & Landscape Project Photos | Fort Myers",
  description: "See original Express Turf Renovation project photography of artificial grass, driveway turf inlays, pavers and commercial palm installation in Southwest Florida.",
});

export default function Projects() {
  return (
    <>
      <section className="pagehero">
        <div className="shell">
          <p className="eyebrow light">REAL PROJECTS · REAL PEOPLE</p>
          <h1>Beautiful transformations, <em>real work.</em></h1>
          <p>Explore photographs of turf installation, paver details, finished lawns, the crew at work and palm planting on Southwest Florida properties.</p>
        </div>
      </section>
      <section className="section shell" aria-labelledby="owner-project-gallery-heading">
        <p className="eyebrow">FROM THE FIELD</p>
        <h2 id="owner-project-gallery-heading">Our work, <em>up close.</em></h2>
        <p className="sectiondesc">Genuine project and jobsite photography supplied by the company. Images show a mix of work in progress and finished spaces.</p>
        <div className="gallery owner-project-grid">
          {ownerProjects.map((project) => (
            <Link href={project.href} key={project.id} className="galleryitem owner-project-item">
              <ProjectImage project={project} sizes="(max-width: 760px) 100vw, 33vw"/>
              <span>{project.title.toUpperCase()} <span aria-hidden="true">↗</span></span>
            </Link>
          ))}
        </div>
        <div className="owner-project-footnote">
          <p>Have a similar project in mind? The scope, products and availability are confirmed for each property.</p>
          <Link className="btn orange" href="/contact">REQUEST A PROJECT ESTIMATE ↗</Link>
        </div>
      </section>
      <section className="section shell owner-project-service-links">
        <p className="eyebrow">EXPLORE SERVICES</p>
        <h2>Find the right <em>solution.</em></h2>
        <div className="tags">
          {services.map((service) => (
            <Link href={"/services/" + service.slug} key={service.slug}>{service.title} ↗</Link>
          ))}
        </div>
      </section>
    </>
  );
}
