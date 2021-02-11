import React from 'react'
import { useTranslation } from 'react-i18next'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import { connect } from 'react-redux'
import { useHistory, useRouteMatch } from 'react-router-dom'
import Dialogs from './Dialogs'
import { getCurrentUser, getIsAsyncRequest } from '../../../store/selectors'
import {
  DELETE_NOTE_REQUEST,
  PICK_NOTE_REQUEST
} from '../../../store/actions/async-actions'

const paperTextStyles = {
  color: 'white',
  padding: '.5rem',
  borderRadius: '10px',
  opacity: 0.5
}

const useStyles = makeStyles(theme => ({
  gridItem: {
    padding: '1rem 1rem 1rem 0',
    '&:hover': {
      '& $imageWrapper': {
        border: `5px solid ${theme.palette.primary.main}`,
        backgroundImage: 'linear-gradient(to left, #6fa8758a, #6fa8758a )'
      },
      '& img': {
        zIndex: '-1'
      },
      '& $description': {
        opacity: '1'
      }
    }
  },
  icon: {
    position: 'absolute',
    top: 10,
    right: 10
  },
  headLine: {
    fontWeight: '600',
    marginBottom: '.1rem'
  },
  description: {
    ...paperTextStyles,
    padding: '1.5rem',
    margin: '1.5rem',
    position: 'absolute',
    opacity: 0,
    backgroundColor: 'black',
    overflowY: 'auto'
  },
  imageWrapper: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '400px',
    boxSizing: 'border-box',
    margin: '1rem 0',
    overflow: 'hidden',
    border: `5px solid ${theme.palette.secondary.main}`,
    borderRadius: '15px'
  },
  image: {
    height: '100%'
  },
  author: {
    display: 'flex',
    alignItems: 'center',
    margin: '0 0 0 0'
  },
  avatar: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    textTransform: 'uppercase',
    backgroundColor: theme.palette.secondary.main,
    marginRight: theme.spacing(1)
  },
  deleteIcon: {
    '& svg': {
      color: theme.palette.error.main
    },
    '&:hover': {
      '& svg': {
        color: theme.palette.grey['50'],
        cursor: 'pointer'
      }
    }
  },
  pickIcon: {
    '&:hover': {
      '& svg': {
        color: theme.palette.grey['50'],
        cursor: 'pointer'
      }
    }
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 1rem'
  },
  pickers: {
    display: 'flex',
    alignItems: 'center'
  }
}))

function Note(prop) {
  const theme = useTheme()
  const classes = useStyles(theme)

  const { t } = useTranslation('common')
  const history = useHistory()
  const { path } = useRouteMatch()

  const { note, deleteNote, pickNote, currentUser } = prop
  const { id, name, description, category, author, pickers, createdAt } = note

  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false)
  const [openConfirmDialog, setOpenConfirmDialog] = React.useState(false)

  const handleNavigateNoteDetails = () => {
    history.push(`${path}/${id}`)
  }

  const handleDeleteNote = () => {
    const messageOnSuccess = t('note.messageOnDeleteSuccess')
    const messageOnError = t('note.messageOnDeleteError')
    const messageOnFileDeleteError = t('note.messageOnFileDeleteError')
    const messageOnUserAccessError = t('note.messageOnUserNoteAccessError')
    deleteNote({
      note,
      messageOnSuccess,
      messageOnError,
      messageOnFileDeleteError,
      messageOnUserAccessError
    })
    setOpenDeleteDialog(false)
  }

  const handlePickNote = () => {
    const messageOnSuccess = t('note.messageOnPickSuccess')
    const messageOnError = t('note.messageOnPickError')
    const messageOnUserPickAccessError = t('note.messageOnUserPickAccessError')
    pickNote({
      note,
      messageOnSuccess,
      messageOnError,
      messageOnUserPickAccessError
    })
    setOpenConfirmDialog(false)
  }

  const handleClickOpenDeleteDialog = () => {
    setOpenDeleteDialog(true)
  }

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false)
  }

  const handleClickOpenConfirmDialog = () => {
    setOpenConfirmDialog(true)
  }

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false)
  }

  const hasCurrentUserPicked = () => {
    return pickers && pickers.some(p => p.uid === currentUser.uid)
  }

  const hasData = () =>
    note &&
    id &&
    name &&
    description &&
    category &&
    category.label &&
    author &&
    author.email &&
    author.displayName &&
    createdAt

  const getIcon = () => {
    if (note.author.uid === currentUser.uid) {
      return (
        <IconButton
          className={classes.deleteIcon}
          onClick={handleClickOpenDeleteDialog}
          data-testid="deleteIcon"
        >
          <DeleteIcon fontSize="large" />
        </IconButton>
      )
    }
    if (!hasCurrentUserPicked()) {
      return (
        <IconButton
          className={classes.pickIcon}
          onClick={handleClickOpenConfirmDialog}
          data-testid="confirmIcon"
        >
          <AddCircleIcon color="secondary" fontSize="large" />
        </IconButton>
      )
    }
    return <></>
  }

  return (
    hasData() && (
      <Grid
        className={classes.gridItem}
        item
        xs={12}
        sm={6}
        lg={4}
        xl={3}
        onClick={handleNavigateNoteDetails}
      >
        <Dialogs
          openDeleteDialog={openDeleteDialog}
          handleCloseDeleteDialog={handleCloseDeleteDialog}
          openConfirmDialog={openConfirmDialog}
          handleCloseConfirmDialog={handleCloseConfirmDialog}
          handleDeleteNote={handleDeleteNote}
          handlePickNote={handlePickNote}
          note={note}
        />
        <h3 className={classes.headLine}>{name || ''}</h3>
        <div style={{ marginBottom: '.07rem' }}>{category.label}</div>
        <div className={classes.imageWrapper}>
          <img src={note.imgURL} alt="i" className={classes.image} />
          <div className={classes.icon}>{getIcon(note, currentUser)}</div>
          <div className={classes.description}>{description || ''}</div>
        </div>
        <div className={classes.footer}>
          <div className={classes.author}>
            <Avatar className={classes.avatar} data-testid="avatar">
              {author.displayName.charAt(0)}
            </Avatar>
            <span>{author.displayName}</span>
          </div>
          {pickers.length ? (
            <div className={classes.pickers}>
              <div style={{ marginRight: '10px' }}>{pickers.length}</div>
              <AddCircleOutlineIcon color="secondary" />
            </div>
          ) : null}
        </div>
      </Grid>
    )
  )
}

function mapStateToProps(state) {
  const { isProcessingNote } = getIsAsyncRequest(state)
  const currentUser = getCurrentUser(state)
  return { isProcessingNote, currentUser }
}

function mapDispatchToState(dispatch) {
  return {
    deleteNote: deleteNoteData => dispatch(DELETE_NOTE_REQUEST(deleteNoteData)),
    pickNote: noteData => dispatch(PICK_NOTE_REQUEST(noteData))
  }
}

export default connect(mapStateToProps, mapDispatchToState)(Note)
