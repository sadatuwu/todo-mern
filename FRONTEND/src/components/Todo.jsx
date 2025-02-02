import React,{useState} from 'react'

const Todo = ({todo,todos,setTodos,id}) => {
    const [edit,setEdit] = useState(false);
    const [inputedit,setInputedit] = useState(todo.name)

    const onchangedsave = (e) => {
        setInputedit(e.target.value);
    }

    const onEdit = () => {
        setEdit(true);
    }

    const onSave = (id) => {
        setEdit(false);
        if(inputedit) {
            saveinput(inputedit,id)
        }
       else {
        setInputedit(todo.name)
       }
        
    }

const saveinput = (inputedit) => {
    const savetodos = [...todos]
    savetodos.forEach((item)=>{
        if(item.id !== todos.id) {
            (todo.name = inputedit)
        }
    })
    setTodos(savetodos)
}

   


const onDelete = () => {
    setTodos(todos.filter((item)=>
    todo.id !== item.id))
}


const onComplete = () => {
    setTodos(todos.map((item)=>{
        if(todo.id === item.id) {
            return{
                ...item,completed: !item.completed
            }
        }
        return item
    }))
}


    const onchangedit =() => {}

    if(edit) {
        return (
            <div className='todo-li'>
                <li className='li-list'>

                    <input className='li-input' value={inputedit} onChange={onchangedsave}/>
        
                    <button className='button-save' onClick={()=>onSave(id)}>
                        <span className='text-save'>Save</span><i className='fa fa-save'></i>
                    </button>
        
                    
        
                </li>
              
            </div>
          )

    }else{
        return (
            <div className='todo-li'>
                <li className={`li-list ${todo.completed ? 'completed' : ''}`}>
                    <input className='li-input' value={todo.name} onChange={onchangedit}/>
        
                    <button className='button-complete' onClick={onComplete}>
                        <span className='text-complete'>Complete</span><i className='fa fa-check'></i>
                    </button>
        
                    <button className='button-edit' onClick={onEdit}>
                        <span className='text-edit'>Edit</span><i className='fa fa-edit'></i>
                    </button>
        
                    <button className='button-delete' onClick={onDelete}>
                        <span className='text-delete'>Delete</span><i className='fa fa-trash'></i>
                    </button>
        
                </li>
              
            </div>
          )

    }
  
}

export default Todo