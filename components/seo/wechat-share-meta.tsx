interface WechatShareImageMetaProps {
  image: string;
  type: "image/jpeg" | "image/png";
  alt: string;
}

export function WechatShareImageMeta({
  image,
  type,
  alt,
}: WechatShareImageMetaProps) {
  return (
    <>
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="800" />
      <meta property="og:image:height" content="800" />
      <meta property="og:image:type" content={type} />
      <meta property="og:image:alt" content={alt} />
    </>
  );
}
