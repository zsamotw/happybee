import React, { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Paper from '@material-ui/core/Paper'
import Dialogs from '../Dialogs'
import NoteMeta from './NoteMeta'
import NoteContent from './NoteContent'
import { SYNC_NOTE_REQUEST } from '../../../store/actions/async-actions'
import { UNSET_SELECTED_NOTE } from '../../../store/actions/sync-actions'
import {
  getSelectedNote,
  getIsAsyncRequest,
  getCurrentUser
} from '../../../store/selectors'
import AppDeleteIcon from '../../../components/AppDeleteIcon'
import AppPreloader from '../../../components/AppPreloader'
import { useDeleteNote } from '../../../hooks'

const useStyles = makeStyles({
  root: {
    padding: '0 2rem 2rem 2rem'
  },
  content: {
    display: 'flex',
    position: 'relative',
    padding: '2rem 2rem 0.5rem'
  },
  imageContainer: {
    width: '50%'
  },
  noImageContainer: {
    width: '100%'
  },
  headerIcons: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '0 -2rem'
  }
})

function NoteDetails(props) {
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false)

  const {
    getNote,
    note,
    isFetchingData,
    isUpdatingData,
    isDeletingData,
    unsetSelectedNote,
    currentUser
  } = props

  const { title, description, imgURL, category, author, createdAt } = note || {}

  const { t } = useTranslation('common')
  const history = useHistory()
  const theme = useTheme()
  const classes = useStyles(theme)
  const { id } = useParams()

  useEffect(() => {
    const messageOnError = t('notes.noteDetails.messageOnError')
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

  const handleNavigateBack = () => history.goBack()

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
      <AppPreloader
        isVisible={isFetchingData || isUpdatingData || isDeletingData}
      />
      {hasData() && (
        <>
          <Dialogs
            isDeleteDialogOpened={openDeleteDialog}
            closeDeleteDialog={handleCloseDeleteDialog}
            deleteNote={handleDeleteNote}
          />
          <article>
            <Paper elevation={3} className={classes.root}>
              <div className={classes.headerIcons}>
                <IconButton onClick={handleNavigateBack}>
                  <CloseIcon />
                </IconButton>
                {note.author.uid === currentUser.uid && (
                  <AppDeleteIcon onClick={handleClickOpenDeleteDialog} />
                )}
              </div>
              <div className={classes.content}>
                {imgURL ? (
                  <>
                    <div className={classes.imageContainer}>
                      <img
                        src={imgURL}
                        alt="user img"
                        style={{ width: '100%' }}
                      />
                      <NoteMeta note={note} />
                    </div>
                    <NoteContent
                      title={title}
                      category={category}
                      description={description}
                      createdAt={createdAt}
                      withImage
                    />
                  </>
                ) : (
                  <div className={classes.noImageContainer}>
                    <NoteContent
                      title={title}
                      category={category}
                      description={description}
                      createdAt={createdAt}
                    />
                    <NoteMeta note={note} />
                  </div>
                )}
              </div>
            </Paper>
          </article>
        </>
      )}
    </>
  )
}

function mapStateToProps(state) {
  const { isFetchingData, isUpdatingData, isDeletingData } = getIsAsyncRequest(
    state
  )
  const currentUser = getCurrentUser(state)
  const note = getSelectedNote(state)
  return { currentUser, note, isFetchingData, isUpdatingData, isDeletingData }
}

function mapDispatchToState(dispatch) {
  return {
    getNote: noteData => dispatch(SYNC_NOTE_REQUEST(noteData)),
    unsetSelectedNote: () => dispatch(UNSET_SELECTED_NOTE())
  }
}

export default connect(mapStateToProps, mapDispatchToState)(NoteDetails)
