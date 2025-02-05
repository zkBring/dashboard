import user from './user/reducer'
import campaign from './campaign/campaign'
import campaigns from './campaigns/reducer'
import dispensers from './dispensers/reducer'

const reducers = {
  userReducer: user,
  campaignReducer: campaign,
  campaignsReducer: campaigns,
  dispensersReducer: dispensers
}

export default reducers
