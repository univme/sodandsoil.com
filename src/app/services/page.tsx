import Link from "next/link";
import Image from "next/image";
import { services, img } from "@/lib/site";
import { makeMetadata } from "@/lib/seo";
export const metadata=makeMetadata({
 path:"/services",title:"Sod, Artificial Turf & Landscaping Services in Fort Myers",
 description:"Sod installation, turf, hardscaping, tree services, low-voltage lighting, outdoor speakers, irrigation and landscape renovation in Southwest Florida."
});
export default function Services(){
 return <>
  <section className="pagehero">
    <div className="shell">
      <p className="eyebrow light">EXPLORE OUR LANDSCAPING SERVICES</p>
      <h1>Sod, artificial turf & outdoor <em>possibilities.</em></h1>
      <p>From sod by the pallet to hardscaping, landscape lighting and outdoor audio in Southwest Florida.</p>
    </div>
  </section>
  <div className="pagecontent">
    {services.map(s=>
      <Link href={"/services/"+s.slug} className="servicerow" key={s.slug}>
        <Image src={img(s.image)} alt="" width={320} height={214} sizes="(max-width:760px) 100vw, 240px" quality={74} style={{objectFit:"cover"}}/>
        <div><h2 style={{fontSize:28}}>{s.title} ↗</h2><p>{s.desc}</p></div>
      </Link>
    )}
  </div>
 </>;
}
