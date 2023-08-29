export type TProps = {
  onClose: () => void
  onSubmit: (links_amount: string) => void
  initialValue: string
  limit?: string
}