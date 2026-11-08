/**
 * Owner-supplied photographs, 2026-11-07.
 * Images describe visible work only; no unverified awards, timelines or before/after claims.
 * Public WebP files live at /public/projects/.
 * Original media is kept outside the repo; optimized upload package is separately provided.
 */
export type OwnerProject = {
  id: string;
  title: string;
  alt: string;
  src: string;
  fallbackSrc: string;
  href: string;
  width: number;
  height: number;
  position?: string;
};

const wix = (filename: string) => "https://static.wixstatic.com/media/" + filename;

export const ownerProjects: OwnerProject[] = [
  {
    id: "driveway-inlay",
    title: "Custom Turf Driveway Inlay",
    alt: "Express Turf Renovation crew installing green artificial turf inlay within a Florida paver driveway",
    src: "/projects/custom-turf-ribbons-driveway-renovation-florida.webp",
    fallbackSrc: wix("824a02_db6418ed0ada40b7bf871b1d82269857~mv2.jpeg"),
    href: "/services/artificial-turf",
    width: 1600, height: 1200, position: "center center",
  },
  {
    id: "pavers-turf-crew",
    title: "Paver & Artificial Turf Installation",
    alt: "Landscape workers positioning artificial turf over a prepared surface beside gray pavers at a Florida home",
    src: "/projects/modern-paver-artificial-grass-installation-crew.webp",
    fallbackSrc: wix("824a02_db6418ed0ada40b7bf871b1d82269857~mv2.jpeg"),
    href: "/services/hardscaping-pavers",
    width: 1600, height: 1200, position: "center center",
  },
  {
    id: "driveway-installation",
    title: "Express Turf Installation Crew",
    alt: "Express Turf Renovation crew at a Florida residential paver driveway during installation of artificial turf",
    src: "/projects/express-renovation-driveway-turf-inlay-naples-fl.webp",
    fallbackSrc: wix("824a02_597d718d768e4a9fa2ee0ba09072f369~mv2.jpg"),
    href: "/services/artificial-turf",
    width: 900, height: 1600, position: "center 60%",
  },
  {
    id: "sideyard",
    title: "Finished Artificial Turf Side Yard",
    alt: "Finished green artificial turf side yard with a white privacy fence, palms and mounted kayaks",
    src: "/projects/side-yard-artificial-grass-renovation-swfl.webp",
    fallbackSrc: wix("824a02_597d718d768e4a9fa2ee0ba09072f369~mv2.jpg"),
    href: "/services/artificial-turf",
    width: 900, height: 1600, position: "center 57%",
  },
  {
    id: "curved-turf",
    title: "Custom Curved Turf Landscape",
    alt: "Curved green artificial turf landscaped around a palm tree with white decorative stone edging",
    src: "/projects/curved-artificial-turf-bed-palm-tree-edging.webp",
    fallbackSrc: wix("824a02_597d718d768e4a9fa2ee0ba09072f369~mv2.jpg"),
    href: "/services/artificial-turf",
    width: 1600, height: 900, position: "center center",
  },
  {
    id: "commercial-palms",
    title: "Commercial Palm Installation",
    alt: "Landscape crew handling mature palm trees and large planters during renovation of a commercial plaza",
    src: "/projects/commercial-palm-tree-installation-naples-plaza.webp",
    fallbackSrc: wix("824a02_73b8eeb65ca645b193ba892bd3378e3e~mv2.jpg"),
    href: "/services/planting-nursery",
    width: 1600, height: 900, position: "center center",
  },
  {
    id: "crew-materials",
    title: "Preparing Turf Materials",
    alt: "Express Turf Renovation team member preparing materials near a flatbed carrying palletized landscape supplies",
    src: "/projects/express-renovation-crew-preparing-turf-materials.webp",
    fallbackSrc: wix("824a02_597d718d768e4a9fa2ee0ba09072f369~mv2.jpg"),
    href: "/about",
    width: 900, height: 1600, position: "center 78%",
  },
];

export const featuredOwnerProjects = [
  ownerProjects[3],
  ownerProjects[0],
  ownerProjects[5],
];
