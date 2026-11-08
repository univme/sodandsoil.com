"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { OwnerProject } from "@/lib/owner-projects";

/**
 * Displays local optimized owner images when deployed, with a previous
 * company-hosted image fallback while the media upload is pending.
 * The fallback avoids publishing blank image cards on a staging preview.
 */
export default function ProjectImage({
  project,
  sizes,
  priority = false,
}: {
  project: OwnerProject;
  sizes: string;
  priority?: boolean;
}) {
  const [fallback, setFallback] = useState(false);
  useEffect(() => setFallback(false), [project.src]);

  return (
    <Image
      src={fallback ? project.fallbackSrc : project.src}
      alt={project.alt}
      fill
      sizes={sizes}
      quality={78}
      priority={priority}
      onError={() => setFallback(true)}
      style={{ objectFit: "cover", objectPosition: project.position ?? "center" }}
    />
  );
}
