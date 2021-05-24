import React, { useMemo } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Dialogs from '../Dialogs'
import { selectCurrentUser } from '../../../store/selectors'
import AppDeleteIcon from '../../../components/AppDeleteIcon'
import { useDeleteNote } from '../../../hooks'
import { formattedDateTime } from '../../../services/date-service'
import routes from '../../../constants/routes'
import NoteMeta from '../NoteMeta'

const wrapper = {
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '400px',
  boxSizing: 'border-box',
  margin: '1rem 0',
  overflow: 'hidden',
  borderRadius: '15px',
  cursor: 'pointer'
}

const useStyles = makeStyles(theme => ({
  gridItem: {
    paddingRight: '1rem',
    marginBottom: '1rem',
    '&:hover': {
      '& $imageWrapper, $noImageWrapper': {
        border: `3px solid ${theme.palette.secondary.main}`
      },
      '& $description': {
        transform: 'scale(1.1)'
      }
    }
  },
  header: {
    position: 'relative'
  },
  headLine: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontWeight: '600',
    marginBottom: '.1rem',
    paddingRight: '3rem'
  },
  description: {
    color: `${theme.palette.grey[800]}`,
    padding: '1.5rem',
    margin: '2.5rem',
    borderRadius: '10px',
    position: 'absolute',
    backgroundColor: 'white',
    overflowY: 'auto',
    transition: 'all 0.3s'
  },
  date: {
    fontSize: '14px',
    color: `${theme.palette.grey[500]}`,
    marginTop: '0.5rem'
  },
  imageWrapper: {
    ...wrapper,
    backgroundImage: 'linear-gradient(to left, #57a0b324, #57a0b324)',
    backgroundClip: 'content-box',
    border: `3px solid transparent`
  },
  noImageWrapper: {
    ...wrapper,
    background: theme.palette.primary.light
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
    position: 'absolute',
    right: '0',
    top: '-10px',
    zIndex: 10
  }
}))

function Note(props) {
  const theme = useTheme()
  const classes = useStyles(theme)

  const history = useHistory()

  const { note, currentUser } = props
  const { id, title, description, category, author, createdAt } = note

  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false)

  const handleDeleteNote = useDeleteNote(note, setOpenDeleteDialog)

  const handleNavigateNoteDetails = () => {
    history.push(`${routes.home}${routes.notes}/${id}`)
  }

  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true)
  }

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false)
  }

  const shortDescription = useMemo(() => {
    if (description.length > 170) {
      return `${description.substr(0, 170)}...`
    }
    return description
  }, [description])

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
    hasData() && (
      <Grid className={classes.gridItem} item xs={12} sm={6} lg={4} xl={3}>
        <Dialogs
          isDeleteDialogOpened={openDeleteDialog}
          closeDeleteDialog={handleCloseDeleteDialog}
          deleteNote={handleDeleteNote}
        />
        <article>
          <div className={classes.header}>
            <h3 className={classes.headLine}>{title}</h3>
            {note.author.uid === currentUser.uid ? (
              <div className={classes.deleteIcon} data-testid="delete-icon">
                <AppDeleteIcon onClick={handleOpenDeleteDialog} />
              </div>
            ) : null}
          </div>
          <div style={{ marginBottom: '.07rem' }}>{category.label}</div>
          {note.imgURL ? (
            <div
              className={classes.imageWrapper}
              onClick={handleNavigateNoteDetails}
              onKeyDown={handleNavigateNoteDetails}
              role="button"
              tabIndex="0"
            >
              <img src={note.imgURL} alt="i" className={classes.image} />
              <div className={classes.description}>
                <span>{shortDescription}</span>
                <div className={classes.date}>
                  {formattedDateTime(createdAt)}
                </div>
              </div>
            </div>
          ) : (
            <div
              className={classes.noImageWrapper}
              onClick={handleNavigateNoteDetails}
              onKeyDown={handleNavigateNoteDetails}
              role="button"
              tabIndex="0"
            >
              <div className={classes.description}>
                <span>{shortDescription}</span>
                <div className={classes.date}>
                  {formattedDateTime(createdAt)}
                </div>
              </div>
            </div>
          )}
          <NoteMeta note={note} />
        </article>
      </Grid>
    )
  )
}

function mapStateToProps(state) {
  const currentUser = selectCurrentUser(state)
  return { currentUser }
}

export default connect(mapStateToProps, null)(Note)
