import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import Dialogs from '../Dialogs'
import {
  GET_NOTE_REQUEST,
  DELETE_NOTE_REQUEST,
  PICK_NOTE_REQUEST
} from '../../../store/actions/async-actions'
import {
  getSelectedNote,
  getIsAsyncRequest,
  getCurrentUser
} from '../../../store/selectors'

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
    currentUser
  } = props

  const { name, description, imgURL, category, author, pickers, createdAt } =
    note || {}

  const { t } = useTranslation('common')
  const theme = useTheme()
  const classes = useStyles(theme)
  const { id } = useParams()

  useEffect(() => {
    const messageOnError = t('noteDetails.messageOnError')
    const noteData = { id, messageOnError }
    getNote(noteData)
  }, [id, getNote, t])

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

  const canPick = () => {
    return (
      pickers &&
      (pickers.every(p => p.uid !== currentUser.uid) || pickers.length === 0)
    )
  }

  const handlePickNote = () => {
    if (canPick()) {
      const messageOnSuccess = t('note.messageOnPickSuccess')
      const messageOnError = t('note.messageOnPickError')
      const messageOnUserPickAccessError = t(
        'note.messageOnUserPickAccessError'
      )
      pickNote({
        note,
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
            openDeleteDialog={openDeleteDialog}
            handleCloseDeleteDialog={handleCloseDeleteDialog}
            openConfirmDialog={openConfirmDialog}
            handleCloseConfirmDialog={handleCloseConfirmDialog}
            handleDeleteNote={handleDeleteNote}
            handlePickNote={handlePickNote}
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
                    color="secondary"
                    style={{ cursor: 'pointer' }}
                    onClick={handleClickOpenConfirmDialog}
                  />
                </div>
              </div>
            </div>
            <div style={{ width: '50%', paddingLeft: '2rem' }}>
              <h1>{name}</h1>
              <h2>{category.label}</h2>
              <p style={{ marginTop: '2rem' }}>{description}</p>
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
    getNote: noteData => dispatch(GET_NOTE_REQUEST(noteData)),
    deleteNote: deleteNoteData => dispatch(DELETE_NOTE_REQUEST(deleteNoteData)),
    pickNote: noteData => dispatch(PICK_NOTE_REQUEST(noteData))
  }
}

export default connect(mapStateToProps, mapDispatchToState)(NoteDetails)
