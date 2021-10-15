import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import Snackbar from '@material-ui/core/Snackbar'
import PrivateRoute from '../../shared/component/PrivateRoute'
import PublicRoute from '../../shared/component/PublicRoute'
import Alert from '../../shared/component/Alert'
import withAuthentication from '../AccountProfile/component/Session'
import appStore from '../../shared/reducer/appReducer'
import rootRoutes from './routes'
import { selectAppMessage } from '../../shared/selector/appSelectors'

function RootComponent(props) {
  const [openSnackBar, setOpenSnackBar] = useState(false)

  const { appMessage } = props
  const { content: appMessageContent } = appMessage

  useEffect(() => {
    if (appMessageContent) {
      setOpenSnackBar(true)
    }
  }, [appMessageContent])

  const handleCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenSnackBar(false)
    props.setAppMessage({ content: '', type: null })
  }

  return (
    <main>
      <Router>
        <Switch>
          {rootRoutes.map(route =>
            route.isPrivate ? (
              <PrivateRoute
                key={route.path}
                exact={route.exact}
                path={route.path}
                component={route.component}
              />
            ) : (
              <PublicRoute
                key={route.path}
                exact={route.exact}
                path={route.path}
                component={route.component}
              />
            )
          )}
        </Switch>
      </Router>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        open={openSnackBar}
        autoHideDuration={3000}
        onClose={handleCloseSnackBar}
      >
        <Alert onClose={handleCloseSnackBar} severity={appMessage.status}>
          {appMessage.content}
        </Alert>
      </Snackbar>
    </main>
  )
}

const mapStateToProps = state => {
  const appMessage = selectAppMessage(state)
  return { appMessage }
}

const mapDispatchToState = dispatch => {
  return {
    setAppMessage: message =>
      dispatch(appStore.actions.appMessageChange(message))
  }
}

export default withAuthentication(
  connect(mapStateToProps, mapDispatchToState)(RootComponent)
)
