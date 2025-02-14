import { FC } from "react"
import {
  SelectStyled,
  SelectWrapper
} from "./styled-components"
import TProps from './types'

const Select: FC<TProps> = (props) => {
  return <SelectWrapper>
    <SelectStyled
      {...props}
    />
  </SelectWrapper>
}

export default Select