const {
  REACT_APP_PLATFORM_APP
} = process.env


const definePlatformAppUrl = (
  decryptedMultiscanQRSecret: string,
  multiscanQREncCode: string
) => {
  return `${REACT_APP_PLATFORM_APP as string}/verify/${decryptedMultiscanQRSecret}/${multiscanQREncCode}`
}

export default definePlatformAppUrl
