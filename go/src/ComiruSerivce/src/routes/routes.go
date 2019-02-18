package routes

import (
	"ComiruSerivce/src/auth"
	"ComiruSerivce/src/controllers"
	"ComiruSerivce/src/helper"
	"net/http"

	"github.com/gorilla/mux"
)

type Route struct {
	Method     string
	Pattern    string
	Handler    http.HandlerFunc
	Middleware mux.MiddlewareFunc
}

var routes []Route

func init() {
	register("GET", "/classes", controllers.Classes, nil)
	register("GET", "/class/{id}", controllers.ClassNumbers, auth.TokenMiddleware)
	register("OPTIONS", "/class/{id}", handleCors, nil)
	register("POST", "/user/register", controllers.Register, nil)
	register("POST", "/user/login", controllers.Login, nil)
	register("POST", "/push/{id}", controllers.PushNotify, nil)
	register("GET", "/watch/{id}", controllers.UsersByWatch, nil)
	register("GET", "/watched/{id}", controllers.UsersByWatched, nil)
	register("POST", "/watch", controllers.Watch, nil)
	register("POST", "/unwatch", controllers.UnWatch, nil)
}

func handleCors(w http.ResponseWriter, r *http.Request) {
	helper.ResponseWithJson(w, http.StatusOK, helper.Response{Code: http.StatusOK})
}

func NewRouter() *mux.Router {
	router := mux.NewRouter()
	for _, route := range routes {
		r := router.Methods(route.Method).
			Path(route.Pattern)
		if route.Middleware != nil {
			r.Handler(route.Middleware(route.Handler))
		} else {
			r.Handler(route.Handler)
		}
	}
	return router
}

func register(method, pattern string, handler http.HandlerFunc, middleware mux.MiddlewareFunc) {
	routes = append(routes, Route{method, pattern, handler, middleware})
}
