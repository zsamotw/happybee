import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import Dialogs from '../Dialogs'
import { SYNC_NOTE_REQUEST } from '../../../store/actions/async-actions'
import { UNSET_SELECTED_NOTE } from '../../../store/actions/sync-actions'
import {
  getSelectedNote,
  getIsAsyncRequest,
  getCurrentUser
} from '../../../store/selectors'
import { formattedDateTime } from '../../../services/date-service'
import AppDeleteIcon from '../../../components/AppDeleteIcon'
import AppPreloader from '../../../components/AppPreloader'
import { useDeleteNote, usePickNote } from '../../../hooks'

const useStyles = makeStyles(theme => ({
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

  const {
    getNote,
    note,
    isFetchingNote,
    unsetSelectedNote,
    currentUser
  } = props

  const { title, description, imgURL, category, author, pickers, createdAt } =
    note || {}

  const { t } = useTranslation('common')
  const theme = useTheme()
  const classes = useStyles(theme)
  const { id } = useParams()

  useEffect(() => {
    const messageOnError = t('noteDetails.messageOnError')
    const noteData = { id, messageOnError }
    getNote(noteData)

    return () => {
      unsetSelectedNote()
    }
  }, [id, getNote, t, unsetSelectedNote])

  const shouldNavigateHome = true
  const handleDeleteNote = useDeleteNote(
    note,
    setOpenDeleteDialog,
    shouldNavigateHome
  )
  const [handlePickNote, canPick] = usePickNote(note)

  const handleClickOpenDeleteDialog = () => {
    setOpenDeleteDialog(true)
  }

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false)
  }

  const hasData = () =>
    note &&
    id &&
    title &&
    description &&
    category &&
    category.label &&
    author &&
    author.email &&
    author.displayName &&
    createdAt

  return (
    <>
      <AppPreloader isVisible={isFetchingNote} />
      {hasData() ? (
        <>
          <Dialogs
            isDeleteDialogOpened={openDeleteDialog}
            closeDeleteDialog={handleCloseDeleteDialog}
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
                      color: canPick(note)
                        ? theme.palette.secondary.main
                        : theme.palette.text.secondary
                    }}
                    onClick={handlePickNote}
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
    unsetSelectedNote: () => dispatch(UNSET_SELECTED_NOTE())
  }
}

export default connect(mapStateToProps, mapDispatchToState)(NoteDetails)
