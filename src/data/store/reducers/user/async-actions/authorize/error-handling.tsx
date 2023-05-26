export const ERROR_DASHBOARD_AUTH_REJECTED = 'Rejected to sign message for authorization'

const errors: Record<string, string> = {
  [ERROR_DASHBOARD_AUTH_REJECTED]: 'Rejected to sign message',
  DEFAULT: 'Dashboard key retrieve was declined. Check console for more info'
}

export const defineError = (err: Error) => {
  if (!err.message) {
    return errors.DEFAULT
  }
  const errorText = errors[err.message]
  if (errorText) {
    return errorText
  }
  return errors.DEFAULT
}