import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Majuscape Capitalization Games",
    short_name: "Majuscape",
    description: "Free interactive capitalization games for elementary students.",
    start_url: "/",
    display: "standalone",
    background_color: "#f4f7ed",
    theme_color: "#173f48",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
