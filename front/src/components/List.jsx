import React from 'react'
import { Fragment, useContext, useEffect } from 'react';

const List = (props) => {

    const { dispatch, state: { todo } } = useContext(props.store);
    const currentList = todo.list;
  
    useEffect(() => {
      fetch(props.url + "/todos")
        .then(response => response.json())
        .then((list) => {
          dispatch({ type: "update-list", list })
        })
    }, [dispatch]);
  
  
    const onDelete = (id) => {
      fetch(props.url + "/" + id + "/todo", {
        method: "DELETE"
      }).then((list) => {
        dispatch({ type: "delete-item", id })
      })
    };
  
    const onEdit = (todo) => {
      dispatch({ type: "edit-item", item: todo })
    };
  
    const onChange = (event, todo) => {
      const request = {
        name: todo.name,
        id: todo.id,
        completed: event.target.checked
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
        });
    };
  
    const decorationDone = {
      textDecoration: 'line-through'
    };

    return ( 
        <Fragment>
            <table >
                <thead>
                <tr>
                    <td>ID</td>
                    <td>Tarea</td>
                    <td>¿Completado?</td>
                </tr>
                </thead>
                <tbody>
                {currentList.map((todo) => {
                    return <tr key={todo.id} style={todo.completed ? decorationDone : {}}>
                    <td>{todo.id}</td>
                    <td>{todo.name}</td>
                    <td><input type="checkbox" defaultChecked={todo.completed} onChange={(event) => onChange(event, todo)}></input></td>
                    <td><button onClick={() => onDelete(todo.id)}>Eliminar</button></td>
                    <td><button onClick={() => onEdit(todo)}>Editar</button></td>
                    </tr>
                })}
                </tbody>
            </table>
        </Fragment>
     );
}
 
export default List;