import user from './user/reducer'
import contract from './contract/reducer'
import campaign from './campaign/campaign'
import campaigns from './campaigns/reducer'
import qrs from './qrs/reducer'
import dispensers from './dispensers/reducer'
import collections from './collections/reducer'
import qrManager from './collections/qr-manager'

const reducers = {
  qrManagerReducer: qrManager,
  userReducer: user,
  contractReducer: contract,
  campaignReducer: campaign,
  campaignsReducer: campaigns,
  qrsReducer: qrs,
  dispensersReducer: dispensers,
  collectionsReducer: collections
}

export default reducers
