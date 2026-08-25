import type { SVGProps } from "react";

type IconName = "spark" | "check" | "pencil" | "case" | "star" | "flame" | "trophy" | "book" | "arrow" | "rotate";

export function Icon({ name, ...props }: SVGProps<SVGSVGElement> & { name: IconName }) {
  const paths: Record<IconName, React.ReactNode> = {
    spark: <path d="m12 3-1.3 4.2a5 5 0 0 1-3.4 3.4L3 12l4.3 1.4a5 5 0 0 1 3.4 3.4L12 21l1.3-4.2a5 5 0 0 1 3.4-3.4L21 12l-4.3-1.4a5 5 0 0 1-3.4-3.4L12 3Z" />,
    check: <path d="m5 12 4 4L19 6" />,
    pencil: <><path d="m4 20 4.2-1 9.9-9.9a2.1 2.1 0 0 0-3-3L5.2 16 4 20Z" /><path d="m13.7 7.5 2.8 2.8" /></>,
    case: <><path d="M5 19 9.5 5h5L19 19" /><path d="M7 14h10" /><path d="M16.5 5v14" /></>,
    star: <path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z" />,
    flame: <path d="M13.5 3.5c.7 3.5-2 4.3-1.2 7 .9-1 1.4-2.1 1.5-3.2 2.2 1.7 3.7 4.1 3.7 6.8A5.6 5.6 0 0 1 12 20a5.6 5.6 0 0 1-5.5-5.9c0-2.4 1.3-4.5 3.4-6.5 0 2 .6 3.1 1.4 3.8-.4-3.3.7-5.9 2.2-7.9Z" />,
    trophy: <><path d="M8 4h8v4a4 4 0 0 1-8 0V4Z" /><path d="M8 6H4v1a4 4 0 0 0 4 4M16 6h4v1a4 4 0 0 1-4 4M12 12v5M8 20h8M9 17h6" /></>,
    book: <><path d="M4 5.5A3.5 3.5 0 0 1 7.5 2H11v17H7.5A3.5 3.5 0 0 0 4 22V5.5Z" /><path d="M20 5.5A3.5 3.5 0 0 0 16.5 2H13v17h3.5A3.5 3.5 0 0 1 20 22V5.5Z" /></>,
    arrow: <><path d="M5 12h14" /><path d="m14 7 5 5-5 5" /></>,
    rotate: <><path d="M20 7v5h-5" /><path d="M19 12a7 7 0 1 1-2-5" /></>,
  };

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      {paths[name]}
    </svg>
  );
}
