import {
  FC,
  useState
} from 'react'

import {
  AsideWrapper,
  WidgetTitle,
  TextStyled,
  EditButton,
  ShowMore
} from './styled-components'
import {
  TProps
} from './types'
import Icons from 'icons'

const VALUE_LENGTH = 240

const defineValue = (
  value: string,
  shortened: boolean
) => {
  if (value.length <= VALUE_LENGTH) {
    return value
  }
  const valueFormatted = shortened ? `${value.slice(0, VALUE_LENGTH)}...` : value
  return valueFormatted
}

const EditableWidget: FC<TProps> = ({
  action,
  title,
  value
}) => {

  const [
    shortened,
    setShortened
  ] = useState<boolean>(true)

  const valueFormatted = defineValue(
    value,
    shortened
  )

  return <AsideWrapper>
    <WidgetTitle>
      {title}
      <EditButton onClick={action}>
        <Icons.InputPenIcon />
      </EditButton>
    </WidgetTitle>
    <TextStyled>
      {valueFormatted}
      {
        shortened &&
        value.length > VALUE_LENGTH && 
        <ShowMore
          onClick={() => setShortened(false)}
        >show more</ShowMore>
      }
    </TextStyled>
  </AsideWrapper>
}

export default EditableWidget 