import axios from 'axios'

const baseURL = 'https://api.api-ninjas.com/v1'
const API_KEY = `${process.env.REACT_APP_API_KEY}`

const api = axios.create({
  baseURL,
  headers: { 'X-Api-Key': API_KEY },
})

export const fetchData = async (ip: string) => {
  try {
    const response = await api.get('/iplookup', {
      params: {
        address: ip,
      },
    })

    return response.data
  } catch (error: any) {
    if (error.response) {
      console.log(error.response.data)
      console.log(error.response.status)
      console.log(error.response.headers)
    } else if (error.request) {
      console.log(error.request)
    } else {
      console.log('Error', error.message)
    }
    console.log(error.config)
  }
}

export const postData = async (image: File) => {
  try {
    const formData = new FormData()
    formData.append('image', image)
    const response = await api.post('/imagetotext', formData)
    return response.data
  } catch (error: any) {
    if (error.response) {
      console.log(error.response.data)
      console.log(error.response.status)
      console.log(error.response.headers)
    } else if (error.request) {
      console.log(error.request)
    } else {
      console.log('Error', error.message)
    }
    console.log(error.config)
  }
}
