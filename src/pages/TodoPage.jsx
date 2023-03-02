import { Footer, Header, TodoCollection, TodoInput } from 'components';
import { useState, useEffect } from 'react'
import { getTodos, createTodo, patchTodo, deleteTodo } from '../api/CRUD'



const TodoPage = () => {
  const [userTodos, setUserTodos] = useState([]) //記錄 rserDtat 因為有資料才會顯示 item
  const [inputValue, setInputValue] = useState('') //記錄 input 的值 , 主要解決 input 欄有值才出現 '新增' 按鍵

  //進到網頁裡完成第一次渲染後使用 getTodos 的 API 取得資料庫的 todos 
  //'只觸發一次' 因為依賴一個空陣列 , 所以第一次渲染完就不會再被之後的渲染觸發
  useEffect( () => {
    async function getTodosAsync (){
      try{
        const todos = await getTodos()
      setUserTodos( todos.map( (todo) => {
        return { ...todo, isEdit: false}
      }))
      }
      catch(error){console.error(error)}
  }
  getTodosAsync()
},[])

  //新增到資料庫 , 再從資料庫抓取新的資料存到 userTodos
  async function handleAddTodo (){
    await createTodo({title: inputValue})
    setUserTodos(await getTodos())
    setInputValue('')
  }
  //判斷 ? Enter 鍵 , 而且 inputValue 不是空的 , 就新增 todo
  function handleKeyEnter (e){
    if(e.key === 'Enter' && inputValue.trim() !== ''){
      handleAddTodo()
    }
  }
  //接收 id, isDone 參數 , 使用 patchTodo() 修改資料庫的資料 , 再 get 新的資料回來
  async function handleChecked (id, isDone){
    await patchTodo({id: id, isDone: !isDone})
    setUserTodos( await getTodos())
  }
  //拿到 id 使用 deleteTodo 刪除資料庫的資料 , 再 get 新的資料存到 userTodos
  async function handleDelete (id){
    await deleteTodo(id)
    setUserTodos( await getTodos())
  }
  function handleEdit (id){
    setUserTodos(
      userTodos.map(ud => {
        if(ud.id === id && !ud.isDone){
          ud.isEdit= !ud.isEdit
          return ud
        }
        ud.isEdit= false
        return ud
      })
    )
  }
  async function handleEditEnter (editInput, id){
    await patchTodo({id: id, title: editInput})
    setUserTodos(await getTodos())
  }
  return (
    <div>
      TodoPage
      <Header />
      <TodoInput 
        inputValue={inputValue}  //state 的 value 傳進去
        onInputValueChange={ (e) => {setInputValue(e.target.value)}}  //接收事件的 value 存到 setInputValue
        onKeyEnter={handleKeyEnter} //監聽 Enter 鍵
        onInputAddClick={ () => { handleAddTodo() }} //監聽 input 新增按鍵
      />
      <TodoCollection 
        userTodos= {userTodos}
        onChecked={handleChecked}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onChangeItem={handleEditEnter}
      />
      <Footer 
        userTodos={userTodos}
      />
    </div>
  );
};

export default TodoPage;
