import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { services, img, business } from "@/lib/site";
import { serviceDetails } from "@/lib/service-content";
import { makeMetadata } from "@/lib/seo";

type ServicePageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const s = services.find(item => item.slug === slug);
  if (!s) return {};
  return makeMetadata({
    path: "/services/" + slug,
    title: s.title + " in Fort Myers, FL",
    description: s.title + " in Fort Myers and Southwest Florida. " + s.desc + " Request a property estimate from Express Turf Renovation.",
  });
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const s = services.find(item => item.slug === slug);
  if (!s) notFound();
  const details = serviceDetails[slug];

  const structured = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.title,
    description: s.desc,
    url: "https://sodandsoil.com/services/" + slug,
    provider: { "@id": "https://sodandsoil.com/#business" },
    areaServed: business.cities.map(name => ({ "@type": "City", name })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(structured).replace(/</g, "\\u003c")}}/>
      <section className="pagehero">
        <div className="shell">
          <p className="eyebrow light">SOUTHWEST FLORIDA · EXPRESS TURF RENOVATION LLC</p>
          <h1>{s.title} in <em>Fort Myers, FL.</em></h1>
          <p>{s.desc}</p>
        </div>
      </section>
      <div className="pagephoto">
        <Image src={img(s.image)} alt={s.title + " project in Southwest Florida"} fill sizes="100vw" quality={78}/>
      </div>
      <article className="pagecontent">
        <nav aria-label="Breadcrumb" className="service-breadcrumb">
          <Link href="/">Home</Link> / <Link href="/services">Services</Link> / <span aria-current="page">{s.title}</span>
        </nav>
        <h2>{s.title} for Southwest Florida properties</h2>
        <p>{details.summary}</p>
        <h2>What to consider for your project</h2>
        <ul>{details.considerations.map(text => <li key={text}>{text}</li>)}</ul>
        <p>From Fort Myers to Cape Coral, Estero, Bonita Springs, Naples and Lehigh Acres, the first step is discussing your property location, goals and access requirements. Pricing and availability depend on the individual project.</p>
        <h2>Questions about {s.title.toLowerCase()}</h2>
        {details.questions.map(([question, answer]) => (
          <section key={question} className="service-faq">
            <h3>{question}</h3>
            <p>{answer}</p>
          </section>
        ))}
        <Link className="btn orange" href="/contact">REQUEST A {s.title.toUpperCase()} ESTIMATE ↗</Link>
        <p style={{marginTop:24}}><Link href="/services">← View all services</Link></p>
      </article>
    </>
  );
}
