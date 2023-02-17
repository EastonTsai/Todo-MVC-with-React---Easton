import styled from 'styled-components';
import {
  CheckActiveIcon,
  CheckCircleIcon,
  CheckHoverIcon,
} from 'assets/images';
import { clsx } from 'clsx'

const StyledTaskItem = styled.div`
  min-height: 52px;
  display: flex;
  align-items: center;
  position: relative;
  word-wrap: break-word;
  word-break: break-word;
  padding: 0 12px;
  box-shadow: 0 17px 0 -16px #e5e5e5;
  flex-wrap: wrap;

  .task-item-body-input {
    user-select: none;
    display: none;
    flex: 1;
    padding: 8px 0px;
    border: 0;
    outline: 0;
    font-size: 1rem;

    &::placeholder {
      color: var(--gray);
      font-size: 13px;
    }
  }

  &:hover {
    background: #fff3eb;
    box-shadow: inset 0 0 0 1px #fff3eb;

    .task-item-action .btn-destroy {
      display: inline-flex;
    }
  }

  &.done {
    .task-item-body {
      color: var(--gray);
      text-decoration: line-through;
    }

    .icon-checked {
      background-image: url(${CheckActiveIcon});
    }
  }

  &.edit {
    .task-item-body-input {
      display: block;
    }
    .task-item-body-text {
      display: none;
    }
    .task-item-action {
      display: none;
    }
  }

  .task-item-checked {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .task-item-body {
    font-weight: 400;
    padding: 8px 12px;
    flex: 1;
    display: flex;
  }

  .task-item-action {
    .btn-destroy {
      display: none;
      font-size: 30px;
      transition: color 0.2s ease-out;
      font-weight: 300;
      &:after {
        content: '×';
      }
    }
  }

  .icon-checked {
    background-image: url(${CheckCircleIcon});
    background-position: center;
    background-repeat: no-repeat;

    &:hover {
      transition: background-image 0.5s;
      background-image: url(${CheckHoverIcon});
    }
  }
`;

const TodoItem = ({userData, onChecked, onDelete, onEdit, onChangeItem}) => {

  function handleClick (e){
    if(e.target.className.includes('icon-checked')){ //判斷是勾勾的 icon
      onChecked(userData.id) //處理 , 因為有從父元件傳來自己的 data 所以可以直接回傳自己的 id 當作參數
    }
    else if(e.target.className.includes('btn-destroy')){ //判斷是 X
      onDelete(userData.id) //處理
    }
  }
  function handleKeyDown (e){
    if(userData.isEdit && e.key === 'Enter'){
      onChangeItem(e.target.value, userData.id)
    }
  }

  return (
    <StyledTaskItem 
      className={clsx({done:userData.isDone, edit:userData.isEdit})} 
      onClick={handleClick} //監聽 clik
    >
      <div className="task-item-checked">
        <span className="icon icon-checked" />
      </div>
      <div 
        className="task-item-body" 
        onDoubleClick={ () => onEdit(userData.id) } //監聽 doubleClick
        onKeyDown={handleKeyDown}// 監聽 keyDown
      >
        <span className="task-item-body-text">{userData.title}</span>
        <input 
          className="task-item-body-input" 
          defaultValue={userData.title}
        />
      </div>
      <div className="task-item-action ">
        <button className="btn-reset btn-destroy icon"></button>
      </div>
    </StyledTaskItem>
  );
};

export default TodoItem;
