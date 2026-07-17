import type { ComponentType, CSSProperties, SVGProps } from "react";
import { BlossomShape, BlossomShapeB, PetalShape } from "./decorations/Icons";

type Corner = "tl" | "tr" | "bl" | "br";

interface FloralClusterProps {
  /** Which corner of the parent to anchor the posy to. */
  corner: Corner;
  /** Overall scale of the posy (default 1). */
  scale?: number;
  className?: string;
}

interface Bloom {
  Shape: ComponentType<SVGProps<SVGSVGElement>>;
  x: number;
  y: number;
  s: number;
  c: string;
  r: number;
}

/**
 * A small floral corner posy, designed anchored to the top-left; the other
 * corners simply mirror it. It's assembled from the site's own blossom/petal
 * shapes (and the same rose/blush/gold palette) so the cover florals match the
 * petals that fall elsewhere on the invitation.
 */
const BLOOMS: Bloom[] = [
  { Shape: BlossomShape, x: 3, y: 1, s: 38, c: "var(--color-babypink)", r: -8 },
  { Shape: BlossomShapeB, x: 32, y: 0, s: 25, c: "#fff7f1", r: 16 },
  { Shape: BlossomShape, x: 0, y: 29, s: 26, c: "var(--color-rosegold-soft)", r: 30 },
  { Shape: BlossomShapeB, x: 39, y: 28, s: 18, c: "var(--color-babypink)", r: 4 },
  { Shape: BlossomShapeB, x: 57, y: 33, s: 13, c: "#fff7f1", r: 0 },
  { Shape: PetalShape, x: 55, y: 10, s: 19, c: "var(--color-gold)", r: 58 },
  { Shape: PetalShape, x: 20, y: 46, s: 17, c: "var(--color-rosegold-soft)", r: -52 },
];

export function FloralCluster({ corner, scale = 1, className }: FloralClusterProps) {
  const cls = ["floral-cluster", `floral-cluster--${corner}`, className].filter(Boolean).join(" ");
  return (
    <span className={cls} style={{ ["--fc-scale" as string]: scale } as CSSProperties} aria-hidden="true">
      {BLOOMS.map((b, i) => {
        const Shape = b.Shape;
        return (
          <Shape
            key={i}
            className="floral-cluster__bloom"
            style={{
              left: `${b.x}px`,
              top: `${b.y}px`,
              width: `${b.s}px`,
              height: `${b.s}px`,
              color: b.c,
              transform: `rotate(${b.r}deg)`,
            }}
          />
        );
      })}
    </span>
  );
}

export default FloralCluster;
