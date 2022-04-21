import user from './user/reducer'
import contract from './contract/reducer'
import campaign from './campaign/campaign'
import campaigns from './campaigns/reducer'

const reducers = {
  userReducer: user,
  contractReducer: contract,
  campaignReducer: campaign,
  campaignsReducer: campaigns
}

export default reducers
