import TodoItem from './TodoItem';

const TodoCollection = ({userTodos, onChecked, onDelete, onEdit, onChangeItem}) => {
  return (
    <div>
      TodoCollection
      {userTodos.map(ud => { //用 userTodos 產生每一筆 Item
        return( 
        <TodoItem 
          key={ud.id}
          userTodo={ud}
          onChecked={onChecked}
          onDelete={onDelete}
          onEdit={onEdit}
          onChangeItem={onChangeItem}
        />)
      })}
    </div>
  );
};

export default TodoCollection;
