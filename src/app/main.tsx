import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import { Provider } from 'react-redux'
import store from '../processes/redux/store.js'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

export const queryClient = new QueryClient()
ReactDOM.render(
  <Router>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <div>
          <App />
        </div>
      </Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </Router>,
  document.getElementById('root'),
)
