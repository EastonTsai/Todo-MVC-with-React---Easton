import TodoItem from './TodoItem';

const TodoCollection = ({userData, onChecked, onDelete, onEdit, onChangeItem}) => {
  return (
    <div>
      TodoCollection
      {userData.map(ud => { //用 userData 產生每一筆 Item
        return( 
        <TodoItem 
          key={ud.id}
          userData={ud}
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
