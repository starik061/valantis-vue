import axios from 'axios'

const PIXABAY_URL = 'https://pixabay.com/api/'

export async function getProductImages(imageQuantity, page) {
  let response = await axios(
    `${PIXABAY_URL}?key=${import.meta.env.VITE_PIXABY_KEY}&q=
jewelry&image_type=photo&orientation=horizontal&page=${page}&per_page=${imageQuantity}`
  )

  return response.data.hits
}
