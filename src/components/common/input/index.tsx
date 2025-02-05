import { FC } from 'react'
import { InputStyled } from './styled-components'
import { TProps } from './types'

const InputComponent: FC<TProps> = (props) => {
  return <InputStyled {...props} />
}

export default InputComponent
