import axios from 'axios'
import { useRouter } from 'vue-router'

export const handleSubmit = async (event) => {
  const fileElm = event.target.querySelector('input[type="file"]')
  const textElm = event.target.querySelector('input[type="text"]')
  const file = fileElm?.files?.[0]
  const text = textElm?.value

  if (!file || !text) {
    alert('請選擇圖片並輸入文字')
    return
  }

  const formData = new FormData()
  formData.append('image', file)
  formData.append('text', text)

  try {
    const res = await axios.post('/api/upload/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    console.log('成功', res.data)
  } catch (err) {
    console.error('失敗', err)
  }
}

// export const goto = (path) => {
//   const router = useRouter()
//   router.push({ name: path })
// }

export function useGoto() {
  const router = useRouter()
  return (path) => {
    router.push({ name: path })
  }
}
