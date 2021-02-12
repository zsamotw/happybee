import React from 'react'
import { useTranslation } from 'react-i18next'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Divider from '@material-ui/core/Divider'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Slide from '@material-ui/core/Slide'

const useStyles = makeStyles(theme => ({
  dialogBar: {
    position: 'relative',
    marginBottom: theme.spacing(3)
  },
  dialogTitle: {
    marginLeft: theme.spacing(2),
    flex: 1
  },
  dialogDivider: {
    margin: '1rem 0'
  },
  dialogActions: {
    display: 'flex',
    justifyContent: 'flex-start'
  }
}))

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function Dialogs(props) {
  const theme = useTheme()
  const classes = useStyles(theme)

  const { t } = useTranslation('common')

  const {
    isDeleteDialogOpened,
    closeDeleteDialog,
    isConfirmDialogOpened,
    closeConfirmDialog,
    deleteNote,
    pickNote,
    note
  } = props
  const { title, description, author, imgURL } = note

  return (
    <>
      <Dialog open={isDeleteDialogOpened} onClose={closeDeleteDialog}>
        <DialogTitle>{t('note.dialogs.delete.title')}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t('note.dialogs.delete.description')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} color="primary">
            {t('note.dialogs.delete.cancelButton')}
          </Button>
          <Button
            onClick={deleteNote}
            color="secondary"
            autoFocus
            data-testid="buttonToDelete"
          >
            {t('note.dialogs.delete.deleteButton')}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        fullScreen
        open={isConfirmDialogOpened}
        onClose={closeConfirmDialog}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.dialogBar}>
          <Toolbar>
            <Typography variant="h6" className={classes.dialogTitle}>
              {t('note.dialogs.take.title')}
            </Typography>
          </Toolbar>
        </AppBar>
        <DialogActions
          style={{ justifyContent: 'flex-start', padding: '1rem 1.6rem' }}
        >
          <Button
            variant="outlined"
            size="large"
            onClick={pickNote}
            data-testid="buttonToConfirm"
            autoFocus
          >
            {t('note.dialogs.take.takeButton')}
          </Button>
          <Button onClick={closeConfirmDialog} color="primary">
            {t('note.dialogs.take.cancelButton')}
          </Button>
        </DialogActions>
        <DialogContent className={classes.dialogContent}>
          <img src={imgURL} alt="note" height="400px" />
          <h1>{title}</h1>
          <div>{description}</div>
          <Divider className={classes.dialogDivider} />
          <div style={{ textTransform: 'uppercase' }}>
            {t('note.dialogs.take.from')}:
          </div>
          <div>{author && author.displayName ? author.displayName : ''}</div>
          <div>{author && author.email ? author.email : ''}</div>
        </DialogContent>
      </Dialog>
    </>
  )
}
