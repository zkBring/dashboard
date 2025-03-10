type TAudienceOption = {
  title: string
  image: React.ReactNode
  value: any
  disabled?: boolean 
}

type TProps = {
  options: TAudienceOption[]
  className?: string
  value: any
  onChange: (value: any) => void
}

export default TProps
