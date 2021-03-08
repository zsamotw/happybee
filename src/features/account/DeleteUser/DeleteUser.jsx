import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core'
import { useForm } from 'react-hook-form'
import ButtonWithProgress from '../../../components/ButtonWithProgress'
import { getCurrentUser, getIsAsyncRequest } from '../../../store/selectors'
import { DELETE_USER_REQUEST } from '../../../store/actions/async-actions'
import AppInput from '../../../components/AppInput'

const useStyles = makeStyles({
  errorBar: {
    color: 'red'
  }
})

const DeleteUserFormBase = props => {
  const { isFetchingLoginData, deleteUser, currentUser } = props

  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const { t } = useTranslation('common')

  const { register, handleSubmit, errors } = useForm({
    defaultValues: { email: '' }
  })

  const classes = useStyles()

  useEffect(() => {
    setIsLoading(isFetchingLoginData)
  }, [isFetchingLoginData])

  const onSubmit = data => {
    const { email } = data
    if (email === currentUser.email) {
      const messageOnSuccess = t(
        'account.deleteUser.messageOnUserDeleteSuccess'
      )
      const messageOnError = t('account.deleteUser.messageOnUserDeleteError')
      deleteUser({ setError, messageOnSuccess, messageOnError })
    } else {
      setError({ message: t('account.deleteUser.submissionError') })
    }
  }

  const emailInputProps = {
    id: 'email-input',
    label: t('account.deleteUser.inputs.email.label'),
    variant: 'outlined',
    name: 'email',
    type: 'text',
    placeholder: t('account.deleteUser.inputs.email.placeholder'),
    register: register({
      required: t('account.deleteUser.inputs.email.error.required'),
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        message: t('account.deleteUser.inputs.email.error.invalid')
      }
    }),
    error: errors.email,
    fullWidth: true
  }

  return (
    <section>
      <h3>{t('account.deleteUser.title')}</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        {AppInput(emailInputProps)}
        <ButtonWithProgress
          variant="contained"
          color="primary"
          type="submit"
          isLoading={isLoading}
          text={t('account.deleteUser.button')}
        />
        <div className={classes.errorBar}>
          {error && <p>{t('account.deleteUser.formError')}</p>}
        </div>
      </form>
    </section>
  )
}

function mapStateToProps(state) {
  const { isFetchingLoginData } = getIsAsyncRequest(state)
  const currentUser = getCurrentUser(state)
  return { isFetchingLoginData, currentUser }
}

function mapDispatchToState(dispatch) {
  return {
    deleteUser: deleteUserData => dispatch(DELETE_USER_REQUEST(deleteUserData))
  }
}

const DeleteUserForm = connect(
  mapStateToProps,
  mapDispatchToState
)(DeleteUserFormBase)

export default DeleteUserForm
