import React from 'react'
import { fireEvent, cleanup } from '@testing-library/react'
import { render } from '../../../services/test-service'
import Dialogs from './Dialogs'

describe('Test Dialog component', () => {
  afterEach(cleanup)
  it('should handle delete note method when delete button has been clicked', () => {
    const handleDeleteNote = jest.fn()
    const { getByTestId } = render(
      <Dialogs deleteNote={handleDeleteNote} isDeleteDialogOpened />
    )

    const deleteButton = getByTestId('deleteNoteButton')
    expect(deleteButton).toBeInTheDocument()
    fireEvent.click(deleteButton)
    expect(handleDeleteNote).toHaveBeenCalled()
  })

  it('should handle close dialog method when close button has been clicked', () => {
    const handleCloseDialog = jest.fn()
    const { getByTestId } = render(
      <Dialogs closeDeleteDialog={handleCloseDialog} isDeleteDialogOpened />
    )

    const closeButton = getByTestId('closeDialogButton')
    expect(closeButton).toBeInTheDocument()
    fireEvent.click(closeButton)
    expect(handleCloseDialog).toHaveBeenCalled()
  })
})
