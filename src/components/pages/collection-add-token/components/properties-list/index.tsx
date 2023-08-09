import { FC } from 'react'
import {
  PropertyItem,
  PropertyData,
  PropertyControls,
  PropertyDataItem,
  PropertyDataLabel,
  PropertyDataValue,
  CheckIndicator,
  ButtonStyled
} from './styled-components'
import { TProps } from './types'
import Icons from 'icons'

const PropertiesList: FC<TProps>= ({
  properties,
  onRemove
}) => {
  return <>
    {Object.entries(properties).map(property => {
      return <PropertyItem>
        <PropertyData>
          <CheckIndicator>
            <Icons.CheckboxIcon />
          </CheckIndicator>
          <PropertyDataItem>
            <PropertyDataLabel>
              Property
            </PropertyDataLabel>
            <PropertyDataValue>
              {property[0]}
            </PropertyDataValue>
          </PropertyDataItem>
          <PropertyDataItem>
            <PropertyDataLabel>
              Value
            </PropertyDataLabel>
            <PropertyDataValue>
              {property[1]}
            </PropertyDataValue>
          </PropertyDataItem>
        </PropertyData>
    
        <PropertyControls>
        <ButtonStyled
            size='extra-small'
            appearance='additional'
            onClick={() => {
              onRemove(property[0])
            }}
          >
            Remove
          </ButtonStyled>
        </PropertyControls>
      </PropertyItem>
    })}
  </>
  
} 

export default PropertiesList