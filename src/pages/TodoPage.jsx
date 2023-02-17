import { Footer, Header, TodoCollection, TodoInput } from 'components';
import { useState } from 'react'
const dummyTodos = [
  {
    title: 'Learn react-router',
    isDone: true,
    id: 1,
  },
  {
    title: 'Learn to create custom hooks',
    isDone: false,
    id: 2,
  },
  {
    title: 'Learn to use context',
    isDone: true,
    id: 3,
  },
  {
    title: 'Learn to implement auth',
    isDone: false,
    id: 4,
  },
];

const TodoPage = () => {
  const newDt = dummyTodos.map(dt => { //先把所有傳進來的資料加上 isEdit: false
    return {
      ...dt,
      isEdit: false,
    }
  })
  const [userData, setUserData] = useState(newDt) //記錄 rserDtat 因為有資料才會顯示 item
  const [inputValue, setInputValue] = useState('') //記錄 input 的值 , 主要解決 input 欄有值才出現 '新增' 按鍵

  function handlePageClick (){ //點擊 <div> 的範圍內清除編輯模式
    if(userData.find(ud => ud.isEdit === true)){
      setUserData(userData.map(ud => {
        ud.isEdit = false
        return ud
      }))
    }
  }
  function addItem (){//新增 item 項目
    setUserData(
        [
          ...userData,
          {
            title: inputValue,
            isDone: false,
            id: userData[userData.length -1].id + 1,
            isEdit: false,
          }
        ]
      )
    setInputValue('')
  }

  function handleInputValue (e){//處理 input 的值
    setInputValue(e.target.value)
  }
  function handleKeyEnter (e){//處理 Enter 事件
    if(e.key === 'Enter' && inputValue.trim() !== ''){
      addItem()
    }
  }
  function handleInputClick(){//處理 input 的 '新增' 按鍵
    addItem()
  }

  function handleChecked (id){//
    setUserData(
      userData.map( ud => {
      if(ud.id === id){
        ud.isDone= !ud.isDone
        return ud
      }
      return ud
    })
    )
  }
  function handleDelete (id){
    setUserData(
      userData.filter(ud => {
      if(ud.id !== id){
        return ud
      }
    })
    )
  }
  function handleEdit (id){
    setUserData(
      userData.map(ud => {
        if(ud.id === id && !ud.isDone){
          ud.isEdit= !ud.isEdit
          return ud
        }
        ud.isEdit= false
        return ud
      })
    )
  }
  function handleChangeItem (editInput, id){
    setUserData(
      userData.map(ud => {
        if(ud.id === id){
          ud.title = editInput
          ud.isEdit = false
          return ud
        }
        return ud
      })
    )
  }
  return (
    <div onClick={handlePageClick}>
      TodoPage
      <Header />
      <TodoInput 
        inputValue={inputValue}  //state 的 value 傳進去
        onInputValueChange={handleInputValue}  //監聽 input 改變
        onKeyEnter={handleKeyEnter} //監聽 Enter 鍵
        onInputAddClick={handleInputClick} //監聽 input 新增按鍵
      />
      <TodoCollection 
        userData= {userData}
        onChecked={handleChecked}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onChangeItem={handleChangeItem}
      />
      <Footer 
        userData={userData}
      />
    </div>
  );
};

export default TodoPage;
