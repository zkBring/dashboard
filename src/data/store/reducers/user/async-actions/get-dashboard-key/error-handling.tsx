export const ERROR_DASHBOARD_KEY_REJECTED_CREATE = 'ERROR_DASHBOARD_KEY_REJECTED_CREATE'
export const ERROR_DASHBOARD_KEY_REJECTED_RETRIEVE = 'ERROR_DASHBOARD_KEY_REJECTED_RETRIEVE'

const errors: Record<string, string> = {
  [ERROR_DASHBOARD_KEY_REJECTED_CREATE]: 'Rejected to create Dashboard key',
  [ERROR_DASHBOARD_KEY_REJECTED_RETRIEVE]: 'Rejected to retrieve Dashboard key',
  DEFAULT: 'Dashboard key retrieve was declined. Check console for more info'
}

export const defineError = (err: Error) => {
  console.log({ err })
  if (!err.message) {
    return errors.DEFAULT
  }
  const errorText = errors[err.message]
  if (errorText) {
    return errorText
  }
  return errors.DEFAULT
}