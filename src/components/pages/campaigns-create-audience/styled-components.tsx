import styled from 'styled-components'
import {
  Select
} from 'linkdrop-ui'
import {
  Button,
  Input
} from 'components/common'

import {
  Audience
} from 'components/pages/common'


export const InputStyled = styled(Input)`
  
`

export const ButtonStyled = styled(Button)``


export const Subtitle = styled.h4`
  font-weight: 400;
  margin: 0 0 10px;
`

export const Text = styled.p`
  font-size: 13px;
  line-height: 22px;
  margin: 0 0 20px;
  color: ${props => props.theme.secondaryTextColor};
`

export const AudienceStyled = styled(Audience)`
  margin-bottom: 40px;
`

export const SelectStyled = styled(Select)`
  margin-bottom: 30px;
`