import React, { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import Avatar from '@material-ui/core/Avatar'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles } from '@material-ui/core'
import routes from '../../../constants/routes'

const useStyles = makeStyles(theme => ({
  avatar: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    textTransform: 'uppercase',
    backgroundColor: theme.palette.secondary.main
  }
}))

export default function UserMenu({
  path,
  currentUser,
  history,
  logout,
  theme
}) {
  const { t } = useTranslation('common')
  const classes = useStyles(theme)

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleOpenMenu = event => {
    setAnchorEl(event.currentTarget)
  }

  const navigateAccount = () => {
    history.push(`${path}${routes.account}`)
    setAnchorEl(null)
  }

  const navigateCreateNote = () => {
    history.push(`${path}${routes.createNote}`)
    setAnchorEl(null)
  }

  const navigateUserNotes = () => {
    history.push(`${path}${routes.user}/${currentUser.uid}${routes.notes}`)
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
    () =>
      currentUser && currentUser.displayName
        ? currentUser.displayName.charAt(0)
        : '',
    [currentUser]
  )
  return (
    <div>
      <IconButton onClick={handleOpenMenu} color="inherit">
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
        <MenuItem onClick={navigateCreateNote}>
          {t('notes.menuAppBar.menu.createNewNote')}
        </MenuItem>
        <MenuItem onClick={navigateUserNotes}>
          {t('notes.menuAppBar.menu.userNotes')}
        </MenuItem>
        <MenuItem onClick={navigateAccount}>
          {t('notes.menuAppBar.menu.profile')}
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout} style={{ paddingTop: '1rem' }}>
          {t('notes.menuAppBar.menu.logout')}
        </MenuItem>
      </Menu>
    </div>
  )
}
