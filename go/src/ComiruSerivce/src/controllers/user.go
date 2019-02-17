package controllers

import (
	"ComiruSerivce/src/helper"
	"ComiruSerivce/src/models"
	"encoding/json"
	"net/http"
)

type RegisterResponse struct {
	Token string `bson:"token" json:"token"`
}

//注册
func Register(w http.ResponseWriter, r *http.Request) {
	var user models.User
	err := json.NewDecoder(r.Body).Decode(&user)
	//获取必要参数
	if err != nil || user.UserName == "" || user.Password == "" || user.Identity == 0 || user.Class == "" {
		helper.ResponseWithJson(w, http.StatusBadRequest,
			helper.Response{Code: http.StatusBadRequest, Msg: "bad params"})
		return
	}
	//注册返回Token给前端直接登录使用
	token, err := models.Register(user.UserName, user.Password, user.Class, user.Identity)
	if err != nil {
		helper.ResponseWithJson(w, http.StatusInternalServerError, helper.Response{Code: http.StatusInternalServerError, Msg: "internal error"})
	} else {
		helper.ResponseWithJson(w, http.StatusOK, helper.Response{Code: http.StatusOK, Data: RegisterResponse{Token: token}})
	}
}

//登录
func Login(w http.ResponseWriter, r *http.Request) {
	var user models.User
	err := json.NewDecoder(r.Body).Decode(&user)
	//获取必要参数
	if err != nil || user.UserName == "" || user.Password == "" {
		helper.ResponseWithJson(w, http.StatusBadRequest,
			helper.Response{Code: http.StatusBadRequest, Msg: "bad params"})
		return
	}
	//登录返回用户信息
	data, err := models.Login(user.UserName, user.Password)
	if err != nil {
		helper.ResponseWithJson(w, http.StatusInternalServerError, helper.Response{Code: http.StatusInternalServerError, Msg: err.Error()})
	} else {
		helper.ResponseWithJson(w, http.StatusOK, helper.Response{Code: http.StatusOK, Data: data})
	}
}
