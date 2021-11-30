import React from 'react'
import { Fragment, useRef, useContext, useState } from 'react';

const Form = (props) => {

    const formRef = useRef(null);
    const { dispatch, state: { todo } } = useContext(props.store);
    const item = todo.item;
    const [state, setState] = useState(item);
  
    const onAdd = (event) => {
      event.preventDefault();
  
      const request = {
        name: state.name,
        id: null,
        completed: false
      };
  
      fetch(props.url + "/todo", {
        method: "POST",
        body: JSON.stringify(request),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then((todo) => {
          dispatch({ type: "add-item", item: todo });
          setState({ name: "" });
          formRef.current.reset();
        });
    }
  
    const onEdit = (event) => {
      event.preventDefault();
  
      const request = {
        name: state.name,
        id: item.id,
        isCompleted: item.isCompleted
      };
  
      fetch(props.url + "/todo", {
        method: "PUT",
        body: JSON.stringify(request),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then((todo) => {
          dispatch({ type: "update-item", item: todo });
          setState({ name: "" });
          formRef.current.reset();
        });
    }

    return ( 
        <Fragment>
            <form ref={formRef}>    
                <input
                    type="text"
                    name="name"
                    placeholder="¿Qué piensas hacer hoy?"
                    defaultValue={item.name}
                    onChange={(event) => {
                    setState({ ...state, name: event.target.value })
                    }}
                />
                {item.id && <button onClick={onEdit}>Actualizar</button>}
                {!item.id && <button onClick={onAdd}>Crear</button>}
            </form>
        </Fragment>
     );
}
 
export default Form;