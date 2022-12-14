import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import App from './components/App'
import { store } from './state/store'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

/* eslint-disable @typescript-eslint/no-var-requires, @typescript-eslint/no-explicit-any */
declare let module: { hot: any }

if (module.hot) {
  module.hot.accept('./components/App', () => {
    const NewApp = require('./components/App').default

    ReactDOM.render(<NewApp />, document.getElementById('root'))
  })
}
