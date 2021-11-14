import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Paper from '@material-ui/core/Paper'
import Dialogs from '../Dialogs'
import NoteMeta from '../NoteMeta'
import NoteContent from './NoteContent'
import { selectSelectedNote } from '../../selector/notesSelectors'
import HBPreloader from '../../../../shared/component/HBPreloader'
import { useDeleteNote, useGetNote } from '../../hook'
import {
  selectCurrentUser,
  selectIsAsyncRequest
} from '../../../../shared/selector/appSelectors'
import HBEditButton from '../../../../shared/component/HBEditButton'
import HBDeleteButton from '../../../../shared/component/HBDeleteButton'
import routes from '../../../../constant/routes'

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

function NoteDetails({
  note,
  isFetchingData,
  isUpdatingData,
  isDeletingData,
  currentUser
}) {
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false)

  const { title, description, imgURL, category, author, createdAt, isPrivate } =
    note || {}

  const { t } = useTranslation('common')
  const history = useHistory()
  const theme = useTheme()
  const classes = useStyles(theme)
  const { id } = useParams()
  const messageOnError = t('notes.noteDetails.messageOnError')

  useGetNote(messageOnError)

  const shouldNavigateHome = true
  const handleDeleteNote = useDeleteNote(
    note,
    setOpenDeleteDialog,
    shouldNavigateHome
  )

  const handleNavigateBack = () => history.goBack()
  const handleNavigateEdit = () =>
    history.push(`${routes.home}${routes.notes}/${id}/edit`)

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
    category?.label &&
    author &&
    author?.email &&
    author?.displayName &&
    createdAt

  return (
    <>
      <HBPreloader
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
                  <div>
                    <HBEditButton onClick={handleNavigateEdit} />
                    <HBDeleteButton onClick={handleClickOpenDeleteDialog} />
                  </div>
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
                      isPrivate={isPrivate}
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
                      isPrivate={isPrivate}
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
  const {
    isFetchingData,
    isUpdatingData,
    isDeletingData
  } = selectIsAsyncRequest(state)
  const currentUser = selectCurrentUser(state)
  const note = selectSelectedNote(state)
  return { currentUser, note, isFetchingData, isUpdatingData, isDeletingData }
}

export default connect(mapStateToProps, null)(NoteDetails)
