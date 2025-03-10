const {
  REACT_APP_PLATFORM_APP_URL
} = process.env


const definePlatformAppUrl = (
  decryptedMultiscanQRSecret: string,
  multiscanQREncCode: string
) => {
  return `${REACT_APP_PLATFORM_APP_URL as string}/verify/${decryptedMultiscanQRSecret}/${multiscanQREncCode}`
}

export default definePlatformAppUrl
