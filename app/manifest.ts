import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "KRAFDEV - Digital Technology Studio",
    short_name: "KRAFDEV",
    description:
      "Crafting Digital Technology. Modern websites, software, and digital solutions.",
    start_url: "/",
    display: "standalone",
    background_color: "#eff1ed",
    theme_color: "#b8763e",
    icons: [
      {
        src: "/krafdev.png",
        sizes: "1024x1024",
        type: "image/png",
      },
    ],
  };
}
