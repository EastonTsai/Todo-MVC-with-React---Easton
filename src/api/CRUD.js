import axios from 'axios'

const baseUrl = "http://localhost:3001"

export const getTodos = async () => {
  try{
    const res = await axios.get(`${baseUrl}/todos`)
    return res.data
  }
  catch(error){console.error('getTodos is failed: ', error)}
}

export const createTodo = async (payload) => {
  const { title, isDone } = payload
  const newTodo = { title, isDone }
  try{
    await axios.post(`${baseUrl}/todos`, newTodo)
  }
  catch(error){console.error('createTodo is failed: ', error)}
}
export const patchTodo = async (payload) => {
  const { id, title, isDone } = payload
  const todo = { title, isDone }
  try{
    await axios.patch(`${baseUrl}/todos/${id}`, todo)
  }
  catch(error){console.error('patchTodo is failed: ', error)}
}
export const deleteTodo = async (id) => {
  try{
    await axios.delete(`${baseUrl}/todos/${id}`)
  }
  catch(error){console.error('deleteTodo is failed: ', error)}
}
