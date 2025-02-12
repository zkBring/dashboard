type TAudienceOption = {
  title: string
  image: string
  disabled?: boolean 
}

type TProps = {
  options: TAudienceOption[]
  className?: string
}

export default TProps
