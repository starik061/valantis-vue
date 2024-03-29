import axios from 'axios'
import md5 from 'md5'

function createAuthHeader() {
  // Формируем таймштамп в формате "ггггммдд"
  const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '')

  // Формируем строку для хеширования
  const authString = `${import.meta.env.VITE_VALANTIS_PASSWORD}_${timestamp}`

  // Хешируем строку с помощью MD5
  const authHeader = md5(authString)

  return {
    'X-Auth': authHeader
  }
}

//!dataType:  get_ids
//!           get_items
//!           get_fields
//!           filter

export async function getProductData(dataType, params = {}) {
  const headers = createAuthHeader()

  const requestBody = {
    action: dataType,
    params: params
  }

  let response = await axios.post(import.meta.env.VITE_VALANTIS_API_URL, requestBody, { headers })

  return response.data.result
}
