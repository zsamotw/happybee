import React from 'react'
import { useTranslation } from 'react-i18next'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

export default function Dialogs(props) {
  const { t } = useTranslation('common')

  const { isDeleteDialogOpened, closeDeleteDialog, deleteNote } = props

  return (
    <>
      <Dialog open={isDeleteDialogOpened} onClose={closeDeleteDialog}>
        <DialogTitle>{t('notes.dialogs.delete.title')}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t('notes.dialogs.delete.description')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} color="primary">
            {t('notes.dialogs.delete.cancelButton')}
          </Button>
          <Button
            onClick={deleteNote}
            color="secondary"
            autoFocus
            data-testid="buttonToDelete"
          >
            {t('notes.dialogs.delete.deleteButton')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
