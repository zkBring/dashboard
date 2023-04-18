import { FC, useState, useEffect } from 'react'
import { TProps } from './types'
import {
  InputComponent,
  PopupForm,
  WidgetButton,
  PopupFormContent,
  Buttons,
  PopupStyled
} from './styled-components'
import { RootState } from 'data/store'
import { connect } from 'react-redux'
import { defineIfUserOwnsToken } from 'helpers'

const mapStateToProps = ({
  user: {
    address,
    signer
  },
  campaign: {
    tokenAddress,
    tokenStandard
  }
}: RootState) => ({
  tokenAddress,
  address,
  tokenStandard,
  signer
})

type ReduxType = ReturnType<typeof mapStateToProps> &
  TProps

const EditPopup: FC<ReduxType> = ({
  onClose,
  id,
  assets,
  tokenAddress,
  tokenStandard,
  signer,
  address,
  onUpdate
}) => {
  const currentAsset = assets.find(asset => asset.id === id)
  const [ linksAmount, setLinksAmount ] = useState(currentAsset && currentAsset.linksAmount || '1')
  const [ linksLimit, setLinksLimit ] = useState<string | null>(null)

  useEffect(() => {
    if (!currentAsset || !signer || !tokenStandard || !tokenAddress || !address) { return }
    const init = async () => {
      const ownership = await defineIfUserOwnsToken(
        address,
        tokenStandard,
        tokenAddress,
        signer,
        currentAsset?.tokenId as string
      )

      if (ownership.owns) {
        setLinksLimit(ownership.balance)
      }
    }
    init()
  }, [])

  const showError = linksLimit !== null && Number(linksAmount) > Number(linksLimit)

  return <PopupStyled
    title='Edit quantity of links'
    onClose={() => {
      onClose()
    }}
  >
    <PopupForm onSubmit={(evt) => {
      evt.preventDefault()
    }}>
      <PopupFormContent>
        <InputComponent
          title='Quantity'
          value={String(linksAmount)}
          onChange={value => {
            if (value === '') {
              setLinksAmount('0')
            } else if (/^[0-9]+$/.test(value) && value !== '0') {
              setLinksAmount(value)
            }
            return value
          }}
          error={linksLimit && showError ? `Value cannot be less than 1 and more than ${linksLimit}` : undefined}
          note={linksLimit && showError ? undefined : `Value cannot be less than 1 and more than ${linksLimit}`}
        />
      </PopupFormContent>
      <Buttons>
        <WidgetButton
          appearance='action'
          disabled={!linksAmount || showError}
          onClick={() => {
            onUpdate(id, linksAmount)
          }}
          title='Save'
        />
      </Buttons>
    </PopupForm>
  </PopupStyled>
}

export default connect(mapStateToProps)(EditPopup)
