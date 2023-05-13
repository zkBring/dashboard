# Ledger Dashboard

## 2.1.11-rc.0
- Reload of campaigns after batch creation
- Wallets list config updated
- Report download for claimed links
- Additional properties for campaigns
- 'sponsored' property migration to campaign from batch
- Coinbase deeplink added
- Wallets array specification for address
- Fixed bug with QR-limits

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
