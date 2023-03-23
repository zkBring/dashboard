import isIos from 'is-ios'
import isAndroid from 'is-android'
import { TSystem } from 'types'

type TDefineSystem = () => TSystem

const defineSystem: TDefineSystem = () => {
  if (isIos) {
    return 'ios'
  } else if (isAndroid) {
    return 'android'
  } else {
    return 'desktop'
  }
}

export default defineSystem