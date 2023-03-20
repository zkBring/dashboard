type TContentItem = {
  title: string
  link?: {
    title: string
    href: string
  }
}

export type TProps = {
  title: string
  id: string
  appendToLocalStorage?: boolean
  className?: string
  contents: TContentItem[]
}