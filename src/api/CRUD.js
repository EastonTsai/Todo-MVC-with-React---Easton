import axios from 'axios'

const baseUrl = "https://todo-list.alphacamp.io/api"
//試作一個如果沒有使用 axiosInstance 的話 , 要讓 get 帶上什麼資料
// const getToken = () => {
//   const token = localStorage.getItem('authToken')
//     const obj = {
//       headers:{
//         Authorization: 'Bearer ' + token
//       }
//     }
//   return obj
// }
const axiosInstance = axios.create()

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken')
    if(token) {
      config.headers['Authorization'] = 'Bearer ' + token
    }
    return config
  },
  (error) => { console.log(error)}
)

export const getTodos = async () => {
  try{
    const res = await axiosInstance.get(`${baseUrl}/todos`)
    return res.data.data
  }
  catch(error){console.error('getTodos is failed: ', error)}
}

export const createTodo = async (payload) => {
  const newTodo = { title: payload, isDone: '' }
  try{
    await axiosInstance.post(`${baseUrl}/todos`, newTodo)
  }
  catch(error){console.error('createTodo is failed: ', error)}
}

export const patchTodo = async (payload) => {
  const { id, title, isDone } = payload
  const todo = { title, isDone }
  try{
    await axiosInstance.patch(`${baseUrl}/todos/${id}`, todo)
  }
  catch(error){console.error('patchTodo is failed: ', error)}
}

export const deleteTodo = async (id) => {
  try{
    await axiosInstance.delete(`${baseUrl}/todos/${id}`)
  }
  catch(error){console.error('deleteTodo is failed: ', error)}
}
