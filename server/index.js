import express from "express"
const app = express()
app.use(express.json({ limit: '10kb' }))

let database = []

app.post('/todos', function(req, res) {
  try {
    const { label, priority } = req.body
    if (typeof label != "string" || label == "") {
      res.status(400)
      res.send("label should be a non empty string")
      return
    }
    if (
      priority != "low" &&
      priority != "medium" &&
      priority != "high"
    ) {
      res.status(400)
      res.send("priority should be either 'low', 'medium' or 'high'")
      return
    }
    let newTodo = {
      id: String(database.length + 1),
      label: label,
      priority: priority,
      status: "pending"
    }
    database.push(newTodo)
    res.status(201)
    res.json({
      "id": newTodo.id
    })
  } catch (error) {
    res.status(500)
    console.log(error)
    res.send("Something went wrong. Please try again")
  }
})

app.get('/todos', function(_, res) {
  res.status(200)
  res.json({
    "todos": database,
    "todo_count": database.length,
  })
})

app.patch('/todos/:id', function(req, res) {
  const { id } = req.params
  let todo = {
    id: "",
    label: "",
    priority: "",
    status: "",
  }
  let i = 0
  for (i; i < database.length; i++) {
    if (database[i].id == id) {
      todo = database[i]
      break
    }
  }
  if (todo.id == "") {
    return res.status(404).send(`Todo item with id ${id} was not found`)
  }
  const { label, priority, status } = req.body
  if (typeof label === "string" && label != "") {
    todo.label = label
  }
  if (
    priority === "low" ||
    priority === "medium" ||
    priority === "high"
  ) {
    todo.priority = priority
  }
  if (status === "pending" || status === "done") {
    todo.status = status
  }
  database[i] = todo
  res.status(200).send()
})


app.delete('/todos/:id', function(req, res) {
  const { id } = req.params
  database = database.filter((value, _) => value.id != id)
  return res.status(200).send()
})

app.listen(3000, () => {
  console.log("Listening on port 3000")
})
