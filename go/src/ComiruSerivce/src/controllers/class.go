package controllers

import (
	"ComiruSerivce/src/helper"
	"ComiruSerivce/src/models"
	"github.com/gorilla/mux"
	"net/http"
	"strconv"
)

func Classes(w http.ResponseWriter, r *http.Request) {

	result, err := models.ClassList()
	if err != nil {
		helper.ResponseWithJson(w, http.StatusInternalServerError, helper.Response{Code: http.StatusInternalServerError, Msg: err.Error()})
	} else {
		helper.ResponseWithJson(w, http.StatusOK, helper.Response{Code: http.StatusOK, Data: result})
	}

}

func ClassNumbers(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]
	intId, err := strconv.ParseInt(id, 10, 64)
	if err != nil || intId == 0 {
		helper.ResponseWithJson(w, http.StatusInternalServerError, helper.Response{Code: http.StatusInternalServerError, Msg: "参数不合法"})
	} else {
		result, err := models.ClassInfo(id)
		if err != nil {
			helper.ResponseWithJson(w, http.StatusInternalServerError, helper.Response{Code: http.StatusInternalServerError, Msg: err.Error()})
		} else {
			helper.ResponseWithJson(w, http.StatusOK, helper.Response{Code: http.StatusOK, Data: result})
		}
	}
}
