import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import Snackbar from '@material-ui/core/Snackbar'
import PrivateRoute from '../../../components/PrivateRoute'
import PublicRoute from '../../../components/PublicRoute'
import Alert from '../../../components/Alert'
import withAuthentication from '../../account/Session'
import { getAppMessage } from '../../../store/selectors'
import { SET_APP_MESSAGE } from '../../../store/actions/sync-actions'
import routes from './routes'

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
    <div>
      <Router>
        <Switch>
          {routes.map(route =>
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
    </div>
  )
}

const mapStateToProps = state => {
  const appMessage = getAppMessage(state)
  return { appMessage }
}

const mapDispatchToState = dispatch => {
  return {
    setAppMessage: message => dispatch(SET_APP_MESSAGE(message))
  }
}

export default withAuthentication(
  connect(mapStateToProps, mapDispatchToState)(RootComponent)
)
