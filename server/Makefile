create:
	@curl -d '$(body)' -H "Content-Type: application/json" -X POST http://localhost:3000/todos -w " | %{http_code}\n"

get:
	@curl http://localhost:3000/todos

patch:
	@curl -d '$(body)' -H "Content-Type: application/json" -X PATCH http://localhost:3000/todos/$(id) -w " | %{http_code}\n"

seed:
	$(MAKE) create body='{"label":"manger ayimolou","priority":"low"}'
	$(MAKE) create body='{"label":"manger vehi","priority":"medium"}'
	$(MAKE) create body='{"label":"manger gali","priority":"high"}'

delete:
	@curl -H "Content-Type: application/json" -X DELETE http://localhost:3000/todos/$(id) -w " | %{http_code}\n"
