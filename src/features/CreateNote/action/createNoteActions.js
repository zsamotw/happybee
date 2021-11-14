import { createAction } from '@reduxjs/toolkit'

export const createNoteRequest = createAction(
  'Notes/Create note request',
  noteData => ({
    payload: { ...noteData }
  })
)

export const updateNoteRequest = createAction(
  'Notes/Update note request',
  noteData => ({
    payload: { ...noteData }
  })
)
