import Link from "next/link";
import Image from "next/image";
import SocialShowcase from "@/components/SocialShowcase";
import { business, services, img } from "@/lib/site";

const showcase = [
  { title: "Sod Installation", image: "824a02_10f03874cb9545019ddf15d9519af935~mv2.jpeg", service: "sod-installation", label: "01 / NATURAL GRASS" },
  { title: "Artificial Turf", image: "824a02_597d718d768e4a9fa2ee0ba09072f369~mv2.jpg", service: "artificial-turf", label: "02 / LOW-UPKEEP SURFACES" },
  { title: "Hardscaping & Pavers", image: "824a02_db6418ed0ada40b7bf871b1d82269857~mv2.jpeg", service: "hardscaping-pavers", label: "03 / OUTDOOR LIVING" },
  { title: "Land & Property Cleanup", image: "824a02_2e822b80e2314c3ea6350f4b6df45a29~mv2.jpeg", service: "land-cleanup", label: "04 / SITE PREPARATION" },
  { title: "Tree Services", image: "824a02_1ace274373614f6aa936c8fedccd3cbe~mv2.jpeg", service: "tree-services", label: "05 / PALMS & TREES" },
];

const featured = [
  { image: "824a02_10f03874cb9545019ddf15d9519af935~mv2.jpeg", title: "Natural lawns", href: "/services/sod-installation" },
  { image: "824a02_db6418ed0ada40b7bf871b1d82269857~mv2.jpeg", title: "Hardscape details", href: "/services/hardscaping-pavers" },
  { image: "824a02_1ace274373614f6aa936c8fedccd3cbe~mv2.jpeg", title: "Landscape work", href: "/projects" },
];

const faqs = [
  {
    q: "Can I buy sod by the pallet without installation?",
    a: "Yes. Request a pallet quote and the team can confirm available varieties, quantities, pickup or delivery options, and current pricing.",
  },
  {
    q: "What is the difference between sod and artificial turf?",
    a: "Sod creates a living lawn that needs irrigation and ongoing care. Artificial turf uses a manufactured surface with different installation, drainage and upkeep considerations. The right choice depends on your property and how you use it.",
  },
  {
    q: "What should I include when requesting an estimate?",
    a: "Share your property location, the service you need, approximate dimensions, and any project photos you have. Val can discuss the next steps and current availability.",
  },
];

export default function Home() {
  return (
    <div className="concept-v2">
      <section className="v2-hero hero" aria-labelledby="v2-hero-title">
        <div className="v2-hero-text">
          <div className="v2-hero-inner">
            <p className="v2-eyebrow v2-eyebrow-light">SOD INSTALLATION · ARTIFICIAL TURF · FORT MYERS, FL</p>
            <h1 id="v2-hero-title">
              Florida outdoors,
              <br/><em>beautifully</em>
              <br/>renewed.
            </h1>
            <p className="v2-hero-description">
              Sod by the pallet. Expertly planned landscape installations.
              Outdoor spaces that feel ready for what comes next.
            </p>
            <div className="v2-actions">
              <Link className="v2-button v2-button-orange" href="/contact">
                Request a project estimate <span aria-hidden="true">↗</span>
              </Link>
              <Link className="v2-button v2-button-outline-light" href="/sod-by-the-pallet">
                Shop sod by the pallet <span aria-hidden="true">↗</span>
              </Link>
            </div>
            <div className="v2-hero-location">
              <span className="v2-small-rule" aria-hidden="true" />
              Based in Fort Myers. Serving Southwest Florida.
            </div>
          </div>
          <div className="v2-hero-index" aria-hidden="true">
            <span>EXPRESS TURF RENOVATION</span>
            <span>01 / 04</span>
          </div>
        </div>
        <div className="v2-hero-visual">
          <Image
            className="hero-image"
            src={img("824a02_5ec91aabd3294b399c74065551e0f8ac~mv2.jpg")}
            alt="Express Turf Renovation outdoor lawn project"
            fill
            priority
            quality={82}
            sizes="(max-width: 850px) 100vw, 54vw"
          />
          <div className="v2-hero-photo-veil" aria-hidden="true"/>
          <div className="v2-hero-phototag">
            <span className="v2-photo-tag-mark" aria-hidden="true">✳</span>
            <span>REAL OUTDOOR WORK<br/>SOUTHWEST FLORIDA</span>
          </div>
          <div className="v2-hero-side-label" aria-hidden="true">FROM THE GROUND UP — EXPRESS TURF</div>
        </div>
      </section>

      <section className="v2-intro shell" aria-labelledby="v2-intro-title">
        <div className="v2-intro-kicker">
          <span className="v2-folio">01 — OUR APPROACH</span>
          <span className="v2-intro-symbol" aria-hidden="true">✳</span>
        </div>
        <div className="v2-intro-main">
          <h2 id="v2-intro-title">The ground beneath your <em>best days.</em></h2>
          <p>
            A beautiful property begins with the right foundation. Whether you are
            refreshing a lawn, selecting artificial turf or creating a more
            functional outdoor space, we help you explore the materials and
            services that bring your plan together.
          </p>
          <div className="v2-intro-facts">
            <span>FAMILY-OWNED BUSINESS</span>
            <span>RESIDENTIAL &amp; COMMERCIAL INQUIRIES</span>
            <span>SOD SUPPLY + INSTALLATION</span>
          </div>
        </div>
      </section>

      <section className="v2-services-section" id="services" aria-labelledby="v2-services-title">
        <div className="shell">
          <div className="v2-section-heading">
            <div>
              <span className="v2-folio">02 — WHAT WE DO</span>
              <h2 id="v2-services-title">Spaces transformed.<br/><em>Details considered.</em></h2>
            </div>
            <div className="v2-heading-aside">
              <p>From the ground surface to the finishing details, explore the work behind a renewed outdoors.</p>
              <Link className="v2-underline-link" href="/services">All services <span aria-hidden="true">↗</span></Link>
            </div>
          </div>

          <div className="services v2-services">
            {showcase.map((s, i) => (
              <Link className={"v2-service v2-service-" + (i + 1)} key={s.service} href={"/services/" + s.service}>
                <Image src={img(s.image)} alt="" fill quality={76} sizes={i < 2 ? "(max-width: 760px) 100vw, 48vw" : "(max-width: 760px) 100vw, 33vw"}/>
                <span className="v2-service-shade" aria-hidden="true"/>
                <span className="v2-service-label">{s.label}</span>
                <span className="v2-service-footer">
                  <span>{s.title}</span>
                  <span className="v2-service-arrow" aria-hidden="true">↗</span>
                </span>
              </Link>
            ))}
          </div>
          <div className="v2-service-extras">
            {services.slice(5).map((s) => (
              <Link href={"/services/" + s.slug} key={s.slug}>{s.title}<span aria-hidden="true">↗</span></Link>
            ))}
          </div>
        </div>
      </section>

      <section className="v2-sod-feature" aria-labelledby="v2-sod-title">
        <div className="v2-sod-photo">
          <Image
            src={img("824a02_9130e0ca33a043f8bab1481dc17f3550~mv2.jpeg")}
            alt="Green natural sod lawn installation"
            fill
            sizes="(max-width: 900px) 100vw, 51vw"
            quality={77}
          />
          <span className="v2-photo-caption">NATURAL GRASS / REAL POSSIBILITIES</span>
        </div>
        <div className="v2-sod-content">
          <span className="v2-folio">03 — SOD &amp; SOIL</span>
          <h2 id="v2-sod-title">A fresh start,<br/><em>by the pallet.</em></h2>
          <p>
            Choose the living lawn that fits your property. Request sod
            by the pallet for your own project, or discuss supply and
            professional installation with the team.
          </p>
          <div className="v2-variety">
            <span>ST. AUGUSTINE</span>
            <span>ZOYSIA</span>
            <span>PASPALUM</span>
          </div>
          <p className="v2-sod-disclaimer">Availability, delivery options and prices are confirmed with the business.</p>
          <Link className="v2-button v2-button-dark" href="/sod-by-the-pallet">Explore sod options <span aria-hidden="true">↗</span></Link>
        </div>
      </section>

      <section className="v2-choice-section shell" aria-labelledby="v2-choice-title">
        <span className="v2-folio">THE RIGHT MATERIAL FOR YOUR SPACE</span>
        <div className="v2-choice-intro">
          <h2 id="v2-choice-title">Real grass or <em>artificial turf?</em></h2>
          <p>Two great starting points. Different care, feel and installation considerations.</p>
        </div>
        <div className="v2-choice-grid">
          <div className="v2-choice-item">
            <span className="v2-choice-num">01 / NATURAL SOD</span>
            <h3>Living green.</h3>
            <p>A natural lawn with seasonal growth, irrigation and ongoing care requirements.</p>
            <Link href="/services/sod-installation">Explore sod installation <span aria-hidden="true">↗</span></Link>
          </div>
          <div className="v2-choice-item">
            <span className="v2-choice-num">02 / ARTIFICIAL TURF</span>
            <h3>Evergreen surface.</h3>
            <p>A manufactured surface with its own drainage, installation and cleaning needs.</p>
            <Link href="/services/artificial-turf">Explore artificial turf <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </section>

      <section className="v2-projects" aria-labelledby="v2-projects-title">
        <div className="shell">
          <div className="v2-section-heading">
            <div>
              <span className="v2-folio v2-folio-light">04 — THE WORK</span>
              <h2 id="v2-projects-title">See what <em>takes shape.</em></h2>
            </div>
            <Link className="v2-underline-link v2-underline-light" href="/projects">View the project gallery <span aria-hidden="true">↗</span></Link>
          </div>
          <div className="v2-project-grid">
            {featured.map((p, i) => (
              <Link className={"v2-project v2-project-" + i} key={p.title} href={p.href}>
                <Image src={img(p.image)} alt={p.title + " project photo"} fill quality={76} sizes="(max-width: 760px) 100vw, 33vw"/>
                <span className="v2-project-gradient" aria-hidden="true"/>
                <span>{p.title}<span aria-hidden="true"> ↗</span></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="v2-social-section shell" aria-labelledby="v2-social-title">
        <div className="v2-section-heading">
          <div>
            <span className="v2-folio">FROM THE FIELD</span>
            <h2 id="v2-social-title">Work that speaks <em>for itself.</em></h2>
          </div>
          <p className="v2-heading-aside">Photos, short videos and project moments from Express Turf Renovation. Explore more on our social channels.</p>
        </div>
        <SocialShowcase/>
      </section>

      <section className="v2-how shell" aria-labelledby="v2-how-title">
        <div className="v2-section-heading">
          <div>
            <span className="v2-folio">START HERE</span>
            <h2 id="v2-how-title">A clear way <em>forward.</em></h2>
          </div>
          <p className="v2-heading-aside">No two properties are the same. Start the conversation with the details that matter.</p>
        </div>
        <div className="v2-steps">
          <div><span>01</span><h3>Tell us about the space.</h3><p>Share your location, the work you have in mind and useful photos.</p></div>
          <div><span>02</span><h3>Discuss the options.</h3><p>Review materials, project scope and practical considerations with the team.</p></div>
          <div><span>03</span><h3>Request an estimate.</h3><p>Confirm next steps, availability and pricing for your specific project.</p></div>
        </div>
      </section>

      <section className="v2-faq shell" aria-labelledby="v2-faq-title">
        <div className="v2-faq-heading">
          <span className="v2-folio">GOOD TO KNOW</span>
          <h2 id="v2-faq-title">A few things<br/><em>worth asking.</em></h2>
        </div>
        <div className="v2-faq-items">
          {faqs.map(({q,a})=>(
            <details key={q}>
              <summary>{q}<span aria-hidden="true">+</span></summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="v2-close" aria-labelledby="v2-close-title">
        <div className="shell v2-close-inner">
          <div>
            <span className="v2-folio v2-folio-light">EXPRESS TURF RENOVATION LLC · FORT MYERS, FL</span>
            <h2 id="v2-close-title">Your next outdoor<br/><em>chapter starts here.</em></h2>
          </div>
          <div className="v2-close-cta">
            <Link className="v2-button v2-button-orange" href="/contact">Request an estimate <span aria-hidden="true">↗</span></Link>
            <a href={"tel:"+business.tel}>Or call Val at {business.phone}</a>
            <span>{business.address}</span>
          </div>
        </div>
      </section>
    </div>
  );
}
