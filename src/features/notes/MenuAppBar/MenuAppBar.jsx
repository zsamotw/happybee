import React, { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import AppBar from '@material-ui/core/AppBar'
import Avatar from '@material-ui/core/Avatar'
import NoteAddIcon from '@material-ui/icons/NoteAdd'
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks'
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { connect } from 'react-redux'
import { Link, useHistory, useRouteMatch } from 'react-router-dom'
import SearchBar from '../SearchBar'
import * as ROUTES from '../../../constants/routes'
import { SET_AUTH_USER } from '../../../store/actions/sync-actions'
import { LOGOUT_REQUEST } from '../../../store/actions/async-actions'
import {
  getSearchBarConfig,
  getCurrentViewTitle
} from '../../../store/selectors'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  iconLink: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textDecoration: 'none',
    color: '#fff',
    fontSize: '20px',
    cursor: 'pointer',
    marginRight: '2rem',
    '&:hover': {
      color: `${theme.palette.grey[200]}`
    },
    '& div': {
      fontSize: '11px'
    }
  },
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
  avatar: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    textTransform: 'uppercase',
    backgroundColor: theme.palette.secondary.main
  },
  link: {
    textDecoration: 'none',
    color: '#fff',
    fontSize: '1.5em',
    marginLeft: '1.5rem'
  }
}))

function MenuAppBar(props) {
  const theme = useTheme()
  const classes = useStyles(theme)

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const history = useHistory()
  const { path } = useRouteMatch()

  const { t } = useTranslation('common')

  const { currentUser, logout, isSearchBarVisible, title } = props

  const handleMenu = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleNavigateAccount = () => {
    history.push(`${path}${ROUTES.ACCOUNT}`)
    setAnchorEl(null)
  }

  const handleNavigateCreateNote = () => {
    history.push(`${path}${ROUTES.CREATE_NOTE}`)
    setAnchorEl(null)
  }

  const handleNavigateUserNotes = () => {
    history.push(`${path}${ROUTES.USER}/${currentUser.uid}${ROUTES.NOTES}`)
    setAnchorEl(null)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    const messageOnError = t('notes.menuAppBar.messageOnLogOutError')
    logout({ messageOnError })
  }

  const currentUserFirstLetter = useMemo(
    () => currentUser.displayName.charAt(0),
    [currentUser]
  )

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Link to={ROUTES.HOME} className={classes.iconLink}>
            {' '}
            <Typography variant="h6" className={classes.title}>
              {t('notes.menuAppBar.appTitle')}
            </Typography>
          </Link>
          <SearchBar isVisible={isSearchBarVisible} />
          <Link
            className={classes.iconLink}
            style={{ marginLeft: '3rem' }}
            to={`${path}${ROUTES.CREATE_NOTE}`}
          >
            <NoteAddIcon />
            <div>{t('notes.menuAppBar.links.newNote')}</div>
          </Link>
          <Link className={classes.iconLink} to={`${ROUTES.HOME}`}>
            <LocalLibraryIcon />
            <div>{t('notes.menuAppBar.links.notes')}</div>
          </Link>
          <Link
            className={classes.iconLink}
            to={`${path}${ROUTES.USER}/${currentUser.uid}${ROUTES.NOTES}`}
          >
            <LibraryBooksIcon />
            <div>{t('notes.menuAppBar.links.userNotes')}</div>
          </Link>
          <div className={classes.pageTitle}>{title}</div>
          <div className={classes.grow} />
          <div>
            <IconButton onClick={handleMenu} color="inherit">
              <Avatar className={classes.avatar}>
                {currentUser.displayName && currentUserFirstLetter}
              </Avatar>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleNavigateCreateNote}>
                {t('notes.menuAppBar.menu.createNewNote')}
              </MenuItem>
              <MenuItem onClick={handleNavigateUserNotes}>
                {t('notes.menuAppBar.menu.userNotes')}
              </MenuItem>
              <MenuItem onClick={handleNavigateAccount}>
                {t('notes.menuAppBar.menu.profile')}
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout} style={{ paddingTop: '1rem' }}>
                {t('notes.menuAppBar.menu.logout')}
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}

const mapStateToProps = state => {
  const { isVisible: isSearchBarVisible } = getSearchBarConfig(state)
  const title = getCurrentViewTitle(state)
  return { isSearchBarVisible, title }
}

const mapDispatchToState = dispatch => {
  return {
    setAuthUser: authUser => dispatch(SET_AUTH_USER(authUser)),
    logout: logOutData => dispatch(LOGOUT_REQUEST(logOutData))
  }
}

export default connect(mapStateToProps, mapDispatchToState)(MenuAppBar)
