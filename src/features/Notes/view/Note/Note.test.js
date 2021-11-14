import React from 'react'
import { cleanup } from '@testing-library/react'
import { render, currentUser } from '../../../../services/test-service'
import Note from './index'

describe('Note features tests', () => {
  const note = {
    id: 'qTcmxVFQT9UvDxFA2SnY',
    imgStoragePath: 'images/2021-1/1613768382426/20200804_wiech_131.png',
    author: {
      displayName: 'anna',
      uid: 'jdT0qtcMxiOYzFg5cjrGPWKUqUL2',
      photoURL: null,
      email: 'a@a.com'
    },
    category: {
      label: 'Przeczytane',
      slug: 'read',
      id: 3
    },
    imgURL:
      'https://firebasestorage.googleapis.com/v0/b/happybee-a6205.appspot.com/o/images%2F2021-1%2F1613768382426%2F20200804_wiech_131.png?alt=media&token=e19e214f-63cd-4e9b-9c70-490f3dbcf1d4',
    createdAt:
      'Fri Feb 19 2021 21:59:42 GMT+0100 (Central European Standard Time)',
    description: 'jfksjdl',
    pickers: [
      {
        displayName: 'anna',
        pickAt:
          'Sun Feb 28 2021 14:51:52 GMT+0100 (Central European Standard Time)',
        uid: 'jdT0qtcMxiOYzFg5cjrGPWKUqUL2',
        photoURL: null,
        email: 'a@a.com'
      }
    ],
    title: 'hallo'
  }

  afterEach(cleanup)

  it('Should render Note features with proper item data', () => {
    const { getByText } = render(<Note note={note} />)
    const title = new RegExp(note.title)
    const description = new RegExp(note.description)
    const category = new RegExp(note.category.label)
    const donorDisplayName = new RegExp(note.author.displayName)

    expect(getByText(title)).toBeInTheDocument()
    expect(getByText(description)).toBeInTheDocument()
    expect(getByText(category)).toBeInTheDocument()
    expect(getByText(donorDisplayName)).toBeInTheDocument()
  })

  it('should render delete icon when author is current user', () => {
    const currentUserNote = { ...note, author: currentUser }
    const { getByTestId } = render(<Note note={currentUserNote} />)
    const icon = getByTestId('delete-icon')
    expect(icon).toBeInTheDocument()
  })

  it('should not render delete icon when author is not current user', () => {
    const { queryByTestId } = render(<Note note={note} />)
    const icon = queryByTestId('delete-icon')
    expect(icon).toEqual(null)
  })

  it('should render number of pickers', () => {
    const { getByTestId } = render(<Note note={note} />)
    const pickers = getByTestId('pickers')
    expect(pickers.textContent).toBe('1')
  })

  it('Should not render Item features with not proper item data: id as null', () => {
    const noteWithIdNull = { ...note, id: null }
    const Wrapper = () => (
      <div>
        <Note note={noteWithIdNull} />
      </div>
    )
    const wrapper = render(<Wrapper />)
    expect(wrapper.queryByText(noteWithIdNull.title)).toBeNull()
  })
})
