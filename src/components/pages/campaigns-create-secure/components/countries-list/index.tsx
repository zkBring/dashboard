import { FC } from 'react'
import {
  LinkContentsItem,
  LinkContentsData,
  LinkContentsControls,
  LinksContentDataItem,
  LinksContentDataValue,
  CheckIndicator,
  ButtonStyled
} from './styled-components'
import { TOnRemove, TProps } from './types'
import { TCountry } from 'types'
import Icons from 'icons'

const CountryContent: FC<TCountry & { onRemove: TOnRemove, disabled: boolean }> = ({
  id,
  name,
  onRemove,
  disabled
}) => {
  return <LinkContentsItem>
    <LinkContentsData>
      <CheckIndicator>
        <Icons.CheckboxIcon />
      </CheckIndicator>
      <LinksContentDataItem>
        <LinksContentDataValue>
          {name}
        </LinksContentDataValue>
      </LinksContentDataItem>
    </LinkContentsData>

    <LinkContentsControls>
    <ButtonStyled
        size='extra-small'
        appearance='additional'
        disabled={disabled}
        onClick={() => {
          if (id === undefined) { return }
          onRemove(id)
        }}
      >
        Remove
      </ButtonStyled>
    </LinkContentsControls>
  </LinkContentsItem>
} 

const CountriesList: FC<TProps> = ({
  data,
  onRemove,
  disabled
}) => {
  return <>
    {data.map(item => {
      return <CountryContent {...item} onRemove={onRemove} disabled={disabled}/>
    })}
  </>
}

export default CountriesList