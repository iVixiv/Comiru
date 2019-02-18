package controllers

import (
	"ComiruSerivce/src/helper"
	"ComiruSerivce/src/lib"
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"log"
	"net/http"
	"strings"
)

type PushResponse struct {
	Status      int      `bson:"status" json:"status" `
	Id          string   `bson:"id" json:"id,omitempty" `
	Recipients  int64    `bson:"recipients" json:"recipients,omitempty" `
	External_id string   `bson:"external_id" json:"external_id,omitempty" `
	Errors      []string `bson:"errors" json:"errors,omitempty" `
	Error       string   `bson:"error" json:"error,omitempty" `
}

type PushBody struct {
	Message string `bson:"message" json:"message" `
}

func PushNotify(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]
	var body PushBody
	err := json.NewDecoder(r.Body).Decode(&body)
	if err != nil || id == "0" || id == "" || body.Message == "" {
		helper.ResponseWithJson(w, http.StatusInternalServerError, helper.Response{Code: http.StatusInternalServerError, Msg: "参数不合法"})
	} else {
		params := `{"app_id": "a7a034f9-48b7-4701-9d72-bcce27d09c08","filters": [{"field": "tag", "key": "user_id", "relation": "=", "value": "%s"}],"contents": {"en": "%s"}}`
		headers := map[string]string{
			"Content-Type":  "application/json; charset=UTF-8",
			"Authorization": "Basic NmU3NjE1ZWQtZDU5NS00YjU5LWE4YzMtYWM1MWZlZjU3ODc4",
		}

		url := "https://onesignal.com/api/v1/notifications"
		params = fmt.Sprintf(params, id, body.Message)
		res, err := lib.Request(url, http.MethodPost, headers, strings.NewReader(params), "UTF-8")
		if err != nil {
			helper.ResponseWithJson(w, http.StatusInternalServerError, helper.Response{Code: http.StatusInternalServerError, Msg: err.Error()})
			return
		}
		result := &PushResponse{}
		var r = []byte(res)
		err = json.Unmarshal(r, result)
		if err != nil {
			helper.ResponseWithJson(w, http.StatusInternalServerError, helper.Response{Code: http.StatusInternalServerError, Msg: err.Error()})
			return
		}
		if result.Error != "" {
			helper.ResponseWithJson(w, http.StatusInternalServerError, helper.Response{Code: http.StatusInternalServerError, Msg: result.Error})
			return
		}
		if result.Errors != nil && len(result.Errors) > 0 {
			helper.ResponseWithJson(w, http.StatusInternalServerError, helper.Response{Code: http.StatusInternalServerError, Msg: result.Errors[0]})
			return
		}
		log.Print(string(r))
		helper.ResponseWithJson(w, http.StatusOK, helper.Response{Code: http.StatusOK, Msg: "用户Id：" + id + " 推送成功"})
	}
}
