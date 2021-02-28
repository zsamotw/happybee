import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid'
import Tooltip from '@material-ui/core/Tooltip'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import { connect } from 'react-redux'
import { useHistory, useRouteMatch } from 'react-router-dom'
import Dialogs from '../Dialogs'
import { getCurrentUser } from '../../../store/selectors'
import AppDeleteIcon from '../../../components/AppDeleteIcon'
import { useDeleteNote, usePickNote } from '../../../hooks'

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
        backgroundImage: 'linear-gradient(to left, #57a0b396, #57a0b396 )'
      },
      '& img': {
        zIndex: '-1'
      },
      '& $description': {
        opacity: '1'
      }
    }
  },
  header: {
    position: 'relative'
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
    borderRadius: '15px',
    cursor: 'pointer'
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
    top: '-10px'
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

function Note(props) {
  const theme = useTheme()
  const classes = useStyles(theme)

  const history = useHistory()
  const { path } = useRouteMatch()

  const { note, currentUser } = props
  const { id, title, description, category, author, pickers, createdAt } = note

  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false)

  const { t } = useTranslation('common')

  const handleNavigateNoteDetails = () => {
    history.push(`${path}/${id}`)
  }

  const handleDeleteNote = useDeleteNote(note, setOpenDeleteDialog)
  const [handlePickNote, isPicked] = usePickNote(note)

  const handleClickOpenDeleteDialog = () => {
    setOpenDeleteDialog(true)
  }

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false)
  }

  const pickersString = useMemo(() => {
    return pickers.length > 0
      ? pickers.map(p => p.displayName).join(', ')
      : t('notes.note.messageWhenEmptyPickers')
  }, [pickers, t])

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
        <div className={classes.header}>
          <h3 className={classes.headLine}>{title}</h3>
          {note.author.uid === currentUser.uid ? (
            <div className={classes.deleteIcon} data-testid="delete-icon">
              <AppDeleteIcon onClick={handleClickOpenDeleteDialog} />
            </div>
          ) : null}
        </div>
        <div style={{ marginBottom: '.07rem' }}>{category.label}</div>
        <div
          className={classes.imageWrapper}
          onClick={handleNavigateNoteDetails}
          onKeyDown={handleNavigateNoteDetails}
          role="button"
          tabIndex="0"
        >
          <img src={note.imgURL} alt="i" className={classes.image} />
          <div className={classes.description}>{description}</div>
        </div>
        <div className={classes.footer}>
          <div className={classes.author}>
            <Avatar className={classes.avatar} data-testid="avatar">
              {author.displayName.charAt(0)}
            </Avatar>
            <span>{author.displayName}</span>
          </div>
          <Tooltip title={pickersString} arrow>
            <div className={classes.pickers}>
              <div style={{ marginRight: '10px' }} data-testid="pickers">
                {pickers.length}
              </div>
              <AddCircleOutlineIcon
                style={{
                  cursor: 'pointer',
                  color: isPicked(note)
                    ? theme.palette.text.secondary
                    : theme.palette.secondary.main
                }}
                onClick={handlePickNote}
              />
            </div>
          </Tooltip>
        </div>
      </Grid>
    )
  )
}

function mapStateToProps(state) {
  const currentUser = getCurrentUser(state)
  return { currentUser }
}

export default connect(mapStateToProps, null)(Note)
