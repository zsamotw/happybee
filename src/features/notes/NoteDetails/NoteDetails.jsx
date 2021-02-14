import React, { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import Dialogs from '../Dialogs'
import {
  SYNC_NOTE_REQUEST,
  DELETE_NOTE_REQUEST,
  PICK_NOTE_REQUEST
} from '../../../store/actions/async-actions'
import { UNSET_SELECTED_NOTE } from '../../../store/actions/sync-actions'
import {
  getSelectedNote,
  getIsAsyncRequest,
  getCurrentUser
} from '../../../store/selectors'
import { formattedDateTime } from '../../../services/date-service'
import AppDeleteIcon from '../../../components/AppDeleteIcon'

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  },
  container: {
    display: 'flex'
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 1rem',
    marginTop: '2rem'
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
  title: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between'
  },
  deleteIcon: {
    position: 'absolute',
    right: '0',
    top: '6px'
  },
  pickers: {
    display: 'flex',
    alignItems: 'center'
  }
}))

function NoteDetails(props) {
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false)
  const [openConfirmDialog, setOpenConfirmDialog] = React.useState(false)

  const {
    getNote,
    note,
    isFetchingNote,
    pickNote,
    deleteNote,
    unsetSelectedNote,
    currentUser
  } = props

  const { title, description, imgURL, category, author, pickers, createdAt } =
    note || {}

  const { t } = useTranslation('common')
  const theme = useTheme()
  const classes = useStyles(theme)
  const { id } = useParams()
  const history = useHistory()

  useEffect(() => {
    const messageOnError = t('noteDetails.messageOnError')
    const noteData = { id, messageOnError }
    getNote(noteData)

    return () => {
      unsetSelectedNote()
    }
  }, [id, getNote, t, unsetSelectedNote])

  const handleDeleteNote = () => {
    const messageOnSuccess = t('note.messageOnDeleteSuccess')
    const messageOnError = t('note.messageOnDeleteError')
    const messageOnFileDeleteError = t('note.messageOnFileDeleteError')
    const messageOnUserAccessError = t('note.messageOnUserNoteAccessError')
    deleteNote({
      note,
      history,
      messageOnSuccess,
      messageOnError,
      messageOnFileDeleteError,
      messageOnUserAccessError
    })
    setOpenDeleteDialog(false)
  }

  const canPick = () => {
    return (
      pickers &&
      (pickers.every(p => p.uid !== currentUser.uid) || pickers.length === 0)
    )
  }

  const handlePickNote = () => {
    if (canPick()) {
      const shouldGetNote = true
      const messageOnSuccess = t('note.messageOnPickSuccess')
      const messageOnError = t('note.messageOnPickError')
      const messageOnUserPickAccessError = t(
        'note.messageOnUserPickAccessError'
      )

      pickNote({
        note,
        shouldGetNote,
        messageOnSuccess,
        messageOnError,
        messageOnUserPickAccessError
      })
    }
    setOpenConfirmDialog(false)
  }

  const handleClickOpenDeleteDialog = () => {
    setOpenDeleteDialog(true)
  }

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false)
  }

  const handleClickOpenConfirmDialog = () => {
    if (canPick()) {
      setOpenConfirmDialog(true)
    }
  }

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false)
  }

  return (
    <>
      <Backdrop className={classes.backdrop} open={isFetchingNote}>
        <CircularProgress color="secondary" />
      </Backdrop>
      {note ? (
        <>
          <Dialogs
            isDeleteDialogOpened={openDeleteDialog}
            closeDeleteDialog={handleCloseDeleteDialog}
            isConfirmDialogOpened={openConfirmDialog}
            closeConfirmDialog={handleCloseConfirmDialog}
            deleteNote={handleDeleteNote}
            pickNote={handlePickNote}
            note={note}
          />
          <div className={classes.container}>
            <div style={{ width: '50%' }}>
              <img src={imgURL} alt="i" style={{ width: '100%' }} />
              <div className={classes.footer}>
                <div className={classes.author}>
                  <Avatar className={classes.avatar}>
                    {author.displayName.charAt(0)}
                  </Avatar>
                  <span>{author.displayName}</span>
                </div>
                <div className={classes.pickers}>
                  <div style={{ marginRight: '10px' }}>{pickers.length}</div>
                  <AddCircleOutlineIcon
                    style={{
                      cursor: 'pointer',
                      color: canPick()
                        ? theme.palette.secondary.main
                        : theme.palette.text.secondary
                    }}
                    onClick={handleClickOpenConfirmDialog}
                  />
                </div>
              </div>
            </div>
            <div style={{ width: '50%', paddingLeft: '2rem' }}>
              <div className={classes.title}>
                <h1 style={{ margin: 0 }}>{title}</h1>
                <div className={classes.deleteIcon}>
                  <AppDeleteIcon
                    note={note}
                    currentUser={currentUser}
                    onClick={handleClickOpenDeleteDialog}
                  />
                </div>
              </div>
              <h2 style={{ marginTop: 0 }}>{category.label}</h2>
              <p>{description}</p>
              <div style={{ fontSize: '.7em' }}>
                {formattedDateTime(createdAt)}
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  )
}

function mapStateToProps(state) {
  const { isFetchingNote } = getIsAsyncRequest(state)
  const currentUser = getCurrentUser(state)
  const note = getSelectedNote(state)
  return { currentUser, note, isFetchingNote }
}

function mapDispatchToState(dispatch) {
  return {
    getNote: noteData => dispatch(SYNC_NOTE_REQUEST(noteData)),
    unsetSelectedNote: () => dispatch(UNSET_SELECTED_NOTE()),
    deleteNote: deleteNoteData => dispatch(DELETE_NOTE_REQUEST(deleteNoteData)),
    pickNote: noteData => dispatch(PICK_NOTE_REQUEST(noteData))
  }
}

export default connect(mapStateToProps, mapDispatchToState)(NoteDetails)
