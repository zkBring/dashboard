export type TProps = {
  title: string
  text: string
  className?: string
  actions?: {
    title: string,
    onClick: () => void
  }[]
}