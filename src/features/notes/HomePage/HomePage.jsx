import React from 'react'
import { connect } from 'react-redux'
import { Switch, useRouteMatch } from 'react-router-dom'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { getCurrentUser } from '../../../store/selectors'
import routes from './routes'
import PrivateRoute from '../../../components/PrivateRoute'
import MenuAppBar from '../MenuAppBar'

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: '2rem',
    padding: '2rem 15rem',
    [theme.breakpoints.down('lg')]: {
      padding: '2rem 10rem'
    },
    [theme.breakpoints.down('sm')]: {
      padding: '2rem 3rem'
    },
    [theme.breakpoints.down('xs')]: {
      padding: '1rem 1rem'
    }
  }
}))

const HomePage = props => {
  const { currentUser } = props
  const { path } = useRouteMatch()
  const theme = useTheme()
  const classes = useStyles(theme)

  return (
    <div>
      <MenuAppBar currentUser={currentUser} />
      <div className={classes.container}>
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
    </div>
  )
}

function mapStateToProps(state) {
  const currentUser = getCurrentUser(state)
  return { currentUser }
}

export default connect(mapStateToProps)(HomePage)
