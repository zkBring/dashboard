import user from './user/reducer'
import contract from './contract/reducer'
import campaign from './campaign/campaign'
import campaigns from './campaigns/reducer'
import qrs from './qrs/reducer'
import dispensers from './dispensers/reducer'
import collections from './collections/reducer'

const reducers = {
  userReducer: user,
  contractReducer: contract,
  campaignReducer: campaign,
  campaignsReducer: campaigns,
  qrsReducer: qrs,
  dispensersReducer: dispensers,
  collectionsReducer: collections
}

export default reducers
