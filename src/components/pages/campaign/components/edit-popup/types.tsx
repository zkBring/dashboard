type TProps = {
  initialValue: string
  onClose: () => void
  onUpdate: (
    description: string
  ) => void
  loading: boolean
}

export default TProps