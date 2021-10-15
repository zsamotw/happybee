import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import routes from '../../../constant/routes'
import { selectCurrentUser } from '../../selector/appSelectors'

const PrivateRoute = ({ component: Component, currentUser, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      currentUser ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: routes.landingPage,
            state: { from: props.location }
          }}
        />
      )
    }
  />
)

function mapStateToProps(state) {
  const currentUser = selectCurrentUser(state)
  return { currentUser }
}

export default connect(mapStateToProps)(PrivateRoute)
