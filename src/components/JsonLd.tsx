type JsonLdProps = {
  data: string
}

/** Renders a JSON-LD script tag from a pre-serialized Power SEO string. */
export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: data }}
    />
  )
}
