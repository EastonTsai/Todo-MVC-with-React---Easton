import axios from "axios";

const baseUrl = 'https://todo-list.alphacamp.io/api/auth'
//註冊: register 登入: login 確認權限: test-token

export async function login ({ username, password }){
  const post = { username, password }
  try{
    const respones = await axios.post(`${baseUrl}/login`, post)
    if (respones.data.authToken){
      return {
        success: true,
        ...respones.data
      }
    }
    return respones.data.message
  }
  catch(error){
    console.error('login post is failed', error)
  }
}

export async function singup ({ username, email, password }){
  const post = { username, email, password }
  try{
    const { data } = await axios.post(`${baseUrl}/register`, post)
    if ( data.authToken){
      return({
        success: true
      })
    }
    return data.message
  }
  catch(error){
    console.error('singup post is failed', error)
  }
}