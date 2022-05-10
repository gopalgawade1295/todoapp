import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TodoApp() {
    const [id, setId] = useState(null);
    const [title, setTitle] = useState('');
    const [todolist, setTodolist] = useState([]);
    const [edit, setEdit] = useState(false);
    const [newtitle, setNewtitle] = useState('');
    const [newTodolist, setNewtodolist] = useState('');

    const getTodos = async function () {
        const response = await axios.get('http://127.0.0.1:8000/todolist/');
        const Data = await response.data;
        setTodolist(Data);
    }

    useEffect(() => {
        getTodos();
    }, [id]);

    const addTodo = async (e) => {
        const newTodo = {
            id: id,
            title: title
        }
        const response = await axios.post('http://127.0.0.1:8000/todocreate/', newTodo);
        getTodos();
        setTitle('');
    }

    const deleteTodo = async (id) => {
        const response = await axios.delete(`http://127.0.0.1:8000/tododelete/${id}`);
        getTodos();
    }

    const editTodo = (todo) => {
        setEdit(true);
        setNewtodolist(todo);
        setNewtitle(todo.title);
    }

    const updateTodo = async (e) => {
        const Id = newTodolist.id;
        const updatedTodo = {
            id: Id,
            title: newtitle
        }
        const response = await axios.put(`http://127.0.0.1:8000/todoupdate/${Id}`, updatedTodo);
        getTodos();
        setNewtitle('');
    }

    return (
        <div className='row'>
            <div className='col-sm'></div>
            <div className='col'>
                <div className='container-sm' style={{ border: '#C0C0C0 solid 1px', padding: '10px' }}>
                    <h3>Todo App</h3>
                    <>
                        <div className='mb-3'>
                            <input type="text" className='form-control' placeholder='Write todo...' value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <button className='btn btn-primary btn-sm' onClick={addTodo}>Add</button>
                    </>
                    <br />
                    <br />
                    {
                        edit ?
                            <>
                                <div className='mb-3'>
                                    <input className='form-control' type="text" value={newtitle} onChange={(e) => setNewtitle(e.target.value)} />
                                </div>
                                <button className='btn btn-primary btn-sm' onClick={() => updateTodo()}>Update</button>&emsp;
                                <button className='btn btn-danger btn-sm' onClick={() => setEdit(false)}>X</button>
                                <br />
                                <br />
                            </>
                            : null
                    }
                    {
                        todolist.map((todo) => {
                            return (
                                <div key={todo.id}>
                                    <div className="input-group-text">
                                        <input type="checkbox" />&nbsp;
                                        <button className='btn btn-danger btn-sm' onClick={() => deleteTodo(todo.id)}>X</button>&nbsp;
                                        <button className='btn btn-secondary btn-sm' onClick={() => editTodo(todo)}>Edit</button>&nbsp;&nbsp;
                                        {todo.title}
                                    </div>
                                    <br />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className='col-sm'></div>
        </div>
    )
}

export default TodoApp
