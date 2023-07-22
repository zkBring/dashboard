# Ledger Dashboard

## 2.1.22-rc.0
- added dispenser redirect
- added dispenser report download

## 2.1.22
- allow pause and unpause dispenser
- added check for UNKNOWN token type from Alchemy API

## 2.1.21
- allow adding links to the dispenser until it's finished
- updateLinks method call if status of dispenser is ACTIVE

## 2.1.20
- added expiration_time edit
- updates for secure page
- new version of linkdrop-ui

## 2.1.19
- added 'available_wallets' option support
- added csv file download with png qr-codes
- manual token address for ERC721/ERC1155 enter check updated

## 2.1.18
- Bug fix for QR links mapping (csv file download enable)
- Dispenser can be stopped

## 2.1.17
- Fix for token amount
- Fix for getGasPrice method

## 2.1.16
- Dispensers public release

## 2.1.15
- update request data for dispenser links mapping

## 2.1.14
- update for drafts (links array is defined dynamically)
- redirect to qr page after success POST request

## 2.1.13
- only_preferred_wallet option support
- added dispenser edit page
- updates for /dispensers endpoints
- new events for Plausible
- auth process split for error handling
- drafts for campaigns in localstorage
- updated logo

## 2.1.12
- Added Dispensers page for whitelisted users (Multi QR)
- Updated version of Linkdrop-UI package

## 2.1.11
- Reload of campaigns after batch creation
- Wallets list config updated
- Report download for claimed links
- Additional properties for campaigns
- 'sponsored' property migration to campaign from batch
- Coinbase deeplink added
- Wallets array specification for address
- Fixed bug with QR-limits
- Update linkdrop-sdk version to 2.0.4

## 2.1.10
- "Refund" transaction fix

## 2.1.9
- Integration of external UI-kit library
- Added custom qr-code options for whitelisted accounts 

## 2.1.8
- Support for Coinbase browser extension
- Support for Zerion browser extension
- Support for ERC20 standard campaigns
- Minor interface fixes
- Fix for token amount conversion

## 2.1.7
- Update for favicons

## 2.1.6
- Bug fix for data fetch order
- Mint pattern is available for whitelisted account

## 2.1.5
- Added support for new SDK
- Fixed bug with date and time of batch creation
- Sponsorship price count is moved to approve screen
- Added additional field for tokens to be distributed (for sdk campaigns)
- Approve all tokens for ERC20 if campaign is created for sdk usage
- Added support for short codes
- Added info screen if dashboard is opened in mobile browser
- Added info screen if Metamask is not installed
- Added info screen if network is not supported
- Added Alchemy API to upload NFT tokens list
- Added select component to choose available token ids for ERC721/ERC1155 campaign
- Dynamic definition of user comission with contract instance
- Added limits for PRO and Starter plans
- Added Intercom plugin
- Additional analytics events collected
- Updated logic of sign-in

## 2.1.4
- Restrict networks with env variable 
- Updated README.md file
- Added Mumbai support

## 2.1.3
- Header is no longer fixed, it can be scrolled with content of page

## 2.1.2
- Fixed bug for collapsing aside menu when changing network using switcher on the website
- Link shortening

## 2.1.1
- Options for campaign to pause, unpause and withdrawal. Also copy of campaign details to clipboard ability added
- Added pending status to campaign while waiting for transaction complete
- JSON Rpc urls moved to env variables
- Added loader indicator while pause/unpause is pending
- Added loader indicator while checking if campaign was approved before
- Added withdraw ability check 

## 2.1.0
