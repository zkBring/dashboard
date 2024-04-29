import axios, { AxiosResponse } from 'axios'
import { TCountry } from 'types'
const COUNTRIES_SOURCE = 'https://raw.githubusercontent.com/LinkdropHQ/countries'

type TGetCountriesResponse = TCountry[]

type TGetCountries = () => Promise<AxiosResponse<TGetCountriesResponse>>

const countriesApi = axios.create({
  baseURL: COUNTRIES_SOURCE
})

const requests: {
  get: TGetCountries
} = {
  get: () => {
    return countriesApi.get('/main/data.json')
  }
}

export default requests
