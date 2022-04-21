import React, { FC } from 'react'
// import { connect, ConnectedProps } from 'react-redux'
import { RootState } from 'data/store';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { Dispatch } from 'redux';
type TProps = {
  connectWallet: () => void
}

interface INameToValueMap {
  [key: string]: any;
}

const mapStateToProps = ({
  campaigns: { campaigns },
  user: { address, chainId },
}: RootState) => ({
  campaigns,
  address,
  chainId
})

// const getOwnersData

const mapDispatcherToProps = (dispatch: Dispatch) => {
  return {
  }
}

type ReduxType = ReturnType<typeof mapStateToProps>  & ReturnType<typeof mapDispatcherToProps>

const CampaignsPage: FC<ReduxType & TProps> = ({ campaigns, address, connectWallet, chainId }) => {
  

  return <div>
    lol
  </div>
}

export default connect(mapStateToProps, mapDispatcherToProps)(CampaignsPage)

