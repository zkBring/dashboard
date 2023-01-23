
# Getting Started With Dashboard application

## Add .env file to root level of project

In the project you should create `.env` file with contents:

    REACT_APP_INFURA_ID=<Your infura public key id>
    REACT_APP_CLAIM_APP=<URL of claim application, for instance https://dev.ledger.linkdrop.io>
    REACT_APP_JSON_RPC_POLYGON=<JSON Rpc URL for Polygon>
    REACT_APP_JSON_RPC_MAINNET=<JSON Rpc URL for Mainnet>
    REACT_APP_JSON_RPC_GOERLI=<JSON Rpc URL for Goerli>
    REACT_APP_JSON_RPC_MUMBAI=<JSON Rpc URL for Mumbai>
    REACT_APP_LINKS_LIMIT=<Number of links allowed to be generated with dashboard, for instance 20000>
    REACT_APP_SERVER_URL=<URL of claim application, for instance https://dev.dashboard-api.linkdrop.io/api/v1/dashboard>
    REACT_APP_QR_OPTIONS=linkdrop
    REACT_APP_CHAINS=<Array of chains supported, for instance [5,80001] if you want to support Goerli and Mumbai>


## Requirements

 - Node.js version 14 or higher
 - Yarn version 1.22 or higher / NPM version 8 or higher

## Available Scripts

In the project directory, you can run:

### `yarn` 

Installs all needed dependencies from package.json file

### `yarn start`

Runs the app in the development mode.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn build`

Builds the app for production to the `build` folder.