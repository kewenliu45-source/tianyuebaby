import { PortableText, type PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import { articleImageUrl } from "@/sanity/lib/image";
import type { RichTextBlock } from "@/types/sanity";

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary pl-4 py-2 my-4 text-muted-foreground italic">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => (
      <p className="text-foreground leading-relaxed mb-4">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 mb-4 space-y-2 text-foreground">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 mb-4 space-y-2 text-foreground">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="leading-relaxed">{children}</li>
    ),
    number: ({ children }) => (
      <li className="leading-relaxed">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold">{children}</strong>
    ),
    em: ({ children }) => <em>{children}</em>,
    underline: ({ children }) => <u>{children}</u>,
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target={value?.blank ? "_blank" : undefined}
        rel={value?.blank ? "noopener noreferrer" : undefined}
        className="text-primary underline underline-offset-2 hover:text-primary-hover"
      >
        {children}
      </a>
    ),
  },
  types: {
    imageWithAlt: ({ value }) => {
      if (!value?.image) return null;
      return (
        <figure className="my-6">
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <Image
              src={articleImageUrl(value.image as unknown as Parameters<typeof articleImageUrl>[0])}
              alt={value.alt || ""}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
          {value.caption && (
            <figcaption className="text-sm text-muted-foreground text-center mt-2">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    image: ({ value }) => {
      if (!value?.asset) return null;
      return (
        <figure className="my-6">
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <Image
              src={articleImageUrl(value as unknown as Parameters<typeof articleImageUrl>[0])}
              alt={value.alt || ""}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
        </figure>
      );
    },
    portableImage: ({ value }) => {
      const image = value?.image || value;
      if (!image?.asset) return null;
      return (
        <figure className="my-6">
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <Image
              src={articleImageUrl(image as unknown as Parameters<typeof articleImageUrl>[0])}
              alt={value.alt || ""}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
        </figure>
      );
    },
  },
};

interface PortableTextRendererProps {
  content: RichTextBlock[];
}

export function PortableTextRenderer({ content }: PortableTextRendererProps) {
  if (!content || content.length === 0) return null;
  return <PortableText value={content} components={components} />;
}
