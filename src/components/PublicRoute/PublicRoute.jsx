import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import * as ROUTES from '../../constants/routes'
import { getCurrentUser } from '../../store/selectors'

const PublicRoute = ({ component: Component, currentUser, ...rest }) => {
  const getRedirectPath = location => {
    const { from } = (location && location.state) || { from: ROUTES.HOME }
    return from
  }

  return (
    <Route
      {...rest}
      render={props =>
        !currentUser ? (
          <Component {...props} />
        ) : (
          <Redirect to={getRedirectPath(props.location)} />
        )
      }
    />
  )
}

function mapStateToProps(state) {
  const currentUser = getCurrentUser(state)
  return { currentUser }
}

export default connect(mapStateToProps)(PublicRoute)
