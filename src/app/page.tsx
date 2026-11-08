import Link from "next/link";
import Image from "next/image";
import SocialShowcase from "@/components/SocialShowcase";
import ProjectImage from "@/components/ProjectImage";
import { featuredOwnerProjects } from "@/lib/owner-projects";
import { business, services, img } from "@/lib/site";

export default function Home() {
  return (
    <>
      <section className="hero">
        <Image
          className="hero-image"
          src={img("824a02_5ec91aabd3294b399c74065551e0f8ac~mv2.jpg")}
          alt=""
          fill
          priority
          quality={80}
          sizes="100vw"
        />
        <div className="hero-shade" aria-hidden="true"/>
        <div className="shell herocontent">
          <p className="eyebrow light">SOD INSTALLATION · ARTIFICIAL TURF · FORT MYERS, FL</p>
          <h1>Outdoor spaces.<br/><em>Extraordinary</em><br/>possibilities.</h1>
          <p className="lead">From fresh sod and pristine artificial turf to custom pavers, outdoor lighting and complete landscape transformations—bring your next outdoor chapter to life.</p>
          <p className="hero-keywords">Sod installation, artificial turf &amp; outdoor renovation across Southwest Florida.</p>
          <div className="buttons">
            <Link className="btn orange" href="/contact">START YOUR PROJECT ↗</Link>
            <Link className="btn ghost" href="/sod-by-the-pallet">SOD BY THE PALLET ↗</Link>
          </div>
        </div>
        <div className="herofoot shell">FORT MYERS · CAPE CORAL · NAPLES <span>SCROLL TO EXPLORE ↓</span></div>
      </section>
      <section className="facts">
        <div className="shell factsgrid">
          <span>✳ <b>Family-owned</b> local expertise</span>
          <span>◎ <b>Residential &amp; commercial</b> projects</span>
          <span>↗ <b>Materials &amp; installation</b></span>
        </div>
      </section>
      <section className="section shell">
        <div className="intro">
          <div>
            <p className="eyebrow">WHAT WE CREATE</p>
            <h2>Sod, turf &amp; outdoor spaces <em>reimagined.</em></h2>
            <p className="sectiondesc">Professional sod installation, artificial turf, hardscaping, land cleanup and tree services in Southwest Florida. Explore the work we can discuss for your property.</p>
          </div>
          <Link href="/services" className="more">EXPLORE ALL SERVICES ↗</Link>
        </div>
        <div className="services">
          {services.slice(0, 5).map((s, i) => (
            <Link href={"/services/" + s.slug} className={"tile tile" + i} key={s.slug}>
              <Image src={img(s.image)} fill sizes={i < 2 ? "(max-width: 760px) 100vw, 50vw" : "(max-width: 760px) 100vw, 33vw"} alt="" quality={76} />
              <span className="n">0{i + 1}</span>
              <div><h3>{s.title}</h3><p>{s.desc}</p></div>
              <span className="arrow">↗</span>
            </Link>
          ))}
        </div>
        <div className="tags">{services.slice(5).map(s => <Link href={"/services/" + s.slug} key={s.slug}>{s.title} ↗</Link>)}</div>
      </section>
      <section className="split">
        <div className="splitphoto">
          <Image src={img("824a02_9130e0ca33a043f8bab1481dc17f3550~mv2.jpeg")} alt="New sod installation on a Southwest Florida lawn" fill sizes="(max-width: 760px) 100vw, 50vw" quality={76}/>
        </div>
        <div className="splitcopy">
          <p className="eyebrow">REAL GRASS. REAL OPTIONS.</p>
          <h2>Fresh starts come <em>by the pallet.</em></h2>
          <p>Homeowners, landscapers, and contractors can request sod by the pallet or ask for a supply-and-installation estimate. St. Augustine, Zoysia, and Paspalum are among the varieties discussed by the company.</p>
          <div className="chips"><span>St. Augustine</span><span>Zoysia</span><span>Paspalum</span></div>
          <p className="note">Availability, quantity, pickup, delivery and final pricing are confirmed by the business.</p>
          <Link href="/sod-by-the-pallet" className="btn orange">REQUEST SOD PRICING ↗</Link>
        </div>
      </section>
      <section className="section shell">
        <p className="eyebrow">REAL PROJECTS</p>
        <h2>From vision <em>to view.</em></h2>
        <div className="gallery">
          {featuredOwnerProjects.map(project => (
            <Link href={project.href} key={project.id} className="galleryitem">
              <ProjectImage project={project} sizes="(max-width: 760px) 100vw, 33vw"/>
              <span>{project.title.toUpperCase()} ↗</span>
            </Link>
          ))}
        </div>
      </section>
      <section className="darksection">
        <div className="shell darkgrid">
          <div>
            <p className="eyebrow light">ROOTED IN SOUTHWEST FLORIDA</p>
            <h2>Local roots.<br/><em>Big outdoor ideas.</em></h2>
            <p>Serving {business.cities.join(", ")} and nearby communities. Contact us to discuss availability for your address.</p>
            <Link href="/contact" className="btn orange">GET AN ESTIMATE ↗</Link>
          </div>
          <div className="citylist">
            {business.cities.map((c, i) => <p key={c}><span>0{i + 1}</span> {c} <span>↗</span></p>)}
          </div>
        </div>
      </section>
      <section className="section shell">
        <div className="intro">
          <div>
            <p className="eyebrow">FOLLOW THE TRANSFORMATIONS</p>
            <h2>See the work <em>come to life.</em></h2>
            <p className="sectiondesc">A glimpse of real installations and finished projects, with short video highlights and the latest from our social channels.</p>
          </div>
          <Link className="more" href="/social">VISIT THE SOCIAL GALLERY ↗</Link>
        </div>
        <SocialShowcase/>
      </section>
      <section className="cta">
        <div className="shell">
          <p className="eyebrow light">READY TO BEGIN?</p>
          <h2>Let's make something <em>beautiful.</em></h2>
          <Link href="/contact" className="btn ivory">REQUEST AN ESTIMATE ↗</Link>
          <a href={"tel:" + business.tel} className="call">OR CALL {business.phone}</a>
        </div>
      </section>
    </>
  );
}
