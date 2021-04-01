import React from 'react'
import { cleanup, fireEvent, screen } from '@testing-library/react'
import { render } from '../../../services/test-service'
import CreateNote from './index'

describe('Test Create Note component', () => {
  afterEach(cleanup)

  it('should render all controls', () => {
    const { getByPlaceholderText, getByLabelText, getByTestId } = render(
      <CreateNote />
    )
    const titleInput = getByPlaceholderText(
      'notes.createNote.inputs.title.placeholder'
    )
    const descriptionInput = getByPlaceholderText(
      'notes.createNote.inputs.description.placeholder'
    )
    const categorySelect = getByLabelText(
      'notes.createNote.inputs.category.label'
    )
    const fileUploadIcon = getByTestId('file-upload-button')

    expect(titleInput).toBeInTheDocument()
    expect(descriptionInput).toBeInTheDocument()
    expect(categorySelect).toBeInTheDocument()
    expect(fileUploadIcon).toBeInTheDocument()
  })

  it('should not handle createNote function when form is not filled', async () => {
    const createNoteMock = jest.fn()
    render(<CreateNote createNote={createNoteMock} />)
    fireEvent.click(screen.getByText('notes.createNote.buttons.submit'))
    expect(createNoteMock).not.toHaveBeenCalled()
  })
})
