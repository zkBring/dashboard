import { useState, FC, useEffect } from 'react'
import {
  Breadcrumbs,
  TextLink
} from 'components/common'

// import { TRetroDropStep, TRecipientsData } from 'types'
import { RootState } from 'data/store';
import * as campaignActions from 'data/store/reducers/campaign/actions'

// import { NewRetroDropActions } from 'data/store/reducers/campaign/types'
import { connect } from 'react-redux';

import { useHistory, useLocation } from 'react-router-dom'



const mapStateToProps = ({
  campaign: { type },
  user: { chainId }
}: RootState) => ({
  type,
  chainId
})


type ReduxType = ReturnType<typeof mapStateToProps>





const CampaignsCreate: FC<ReduxType> = ({
  chainId
}) => {  
  const [ recipients, setRecipients ] = useState({})

  const history = useHistory()
  let { search } = useLocation();
  const query = new URLSearchParams(search)

  

  return <div>
  </div>
}

export default connect(mapStateToProps)(CampaignsCreate)
