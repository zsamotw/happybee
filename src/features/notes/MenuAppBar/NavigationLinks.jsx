import React from 'react'
import { makeStyles } from '@material-ui/core'
import NoteAddIcon from '@material-ui/icons/NoteAdd'
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks'
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import * as ROUTES from '../../../constants/routes'

const useStyles = makeStyles(theme => ({
  links: {
    alignSelf: 'stretch',
    display: 'flex',
    listStyleType: 'none',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
    '& li': {
      height: 'calc(100% - 10px)',
      width: '80px',
      '& a': {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    },
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
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
  activeLink: {
    borderBottom: `5px solid ${theme.palette.secondary.main}`
  }
}))

export default function NavigationLinks({ path, currentUser, theme }) {
  const classes = useStyles(theme)
  const { t } = useTranslation('common')

  return (
    <ul className={classes.links}>
      <li>
        <NavLink
          exact
          to={`${path}${ROUTES.CREATE_NOTE}`}
          className={classes.iconLink}
          activeClassName={classes.activeLink}
        >
          <NoteAddIcon />
          <div>{t('notes.menuAppBar.links.newNote')}</div>
        </NavLink>
      </li>
      <li>
        <NavLink
          exact
          to={`${path}${ROUTES.NOTES}`}
          className={classes.iconLink}
          activeClassName={classes.activeLink}
        >
          <LocalLibraryIcon />
          <div>{t('notes.menuAppBar.links.notes')}</div>
        </NavLink>
      </li>
      <li>
        <NavLink
          to={`${path}${ROUTES.USER}/${currentUser.uid}${ROUTES.NOTES}`}
          className={classes.iconLink}
          activeClassName={classes.activeLink}
        >
          <LibraryBooksIcon />
          <div>{t('notes.menuAppBar.links.userNotes')}</div>
        </NavLink>
      </li>
    </ul>
  )
}
