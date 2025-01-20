create:
	@curl -d '$(body)' -H "Content-Type: application/json" -X POST http://localhost:3000/todos -w " | %{http_code}\n"

get:
	@curl http://localhost:3000/todos
