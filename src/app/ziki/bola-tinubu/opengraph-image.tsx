import ZikiImage from "../[slug]/opengraph-image";

export { alt, size, contentType } from "../[slug]/opengraph-image";

export default function Image() {
  return ZikiImage({ params: Promise.resolve({ slug: "bola-tinubu" }) });
}
