import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services, img } from "@/lib/site";

type ServicePageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  return {
    title: service ? service.title + " in Southwest Florida" : "Service",
    description: service?.desc,
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);

  if (!service) notFound();

  return (
    <>
      <section className="pagehero">
        <div className="shell">
          <p className="eyebrow light">EXPRESS TURF RENOVATION LLC</p>
          <h1>{service.title}</h1>
          <p>{service.desc}</p>
        </div>
      </section>
      <div
        className="pagephoto"
        style={{ backgroundImage: `url("${img(service.image)}")` }}
        role="img"
        aria-label={service.title + " project photo"}
      />
      <article className="pagecontent">
        <h2>Thoughtful outdoor improvements for Southwest Florida.</h2>
        <p>
          {service.desc} Every property is different, and the right scope begins with a
          conversation about your goals, site conditions and budget.
        </p>
        <p>
          Express Turf Renovation serves homeowners and commercial properties in Fort Myers,
          Cape Coral, Estero, Bonita Springs, Naples and Lehigh Acres. Contact the team to
          discuss your property, service availability and an estimate.
        </p>
        <Link className="btn orange" href="/contact">
          REQUEST A {service.title.toUpperCase()} ESTIMATE ↗
        </Link>
        <p style={{ marginTop: 24 }}>
          <Link href="/services">← View all services</Link>
        </p>
      </article>
    </>
  );
}
