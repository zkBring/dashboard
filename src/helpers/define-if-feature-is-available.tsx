import { addressSpecificOptions } from 'configs/address-specific-options'
import { TFeatureName } from 'types'

const defineIfFeatureIsAvailable = (address: string, featureName: TFeatureName) => {
  const addressFormatted = address.toLowerCase()
  const configForAddress = addressSpecificOptions[addressFormatted]
  if (!configForAddress || !configForAddress.betaFeaturesAvailable) {
    return
  }
  return configForAddress.betaFeaturesAvailable.includes(featureName)
}

export default defineIfFeatureIsAvailable
