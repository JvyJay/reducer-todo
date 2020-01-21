import React, { useReducer, useState } from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'add-todo':
      return { todos: [...state.todos, { state: action.state }] };
    case 'clear':
      return { todos: state.todos.filter(item => !item.completed) };
    case 'cross-out':
      return {
        todos: state.todos.map((item, index) =>
          index === action.index
            ? { ...item, completed: !item.completed }
            : item
        )
      };
    default:
      return state;
  }
}

const App = () => {
  const [{ todos }, dispatch] = useReducer(reducer, { todos: [] });
  const [state, setState] = useState();
  return (
    <>
      <form>
        <input value={state} onChange={e => setState(e.target.value)}></input>
        <button
          onClick={e => {
            e.preventDefault();
            dispatch({ type: 'add-todo', state });
            setState('');
          }}
        >
          Add Todo
        </button>
        <button
          onClick={e => {
            e.preventDefault();
            dispatch({ type: 'clear', todos });
          }}
        >
          Clear List
        </button>
      </form>
      {todos.map((item, index) => {
        return (
          <div
            onClick={() => {
              dispatch({ type: 'cross-out', index });
            }}
            style={{
              textDecoration: item.completed ? 'line-through' : '',
              cursor: 'pointer'
            }}
          >
            {item.state}
          </div>
        );
      })}
    </>
  );
};

export default App;
