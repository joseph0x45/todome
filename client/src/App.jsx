import { useEffect } from "react"
import { useState } from "react"

function Todo({ todo }) {
  async function deleteTodo() {
    try {
      const response = await fetch(`http://localhost:3000/todos/${todo.id}`, {
        method: "delete"
      })
      console.log(response.status)
      window.location.reload()
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <>
      <button onClick={deleteTodo} className="color: red">Delete</button>
      <p>{todo.id}</p>
      <p>{todo.label}</p>
      <p>{todo.priority}</p>
      <p>{todo.status}</p>
    </>
  )
}


function App() {
  let [todos, setTodos] = useState([])
  let [loading, setLoading] = useState(true)
  useEffect(() => {
    async function loadData() {
      const response = await fetch("http://localhost:3000/todos")
      const { todos } = await response.json()
      setTodos(() => todos)
      setLoading(false)
    }
    loadData()
  }, [])

  return (
    <>
      {
        loading && <h1>Loading, please wait</h1>
      }
      {loading || todos.map((todo) => {
        return (
          <Todo key={todo.id} todo={todo} />
        )
      })}
    </>
  )
}

export default App
