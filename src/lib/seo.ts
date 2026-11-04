import type { Metadata } from "next";
export const siteUrl = "https://sodandsoil.com";
export const brandName = "Express Turf Renovation LLC";
export function makeMetadata({ path, title, description }: {path:string;title:string;description:string;}): Metadata {
  const url = new URL(path, siteUrl).toString();
  return { title, description, alternates:{canonical:url},
    openGraph:{type:"website",url,title:title+" | "+brandName,description,siteName:brandName},
    twitter:{card:"summary",title,description} };
}
