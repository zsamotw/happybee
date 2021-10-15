import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@material-ui/core/styles'
import { I18nextProvider } from 'react-i18next'
import i18next from 'i18next'
import App from './App'
import * as serviceWorker from './serviceWorker'
import store from './store/store'
import { theme } from './constant/theme'
import commonPl from './translation/pl/common.json'

i18next.init({
  interpolation: { escapeValue: false },
  lng: 'pl',
  resources: {
    pl: {
      common: commonPl
    }
  }
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store.store}>
      <ThemeProvider theme={theme}>
        <I18nextProvider i18n={i18next}>
          <App />
        </I18nextProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
