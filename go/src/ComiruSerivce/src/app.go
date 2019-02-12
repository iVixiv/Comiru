package main

import (
	"ComiruSerivce/src/models"
	"ComiruSerivce/src/routes"
	"net/http"

)

func main() {
	models.Connect()
	defer models.SafeClose()
	r := routes.NewRouter()

	http.ListenAndServe(":3333", r)
}
