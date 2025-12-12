import { useEffect } from "react";

export default function SEO({ baseUrl, locales }) {
  useEffect(() => {
    // Remove old hreflang tags
    document
      .querySelectorAll("link[rel='alternate']")
      .forEach((el) => el.remove());

    const currentPath = window.location.pathname;

    locales.forEach((lng) => {
      const link = document.createElement("link");
      link.rel = "alternate";
      link.hreflang = lng;
      link.href = `${baseUrl}/${lng}${currentPath}`;
      document.head.appendChild(link);
    });

    // x-default
    const defaultLink = document.createElement("link");
    defaultLink.rel = "alternate";
    defaultLink.hreflang = "x-default";
    defaultLink.href = `${baseUrl}${currentPath}`;
    document.head.appendChild(defaultLink);
  }, [baseUrl, locales]);

  return null;
}
