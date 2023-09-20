import React from 'react'
import { Provider } from 'react-redux'
import RouterProvider from './router-provider'
import store from 'data/store'
import { ethereumClient, wagmiConfig } from './connectors'
import { WagmiConfig } from "wagmi"
import { Web3Modal } from "@web3modal/react"
import moment from 'moment'
import formatDate, { months } from 'helpers/format-date'
const { REACT_APP_WC_PROJECT_ID } = process.env

moment.updateLocale('en', {
  months
})

class Application extends React.Component {
  render () {
    return <>
      <WagmiConfig config={wagmiConfig}>
        <Provider store={store}>
          <RouterProvider />
        </Provider>
      </WagmiConfig>
      <Web3Modal
        projectId={REACT_APP_WC_PROJECT_ID as string}
        ethereumClient={ethereumClient}
      />
    </>
  }
}
export default Application
