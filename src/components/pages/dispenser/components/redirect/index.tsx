import { FC, useEffect, useState } from 'react'
import { WidgetStyled, Header, ToggleStyled, WidgetTitleStyled, InputStyled } from './styled-components'
import { TProps, TEditInputProps, TCopyContainerProps } from './types'
import { WidgetSubtitle } from 'components/pages/common'
import ConfirmPopup from '../confirm-popup'
import {
  CopyContainerStyled,
  Buttons,
  WidgetButton
} from '../../styled-components'

const EditInput: FC<TEditInputProps> = ({
  redirectUrl,
  onSubmit,
  onCancel,
  claimUrl,
  loading
}) => {
  const [
    currentRedirectUrl, setCurrentRedirectUrl
  ] = useState<string>(redirectUrl || '')
  const [
    showPopup, setShowPopup
  ] = useState<boolean>(false)

  useEffect(() => {
    if (!redirectUrl || redirectUrl === currentRedirectUrl) {
      return 
    } else {
      setCurrentRedirectUrl(redirectUrl)
    }
  }, [ redirectUrl ])

  return <>
    {showPopup && <ConfirmPopup
      onSubmit={() => {
        return onSubmit(currentRedirectUrl)
      }}
      claimUrl={claimUrl}
      newRedirectURL={currentRedirectUrl}
      loading={Boolean(loading)}
      onClose={() => {
        setCurrentRedirectUrl(redirectUrl || '')
        setShowPopup(false)
      }}
    />}
    <InputStyled
      value={currentRedirectUrl}
      placeholder='https://'
      onChange={value => {
        setCurrentRedirectUrl(value)
        return value
      }}
    />
    <Buttons>
      <WidgetButton onClick={() => onCancel()}>
        Cancel
      </WidgetButton>
      <WidgetButton onClick={() => setShowPopup(true)} appearance='action'>
        Apply
      </WidgetButton>
    </Buttons>
  </>
}

const CopyContainer: FC<TCopyContainerProps> = ({ redirectUrl, onClick }) => {
  return <>
    <CopyContainerStyled
      text={redirectUrl || ''}
    />
    <Buttons>
      <WidgetButton onClick={onClick} appearance='action'>
        Update URL
      </WidgetButton>
    </Buttons>
  </>
}

const Redirect: FC<TProps> = ({
  hasRedirect,
  redirectUrl,
  updateNewRedirectUrl,
  toggleRedirectOn,
  claimUrl
}) => {
  const [
    enabled, setEnabled
  ] = useState<boolean>(Boolean(hasRedirect))

  const [
    editable, setEditable
  ] = useState<boolean>(false)

  const [
    loading, setLoading
  ] = useState<boolean>(false)


  return <WidgetStyled>
    
    <Header>
      <WidgetTitleStyled>
        Redirect to another URL
      </WidgetTitleStyled>
      <ToggleStyled
        value={enabled}
        onChange={(value => {
          toggleRedirectOn(
            value,
            () => {
              setLoading(false)
              setEnabled(value)
            },
            () => {
              setLoading(false)
            }
          )
        })}
      />
    </Header>
    <WidgetSubtitle>
      Your campaign is finished, but existing link could redirect to the new dispenser link or any website
    </WidgetSubtitle>
    {enabled && <>
      {(editable || !redirectUrl) ? <EditInput
        claimUrl={claimUrl}
        loading={loading}
        redirectUrl={redirectUrl}
        onCancel={() => setEditable(false)}
        onSubmit={(value) => {
          setLoading(true)
          updateNewRedirectUrl(
            value,
            () => {
              setLoading(false)
              setEditable(false)
            },
            () => {
              setLoading(false)
            }
          )
          }}
      /> : <CopyContainer
        redirectUrl={redirectUrl}
        onClick={() => {
          setEditable(true)
        }}
      />}
    </>}

  </WidgetStyled>
}

export default Redirect