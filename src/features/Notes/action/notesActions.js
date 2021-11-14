import { createAction } from '@reduxjs/toolkit'

export const getNoteRequest = createAction(
  'Notes/Get selected note request',
  noteData => ({ payload: { ...noteData } })
)

export const syncNoteRequest = createAction(
  'Notes/Sync note request',
  noteData => ({
    payload: { ...noteData }
  })
)

export const syncNotesRequest = createAction(
  'Notes/Sync notes request',
  messageOnError => ({ payload: { messageOnError } })
)

export const deleteNoteRequest = createAction(
  'Notes/Delete note request',
  deleteNoteData => ({ payload: { ...deleteNoteData } })
)

export const togglePickNoteRequest = createAction(
  'Notes/Toggle pick note request',
  noteData => ({ payload: { ...noteData } })
)

export const syncUserNotesRequest = createAction(
  'Notes/Get user notes request',
  notesData => ({ payload: { ...notesData } })
)

export const setNoteQueryFilterRequest = createAction(
  'Notes/Set note query filter request',
  query => ({ payload: query })
)

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
