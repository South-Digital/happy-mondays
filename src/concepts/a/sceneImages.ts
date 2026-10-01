/** Share the browser's responsive choice between decoding and rendered images.
 * Preloading the original here would defeat srcset on phones. */
export function sceneImage(base: string, name: string) {
  const product = name.startsWith("product-");
  const foreground = name === "grip-sock" || name === "collection";
  const width = product ? (base.includes("serein") ? 660 : 675) : name === "courtyard" ? 1920 : 1254;
  const height = product && !base.includes("serein") ? 900 : width;
  const variants = product ? [240, 480] : foreground ? [600, 1000] : name === "courtyard" ? [800, 1280] : [800];
  const sizes = product
    ? "(max-width: 620px) 22vw, (max-width: 980px) 128px, 170px"
    : foreground
      ? "(max-width: 620px) 84vw, (max-width: 980px) 500px, 600px"
      : "(max-width: 620px) calc(100vw - 40px), (max-width: 980px) 580px, (max-width: 1599px) 660px, 716px";
  return {
    src: `${base}${name}.webp`,
    srcSet: [...variants.map(size => `${base}${name}-${size}.webp ${size}w`), `${base}${name}.webp ${width}w`].join(", "),
    sizes, width, height,
  };
}
