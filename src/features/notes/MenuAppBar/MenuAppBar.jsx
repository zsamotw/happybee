import React from 'react'
import { useTranslation } from 'react-i18next'
import AppBar from '@material-ui/core/AppBar'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { connect } from 'react-redux'
import { Link, useHistory, useRouteMatch } from 'react-router-dom'
import SearchBar from '../SearchBar'
import routes from '../../../constants/routes'
import { logoutRequest } from '../../../store/actions/async-actions'
import {
  selectSearchBarConfig,
  selectCurrentViewTitle
} from '../../../store/selectors'
import NavigationLinks from './NavigationLinks'
import UserMenu from './UserMenu'
import iconLinkStyles from './styles'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  iconLink: iconLinkStyles(theme),
  grow: {
    flexGrow: 1
  },
  pageTitle: {
    fontSize: '14px',
    textTransform: 'uppercase',
    marginLeft: '3rem',
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  title: {
    fontFamily: 'Kalam',
    fontSize: '24px',
    fontWeight: '700',
    textTransform: 'uppercase',
    marginRight: theme.spacing(3)
  },
  searchBar: {
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  }
}))

function MenuAppBar(props) {
  const theme = useTheme()
  const classes = useStyles(theme)

  const { path } = useRouteMatch()
  const history = useHistory()

  const { t } = useTranslation('common')

  const { currentUser, logout, isSearchBarVisible, title } = props

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Link to={routes.home} className={classes.iconLink}>
            {' '}
            <Typography variant="h6" className={classes.title}>
              {t('notes.menuAppBar.appTitle')}
            </Typography>
          </Link>
          <SearchBar
            isVisible={isSearchBarVisible}
            className={classes.searchBar}
          />
          <NavigationLinks
            path={path}
            currentUser={currentUser}
            theme={theme}
          />
          <div className={classes.pageTitle}>{title}</div>
          <div className={classes.grow} />
          <UserMenu
            path={path}
            currentUser={currentUser}
            history={history}
            theme={theme}
            logout={logout}
          />
        </Toolbar>
      </AppBar>
    </div>
  )
}

const mapStateToProps = state => {
  const { isVisible: isSearchBarVisible } = selectSearchBarConfig(state)
  const title = selectCurrentViewTitle(state)
  return { isSearchBarVisible, title }
}

const mapDispatchToState = dispatch => {
  return {
    logout: logOutData => dispatch(logoutRequest(logOutData))
  }
}

export default connect(mapStateToProps, mapDispatchToState)(MenuAppBar)
