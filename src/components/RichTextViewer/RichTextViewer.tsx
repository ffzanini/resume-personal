import DOMPurify from 'isomorphic-dompurify'

type RichTextViewerProps = {
  content: string
  typeText?: string
}

export function RichTextViewer({
  content,
  typeText,
}: Readonly<RichTextViewerProps>) {
  const __html = DOMPurify.sanitize(content, {
    ALLOWED_TAGS: [
      'strong',
      'b',
      'u',
      'a',
      'p',
      'em',
      'img',
      'br',
      'target',
      'Link',
    ],
    ALLOWED_ATTR: ['href', 'target'],
    ADD_ATTR: ['target'],
    FORCE_BODY: true,
    USE_PROFILES: { html: true },
  })

  switch (typeText) {
    case 'h1':
      return <h1 dangerouslySetInnerHTML={{ __html }} />
    case 'h2':
      return <h2 dangerouslySetInnerHTML={{ __html }} />
    case 'h3':
      return <h3 dangerouslySetInnerHTML={{ __html }} />
    case 'h4':
      return <h4 dangerouslySetInnerHTML={{ __html }} />
    case 'span':
      return <span dangerouslySetInnerHTML={{ __html }} />
    default:
      return <p dangerouslySetInnerHTML={{ __html }} />
  }
}
