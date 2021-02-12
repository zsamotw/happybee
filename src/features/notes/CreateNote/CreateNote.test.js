import React from 'react'
import { cleanup } from '@testing-library/react'
import { render } from '../../../services/test-service'
import CreateNote from './index'

describe('Test Create Note component', () => {
  afterEach(cleanup)

  it('should render all controls', () => {
    const { getByPlaceholderText, getByLabelText, getByTestId } = render(
      <CreateNote />
    )
    const titleInput = getByPlaceholderText(
      'createNote.inputs.title.placeholder'
    )
    const descriptionInput = getByPlaceholderText(
      'createNote.inputs.description.placeholder'
    )
    const categorySelect = getByLabelText('createNote.inputs.category.label')
    const fileUploadIcon = getByTestId('file-upload-button')

    expect(titleInput).toBeInTheDocument()
    expect(descriptionInput).toBeInTheDocument()
    expect(categorySelect).toBeInTheDocument()
    expect(fileUploadIcon).toBeInTheDocument()
  })

  it('should not handle createNote function when form is not filled', () => {
    const createNoteMock = jest.fn()
    render(<CreateNote createNote={createNoteMock} />)

    expect(createNoteMock).not.toHaveBeenCalled()
  })
})
