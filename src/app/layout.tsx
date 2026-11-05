import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { DM_Sans, Playfair_Display } from "next/font/google";
import OptionalAnalytics from "@/components/OptionalAnalytics";
import { business, services, socials } from "@/lib/site";
import "./globals.css";

const dmSans = DM_Sans({ subsets: ["latin"], display: "swap", variable: "--font-dm" });
const playfair = Playfair_Display({ subsets: ["latin"], display: "swap", variable: "--font-playfair" });

export const metadata: Metadata = {
  metadataBase: new URL("https://sodandsoil.com"),
  title: {
    default: "Sod Installation & Artificial Turf in Fort Myers, FL | Express Turf Renovation",
    template: "%s | Express Turf Renovation",
  },
  description: "Express Turf Renovation LLC provides sod installation, sod by the pallet, artificial turf, pavers, landscape lighting and outdoor renovation in Southwest Florida.",
  alternates: { canonical: "https://sodandsoil.com/" },
  openGraph: {
    type: "website",
    siteName: business.name,
    title: "Sod Installation & Artificial Turf | Express Turf Renovation",
    description: "Sod by the pallet, artificial turf, hardscaping, tree services and outdoor renovation in Southwest Florida.",
    url: "https://sodandsoil.com/",
  },
  twitter: { card: "summary", title: business.name },
};

export default function RootLayout({ children }: {children: ReactNode}) {
  const structured = {
    "@context": "https://schema.org",
    "@type": "LandscapingBusiness",
    "@id": "https://sodandsoil.com/#business",
    name: business.name,
    url: "https://sodandsoil.com/",
    telephone: business.phone,
    email: business.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "16191 S Tamiami Trail",
      addressLocality: "Fort Myers",
      addressRegion: "FL",
      postalCode: "33908",
      addressCountry: "US",
    },
    areaServed: business.cities.map((name) => ({ "@type": "City", name })),
    sameAs: socials.map((s) => s[1]),
  };
  return (
    <html lang="en">
      <body className={dmSans.variable + " " + playfair.variable}>
        <a className="skip" href="#main">Skip to content</a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structured).replace(/</g, "\\u003c") }}
        />
        <header className="header">
          <div className="topline">
            <span>LANDSCAPES THAT MAKE AN IMPRESSION</span>
            <a href={"tel:" + business.tel}>CALL VAL: {business.phone}</a>
          </div>
          <div className="nav shell">
            <Link href="/" className="brand">
              <Image src="/logo-light.webp" alt={business.name} width={196} height={115} priority sizes="196px"/>
            </Link>
            <nav className="navlinks" aria-label="Main navigation">
              <Link href="/">Home</Link>
              <Link href="/services">Services</Link>
              <Link href="/sod-by-the-pallet">Sod by the Pallet</Link>
              <Link href="/projects">Our Work</Link>
              <Link href="/social">Social & Videos</Link>
              <Link href="/about">About</Link>
            </nav>
            <details className="v2-mobile-menu">
              <summary>Menu <span aria-hidden="true">☰</span></summary>
              <nav aria-label="Mobile navigation">
                <Link href="/">Home</Link>
                <Link href="/services">Services</Link>
                <Link href="/sod-by-the-pallet">Sod by the Pallet</Link>
                <Link href="/projects">Our Work</Link>
                <Link href="/social">Social &amp; Videos</Link>
                <Link href="/about">About</Link>
                <Link href="/contact">Request an Estimate</Link>
              </nav>
            </details>
            <Link className="btn orange small" href="/contact">GET AN ESTIMATE ↗</Link>
          </div>
        </header>
        <main id="main" tabIndex={-1}>{children}</main>
        <footer className="footer">
          <div className="shell footergrid">
            <div>
              <Image src="/logo-dark.webp" alt={business.name} width={250} height={150} sizes="250px"/>
              <p>Outdoor spaces thoughtfully transformed for Southwest Florida.</p>
            </div>
            <div>
              <h3>Explore</h3>
              <Link href="/">Home</Link>
              {services.slice(0, 5).map((s) => <Link key={s.slug} href={"/services/" + s.slug}>{s.title}</Link>)}
              <Link href="/sod-by-the-pallet">Sod by the Pallet</Link>
            </div>
            <div>
              <h3>Contact</h3>
              <a href={"tel:" + business.tel}>{business.phone}</a>
              <a href={"mailto:" + business.email}>{business.email}</a>
              <p>{business.address}</p>
              <Link href="/contact">Request an Estimate ↗</Link>
            </div>
            <div>
              <h3>Follow the work</h3>
              {socials.map((s) =>
                <a key={s[0]} href={s[1]} target="_blank" rel="noopener noreferrer">{s[0]} ↗</a>
              )}
            </div>
          </div>
          <div className="shell footbottom">
            <span>© {new Date().getFullYear()} {business.name}</span>
            <span><Link href="/privacy">Privacy</Link> · <Link href="/accessibility">Accessibility</Link></span>
          </div>
        </footer>
        <OptionalAnalytics/>
      </body>
    </html>
  );
}
