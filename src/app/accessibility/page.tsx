import { makeMetadata } from "@/lib/seo";
import Link from "next/link";

export const metadata = makeMetadata({path:"/accessibility",title:"Accessibility Commitment & Feedback",description:"Learn how Express Turf Renovation LLC is improving the accessibility of its website and how to report an access issue."});

export default function Accessibility() {
  return (
    <>
      <section className="pagehero">
        <div className="shell">
          <p className="eyebrow light">INCLUSIVE DIGITAL EXPERIENCES</p>
          <h1>Accessibility <em>matters.</em></h1>
          <p>We want everyone to be able to explore our services and contact our team.</p>
        </div>
      </section>
      <article className="pagecontent">
        <h2>Our commitment</h2>
        <p>
          Express Turf Renovation LLC is working toward an accessible, usable website for people
          with disabilities. Our engineering target is the Web Content Accessibility Guidelines
          (WCAG) 2.2 Level AA. This is a target and ongoing process, not a claim of certification
          or confirmation of full conformance.
        </p>
        <h2>Evaluation and improvement</h2>
        <p>
          Last reviewed November 3, 2026. Our team has performed automated testing of representative
          pages at mobile and desktop sizes, and is correcting identified issues involving accessible
          names, keyboard focus, and contrast. Automated checks cannot establish full accessibility.
          Manual keyboard, screen-reader, zoom and reflow testing remains part of our review process.
        </p>
        <p>
          Embedded YouTube videos and Cloudflare security checks are third-party experiences that
          require separate accessibility verification. We are also reviewing video captions and
          transcription needs. Customer inquiry forms may remain disabled while secure delivery is
          being configured; telephone and email are available alternatives.
        </p>
        <h2>Report an accessibility problem</h2>
        <p>
          If any part of our website is difficult to use, please let us know what happened and which
          page or feature was involved. Contact Express Turf Renovation by phone at{" "}
          <a href="tel:+12398488290">(239) 848-8290</a> or by email at{" "}
          <a href="mailto:expressturfrenovation@gmail.com">
            expressturfrenovation@gmail.com
          </a>
          . We will work with you to provide an alternative way to get the information or services
          you need.
        </p>
        <p><Link href="/contact">Contact our team ↗</Link></p>
      </article>
    </>
  );
}
