import approveERC20 from "./approve-erc20"
import approveAllERC20 from './approve-all-erc20'
import approveERC721 from "./approve-erc721"
import approveERC1155 from "./approve-erc1155"
import initialization from "./initialization"
import getNativeTokenAmount from "./get-native-token-amount"
import getTokenAmount from "./get-token-amount"
import secure from "./secure"
import switchNetwork from "./switch-network"
import connectWallet from "./connect-wallet"
import authorize from "./authorize"
import logout from "./logout"
import checkIfApproved from "./check-if-approved"
import checkIfGranted from "./check-if-granted"
import grantRole from "./grant-role"
import checkIfConnected from "./check-if-connected"
import getContracts from './get-contracts'

export {
  approveERC20,
  approveAllERC20,
  getNativeTokenAmount,
  initialization,
  getTokenAmount,
  secure,
  checkIfConnected,
  switchNetwork,
  connectWallet,
  approveERC721,
  approveERC1155,
  authorize,
  logout,
  checkIfApproved,
  checkIfGranted,
  grantRole,
  getContracts
}