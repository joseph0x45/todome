import express from "express"
const app = express()
app.use(express.json({ limit: '10kb' }))

let database = []

app.post('/todos', function(req, res) {
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
    id: database.length + 1,
    label: label,
    priority: priority,
    status: "pending"
  }
  database.push(newTodo)
  res.status(201)
  res.json({
    "id": newTodo.id
  })
})

app.get('/todos', function(_, res) {
  console.log(database)
  res.status(200)
  res.send()
})

app.listen(3000, () => {
  console.log("Listening on port 3000")
})
