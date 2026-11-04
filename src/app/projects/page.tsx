import Link from "next/link";
import Image from "next/image";
import { services, img } from "@/lib/site";
import { makeMetadata } from "@/lib/seo";
export const metadata=makeMetadata({
  path:"/projects",title:"Sod, Turf & Landscaping Project Gallery in Fort Myers",
  description:"Browse real sod, artificial turf, paver, palm and landscaping photos from Express Turf Renovation projects in Southwest Florida."
});
export default function Projects(){
 return <>
  <section className="pagehero">
    <div className="shell">
      <p className="eyebrow light">SOD, TURF & LANDSCAPING PROJECT PHOTOS</p>
      <h1>Beautiful transformations, <em>real projects.</em></h1>
      <p>Explore outdoor renovation work from Fort Myers and surrounding Southwest Florida communities.</p>
    </div>
  </section>
  <div className="section shell">
    <div className="gallery">
      {services.slice(0,9).map(s=>
        <Link href={"/services/"+s.slug} key={s.slug} className="galleryitem">
          <Image src={img(s.image)} alt={s.title+" landscaping project"} fill sizes="(max-width: 760px) 100vw, 33vw" quality={76}/>
          <span>{s.title.toUpperCase()} ↗</span>
        </Link>
      )}
    </div>
  </div>
 </>;
}
