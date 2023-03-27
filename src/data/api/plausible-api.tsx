import axios, { Method } from 'axios'

type TEventData = {
  eventName: string
  data: {
    [dataTitle: string]: string
  }
}

type TInvokeEvent = (eventData: TEventData) => void

const invokeEvent: TInvokeEvent = ({
  eventName, data
}) => {
  return axios.post('https://plausible.io/api/event', {
    headers: {
      'User-Agent': navigator.userAgent,
      // 'X-Forwarded-For': '127.0.0.1',
      'Content-Type': 'application/json'
    },
    data: {
      name: eventName,
      props: data
    }
  })
  .then(response => {
    console.log(response.data)
  })
  .catch(error => {
    console.error(error)
  })
}


export default {
  invokeEvent
}