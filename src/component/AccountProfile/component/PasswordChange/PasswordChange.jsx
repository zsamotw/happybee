import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { useForm } from 'react-hook-form'
import { makeStyles } from '@material-ui/core'
import ButtonWithProgress from '../../../../shared/component/ButtonWithProgress'
import HBTextField from '../../../../shared/component/HBTextField'
import { changeUserPasswordRequest } from '../../action/accountProfileActions'
import { selectCurrentUser, selectIsAsyncRequest } from '../../../../shared/selector/appSelectors'

const useStyles = makeStyles({
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  errorBar: {
    color: 'red'
  }
})

const PasswordChangeForm = props => {
  const { changePassword, isUpdatingPassword, email } = props

  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const { t } = useTranslation('common')

  const { register, handleSubmit, errors, getValues } = useForm({
    defaultValues: { passwordOld: '', passwordOne: '', passwordTwo: '' }
  })

  const classes = useStyles()

  useEffect(() => {
    setIsLoading(isUpdatingPassword)
  }, [isUpdatingPassword])

  const passwordOldInputProps = {
    id: 'passwordOld-input',
    label: t('account.passwordChange.inputs.passwordOld.label'),
    variant: 'outlined',
    name: 'passwordOld',
    type: 'password',
    placeholder: t('account.passwordChange.inputs.passwordOld.placeholder'),
    register: register({
      required: t('account.passwordChange.inputs.error.required'),
      minLength: {
        value: 6,
        message: t('account.passwordChange.inputs.error.invalid')
      }
    }),
    error: errors.passwordOld,
    fullWidth: true
  }

  const passwordOneInputProps = {
    id: 'passwordOne-input',
    label: t('account.passwordChange.inputs.passwordOne.label'),
    variant: 'outlined',
    name: 'passwordOne',
    type: 'password',
    placeholder: t('account.passwordChange.inputs.passwordOne.placeholder'),
    register: register({
      required: t('account.passwordChange.inputs.error.required'),
      minLength: {
        value: 6,
        message: t('account.passwordChange.inputs.error.invalid')
      }
    }),
    error: errors.passwordOne,
    fullWidth: true
  }

  const passwordTwoInputProps = {
    id: 'passwordTwo-input',
    label: t('account.passwordChange.inputs.passwordTwo.label'),
    variant: 'outlined',
    name: 'passwordTwo',
    type: 'password',
    placeholder: t('account.passwordChange.inputs.passwordTwo.placeholder'),
    register: register({
      required: t('account.passwordChange.inputs.error.required'),
      minLength: {
        value: 6,
        message: t('account.passwordChange.inputs.error.invalid')
      },
      validate: value =>
        value === getValues('passwordOne') ||
        t('account.passwordChange.inputs.error.incorrect')
    }),
    error: errors.passwordTwo,
    fullWidth: true
  }

  const onSubmit = data => {
    const { passwordOld, passwordOne } = data
    const messageOnSuccess = t(
      'account.passwordChange.messageOnPasswordChangeSuccess'
    )
    const messageOnError = t(
      'account.passwordChange.messageOnPasswordChangeError'
    )
    changePassword({
      email,
      passwordOld,
      passwordOne,
      setError,
      messageOnSuccess,
      messageOnError
    })
  }

  return (
    <section>
      <h3>{t('account.passwordChange.title')}</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        {HBTextField(passwordOldInputProps)}
        {HBTextField(passwordOneInputProps)}
        {HBTextField(passwordTwoInputProps)}
        <ButtonWithProgress
          variant="contained"
          color="primary"
          type="submit"
          text={t('account.passwordChange.button')}
          isLoading={isLoading}
        />

        <div className={classes.errorBar}>
          {error && <p>{t('account.passwordChange.formError')}</p>}
        </div>
      </form>
    </section>
  )
}

function mapStateToProps(state) {
  const { isUpdatingPassword } = selectIsAsyncRequest(state)
  const { email } = selectCurrentUser(state)
  return { isUpdatingPassword, email }
}

function mapDispatchToState(dispatch) {
  return {
    changePassword: passwordData =>
      dispatch(changeUserPasswordRequest(passwordData))
  }
}

export default connect(mapStateToProps, mapDispatchToState)(PasswordChangeForm)
