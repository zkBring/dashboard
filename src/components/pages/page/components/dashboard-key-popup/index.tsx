import { FC } from 'react'
import { RootState, IAppDispatch } from 'data/store'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import * as asyncUserActions from 'data/store/reducers/user/async-actions'
import { UserActions } from 'data/store/reducers/user/types'
import {
  ButtonStyled,
  Buttons,
  PopupContent,
  PopupText,
  PopupTitle,
  PopupImage,
  PopupStyled
} from './styled-components'
import KeyImage from 'images/key-square.png'

const mapStateToProps = ({
  user: {
    authorizationStep,
    dashboardKeyPopup
  }
}: RootState) => ({
  authorizationStep,
  dashboardKeyPopup
})

const mapDispatcherToProps = (dispatch: IAppDispatch & Dispatch<UserActions>) => {
  return {
    signDashboardKey: (
      
    ) => dispatch(
      asyncUserActions.signDashboardKey()
    )
  }
}

// @ts-ignore
type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>

const DashboardKeyPopup: FC<ReduxType> = ({
  dashboardKeyPopup,
  signDashboardKey
}) => {
  if (!dashboardKeyPopup) {
    return null
  }
  return <PopupStyled
    onClose={() => {
      alert('close')
    }}
  >
    <PopupContent>
      <PopupImage src={KeyImage} />
      <PopupTitle>
        Sensitive data
      </PopupTitle>
      <PopupText>
        You will be asked to sign a message to retrieve a key to decrypt private data
      </PopupText>
      <Buttons>
        <ButtonStyled
          onClick={() => {
            alert('close')
          }}
        >
          Cancel
        </ButtonStyled>
        <ButtonStyled
          appearance='action'
          onClick={() => {
            signDashboardKey()
          }}
        >
          Sign
        </ButtonStyled>
      </Buttons>
    </PopupContent>
    
    
  </PopupStyled>
}

// @ts-ignore
export default connect(mapStateToProps, mapDispatcherToProps)(DashboardKeyPopup)