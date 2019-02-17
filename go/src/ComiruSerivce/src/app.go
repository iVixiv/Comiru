package main

import (
	"ComiruSerivce/src/gocors"
	"ComiruSerivce/src/models"
	"ComiruSerivce/src/routes"
	"net/http"
)

func main() {
	models.Connect()
	defer models.SafeClose()
	r := routes.NewRouter()
	cors := gocors.New()
	cors.SetAllowHeaders([]string{"authorization", "username"})
	http.ListenAndServe(":3333", cors.Handler(r))
}
