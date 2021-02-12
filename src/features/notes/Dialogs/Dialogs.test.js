import React from 'react'
import { fireEvent, cleanup } from '@testing-library/react'
import { render, currentUser } from '../../../services/test-service'
import Dialogs from './Dialogs'

const donorItem = {
  id: 'KlYH2A8gw3SFcjpqOxcY',
  title: 'rower',
  imgStoragePath: '',
  donor: currentUser,
  description: 'fajny',
  category: {
    id: 2,
    label: 'Motors'
  },
  createdAt:
    'Tue Dec 01 2020 14:28:20 GMT+0100 (Central European Standard Time)',
  imgURL: ''
}

describe('Test Dialog component', () => {
  afterEach(cleanup)
  it('should handle delete method when delete button has been clicked', () => {
    const handleDeleteItem = jest.fn()
    const { getByTestId } = render(
      <Dialogs
        item={donorItem}
        handleDeleteItem={handleDeleteItem}
        openDeleteDialog
        openConfirmDialog={false}
      />
    )

    const buttonToDelete = getByTestId('buttonToDelete')
    expect(buttonToDelete).toBeInTheDocument()
    fireEvent.click(buttonToDelete)

    expect(handleDeleteItem).toHaveBeenCalled()
  })

  it('should handle set recipient method when confirmation button has been clicked', () => {
    const handleSetRecipient = jest.fn()
    const { getByTestId } = render(
      <Dialogs
        item={donorItem}
        handleSetRecipient={handleSetRecipient}
        openConfirmDialog
        openDeleteDialog={false}
      />
    )

    const buttonToConfirm = getByTestId('buttonToConfirm')
    expect(buttonToConfirm).toBeInTheDocument()
    fireEvent.click(buttonToConfirm)

    expect(handleSetRecipient).toHaveBeenCalled()
  })
})
