export type TProps = {
  title: string
  text: string
  actions: {
    title: string,
    onClick: () => void
  }[]
}