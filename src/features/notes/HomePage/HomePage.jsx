import React from 'react'
import { connect } from 'react-redux'
import { Switch, useRouteMatch } from 'react-router-dom'
import { getCurrentUser } from '../../../store/selectors'
import routes from './routes'
import PrivateRoute from '../../../components/PrivateRoute'

import MenuAppBar from '../MenuAppBar'

const HomePage = props => {
  const { currentUser } = props
  const { path } = useRouteMatch()

  return (
    <div>
      <MenuAppBar currentUser={currentUser} />
      <Switch>
        {routes(path).map(route => (
          <PrivateRoute
            key={route.path}
            path={route.path}
            exact={route.exact}
            component={route.component}
          />
        ))}
      </Switch>
    </div>
  )
}

function mapStateToProps(state) {
  const currentUser = getCurrentUser(state)
  return { currentUser }
}

export default connect(mapStateToProps)(HomePage)
