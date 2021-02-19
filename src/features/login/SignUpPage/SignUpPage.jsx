import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@material-ui/core'
import { connect } from 'react-redux'
import { useForm } from 'react-hook-form'
import ButtonWithProgress from '../../../components/ButtonWithProgress'
import { getIsAsyncRequest } from '../../../store/selectors'
import { SIGNUP_REQUEST } from '../../../store/actions/async-actions'
import AppInput from '../../../components/AppInput'

const useStyles = makeStyles({
  errorBar: {
    color: 'red'
  }
})

const SignUpFormBase = props => {
  const { isFetchingSignUpData, signUp } = props

  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const { t } = useTranslation('common')

  const { register, handleSubmit, errors, getValues } = useForm({
    defaultValues: {
      displayName: '',
      email: '',
      passwordOne: '',
      passwordTwo: ''
    }
  })

  const classes = useStyles()

  useEffect(() => {
    setIsLoading(isFetchingSignUpData)
  }, [isFetchingSignUpData])

  const onSubmit = data => {
    const { displayName, email, passwordOne: password } = data
    const messageOnError = t('login.signUpPage.messageOnSignUpError')
    signUp({ displayName, email, password, setError, messageOnError })
  }

  const displayNameInputProps = {
    id: 'displayName-input',
    label: t('login.signUpPage.inputs.displayName.label'),
    variant: 'outlined',
    name: 'displayName',
    type: 'text',
    placeholder: t('login.signUpPage.inputs.displayName.placeholder'),
    register: register({
      required: t('login.signUpPage.inputs.displayName.error.required')
    }),
    error: errors.displayName,
    fullWidth: true
  }

  const emailInputProps = {
    id: 'email-input',
    label: t('login.signUpPage.inputs.email.label'),
    variant: 'outlined',
    name: 'email',
    type: 'text',
    placeholder: t('login.signUpPage.inputs.email.placeholder'),
    register: register({
      required: t('login.signUpPage.inputs.email.error.required'),
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        message: t('login.signUpPage.inputs.email.error.invalidPattern')
      }
    }),
    error: errors.email,
    fullWidth: true
  }
  const passwordOneInputProps = {
    id: 'passwordOne-input',
    label: t('login.signUpPage.inputs.passwordOne.label'),
    variant: 'outlined',
    name: 'passwordOne',
    type: 'password',
    placeholder: t('login.signUpPage.inputs.passwordOne.placeholder'),
    register: register({
      required: t('login.signUpPage.inputs.passwordOne.error.required'),
      minLength: {
        value: 6,
        message: t('login.signUpPage.inputs.passwordOne.error.invalid')
      }
    }),
    error: errors.passwordOne,
    fullWidth: true
  }

  const passwordTwoInputProps = {
    id: 'passwordTwo-input',
    label: t('login.signUpPage.inputs.passwordTwo.label'),
    variant: 'outlined',
    name: 'passwordTwo',
    type: 'password',
    placeholder: t('login.signUpPage.inputs.passwordTwo.placeholder'),
    register: register({
      required: t('login.signUpPage.inputs.passwordTwo.error.required'),
      minLength: {
        value: 6,
        message: t('login.signUpPage.inputs.passwordTwo.error.invalid')
      },
      validate: value =>
        value === getValues('passwordOne') ||
        t('login.signUpPage.inputs.passwordTwo.error.incorrect')
    }),
    error: errors.passwordTwo,
    fullWidth: true
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {AppInput(displayNameInputProps)}
      {AppInput(emailInputProps)}
      {AppInput(passwordOneInputProps)}
      {AppInput(passwordTwoInputProps)}
      <ButtonWithProgress
        variant="contained"
        color="primary"
        type="submit"
        size="large"
        isLoading={isLoading}
        text={t('login.signUpPage.button')}
      />
      <div className={classes.errorBar}>
        {error && <p>{t('login.signUpPage.formError')}</p>}
      </div>
    </form>
  )
}

function mapStateToProps(state) {
  const { isFetchingSignUpData } = getIsAsyncRequest(state)
  return { isFetchingSignUpData }
}

function mapDispatchToState(dispatch) {
  return {
    signUp: singUpData => dispatch(SIGNUP_REQUEST(singUpData))
  }
}

const SignUpForm = connect(mapStateToProps, mapDispatchToState)(SignUpFormBase)

export default SignUpForm
