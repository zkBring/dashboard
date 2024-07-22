import { action } from 'typesafe-actions'
import { Constants } from './constants'
import { TCampaign, TDispenser } from 'types'

export function addDispenser(dispenser: TDispenser) {
  return action(Constants.DISPENSERS_ADD_NEW_DISPENSER, dispenser)
}

export function setDispensers(dispensers: TDispenser[]) {
  return action(Constants.DISPENSERS_SET_DISPENSERS, dispensers)
}

export function setLoading(loading: boolean) {
  return action(Constants.DISPENSERS_SET_LOADING, loading)
}

export function setMappingLoader(mappingLoader: number) {
  return action(Constants.DISPENSERS_SET_MAPPING_LOADER, { mappingLoader })
}

export function setCurrentDispenserData(dispenserData: { campaign: TCampaign | null }) {
  return action(Constants.DISPENSERS_SET_CURRENT_DISPENSER_DATA, { currentDispenserData: dispenserData })
}