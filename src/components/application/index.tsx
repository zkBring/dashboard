import { Provider } from 'react-redux'
import RouterProvider from './router-provider'
import store from 'data/store'
import moment from 'moment'
import formatDate, { months } from 'helpers/format-date'
import { queryClient, config } from './connectors'
import { QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { Container } from './styled-components'

moment.updateLocale('en', {
  months
})

function Application () {
  return <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      <Container>
        <Provider store={store}>
          <RouterProvider />
        </Provider>
      </Container>
    </QueryClientProvider>
  </WagmiProvider>
}
export default Application
