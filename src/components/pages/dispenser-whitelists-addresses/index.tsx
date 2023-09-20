import { FC, useState, useEffect } from 'react'
import {
  Buttons,
  Container,
  WidgetStyled,
  ButtonStyled,
  WidgetSubtitleStyled,
  TextAreaStyled
} from './styled-components'
import { parseWhitelistAddresses } from 'helpers'
import { TProps } from './types'
import { TDispenser } from 'types'
import { connect } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { RootState, IAppDispatch } from 'data/store'
import * as asyncDispensersActions from 'data/store/reducers/dispensers/async-actions'

const mapStateToProps = ({
  dispensers: {
    loading,
    dispensers
  }
}: RootState) => ({
  loading,
  dispensers
})

const mapDispatcherToProps = (dispatch: IAppDispatch) => {
  return {
    createAddressWhitelist: (
      dispenserId: string,
      addresses: string[],
      successCallback: () => void,
      errorCallback: () => void
    ) => dispatch(asyncDispensersActions.createAddressWhitelist({
      dispenser_id: dispenserId,
      addresses,
      successCallback,
      errorCallback
    })),
    getDispenserWhitelist: (
      dispenser_id: string,
      callback?: () => void
    ) => dispatch(asyncDispensersActions.getDispenserWhitelist({
      dispenser_id,
      callback
    })),
  }
}

// @ts-ignore
type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps> & TProps


const DispenserWhitelistsAddresses: FC<ReduxType> = ({
  createAddressWhitelist,
  loading,
  dispensers,
  getDispenserWhitelist
}) => {
  const {
    dispenserId
  } = useParams<{
    dispenserId: string
  }>()
  const history = useHistory()
  const dispenser: TDispenser | undefined = dispensers.find(dispenser => String(dispenser.dispenser_id) === dispenserId)
  const [ value, setValue ] = useState<string>('')

  useEffect(() => {
    const value = dispenser && dispenser.whitelist ? dispenser.whitelist.map(whitelistItem => {
      if (whitelistItem.type === 'address') return whitelistItem.address
    }).join('\n'): ``
    setValue(value)
  }, [dispenser?.whitelist])

  useEffect(() => {
    getDispenserWhitelist(
      dispenserId,
      () => {}
    )
  }, [])

  return <Container>
    <WidgetStyled title='Whitelist addresses'>
      <WidgetSubtitleStyled>Only addresses entered below will be able to claim</WidgetSubtitleStyled>
      <TextAreaStyled
        onChange={(value) => {
          setValue(value)
          return value
        }}
        disabled={loading}
        value={value}
        title='Recepient’s address'
        placeholder={`Be careful and paste addresses here, i.e.:

0xdfs7d8f7s8df98df09s8df98s0df9s80df90sdf
0xdfs7d8f7s8df98df09s8df98s0df9s80df90sdf
0xdfs7d8f7s8df98df09s8df98s0df9s80df90sdf and so on
        `}
      />
      <Buttons>
        <ButtonStyled
          to={`/dispensers/${dispenserId}/whitelists`}
        >
          Back
        </ButtonStyled>
        <ButtonStyled
          disabled={!value}
          loading={loading}
          appearance='action'
          onClick={() => {
            const addresses = parseWhitelistAddresses(value)
            if (!addresses) {
              return alert('Check format')
            }
            createAddressWhitelist(
              dispenserId,
              addresses,
              () => {
                history.push(`/dispensers/${dispenserId}`)
              },
              () => {}
            )
          }}
        >
          Apply
        </ButtonStyled>
      </Buttons>
    </WidgetStyled>
  </Container>
}

export default connect(mapStateToProps, mapDispatcherToProps)(DispenserWhitelistsAddresses)