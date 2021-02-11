import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import * as ROUTES from '../../constants/routes'
import { getCurrentUser } from '../../store/selectors'

const PrivateRoute = ({ component: Component, currentUser, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      currentUser ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: ROUTES.LANDING_PAGE,
            state: { from: props.location }
          }}
        />
      )
    }
  />
)

function mapStateToProps(state) {
  const currentUser = getCurrentUser(state)
  return { currentUser }
}

export default connect(mapStateToProps)(PrivateRoute)
