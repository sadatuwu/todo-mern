import React,{useState} from 'react'
import {v4 as uuid} from 'uuid'

const Form = ({todos,setTodos}) => {
    const [input,setInput] = useState('');

    const onchange = (e) => {
        setInput(e.target.value);
    }

    const onsubmit = (e) => {
        e.preventDefault();
        setTodos([
            ...todos,{name:input,completed:false,id:uuid()}
        ])
        setInput('');
    }
  return (
    <form  onSubmit={onsubmit}>
       
        <input className='form-input'
        type='text'
        placeholder='enter a todos'
        autoComplete='off'
        value={input}
        onChange={onchange}/>
        <button className='form-button' type='onSubmit'>Add</button>
      
    </form>
  )
}
export default Form




