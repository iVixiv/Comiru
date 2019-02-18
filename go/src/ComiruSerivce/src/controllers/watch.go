package controllers

import (
	"ComiruSerivce/src/helper"
	"ComiruSerivce/src/models"
	"encoding/json"
	"net/http"
)

type watchRequestBody struct {
	UserId int `bson:"user_id" json:"user_id"`
	W_Id   int `bson:"w_id" json:"w_id"`
}

//关注
func Watch(w http.ResponseWriter, r *http.Request) {
	var body watchRequestBody
	err := json.NewDecoder(r.Body).Decode(&body)
	//获取必要参数
	if err != nil || body.UserId == 0 || body.W_Id == 0 || body.W_Id == body.UserId {
		helper.ResponseWithJson(w, http.StatusBadRequest,
			helper.Response{Code: http.StatusBadRequest, Msg: "bad params"})
		return
	}
	err = models.Watch(body.UserId, body.W_Id)
	if err != nil {
		helper.ResponseWithJson(w, http.StatusInternalServerError, helper.Response{Code: http.StatusInternalServerError, Msg: err.Error()})
	} else {
		helper.ResponseWithJson(w, http.StatusOK, helper.Response{Code: http.StatusOK})
	}
}

//取消关注
func UnWatch(w http.ResponseWriter, r *http.Request) {
	var body watchRequestBody
	err := json.NewDecoder(r.Body).Decode(&body)
	//获取必要参数
	if err != nil || body.UserId == 0 || body.W_Id == 0 || body.W_Id == body.UserId {
		helper.ResponseWithJson(w, http.StatusBadRequest,
			helper.Response{Code: http.StatusBadRequest, Msg: "bad params"})
		return
	}
	err = models.UnWatch(body.UserId, body.W_Id)
	if err != nil {
		helper.ResponseWithJson(w, http.StatusInternalServerError, helper.Response{Code: http.StatusInternalServerError, Msg: err.Error()})
	} else {
		helper.ResponseWithJson(w, http.StatusOK, helper.Response{Code: http.StatusOK})
	}
}

