package controllers

import (
	"ComiruSerivce/src/helper"
	"github.com/gorilla/mux"
	"net/http"
	"strconv"
)

func PushNotify(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]
	intId, err := strconv.ParseInt(id, 10, 64)
	if err != nil || intId == 0 {
		helper.ResponseWithJson(w, http.StatusInternalServerError, helper.Response{Code: http.StatusInternalServerError, Msg: "参数不合法"})
	} else {
		helper.ResponseWithJson(w, http.StatusOK, helper.Response{Code: http.StatusOK, Msg: "用户Id：" + id + " 推送成功"})
	}
}
