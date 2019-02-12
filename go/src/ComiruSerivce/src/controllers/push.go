package controllers

import (
	"ComiruSerivce/src/helper"
	"ComiruSerivce/src/lib"
	"encoding/json"
	"github.com/gorilla/mux"
	"net/http"
	"strconv"
	"strings"
)

type PushResponse struct {
	Id          string `bson:"id" json:"id,omitempty" `
	Recipients  int64  `bson:"recipients" json:"recipients,omitempty" `
	External_id string `bson:"external_id" json:"external_id,omitempty" `
}

func PushNotify(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]
	intId, err := strconv.ParseInt(id, 10, 64)
	if err != nil || intId == 0 {
		helper.ResponseWithJson(w, http.StatusInternalServerError, helper.Response{Code: http.StatusInternalServerError, Msg: "参数不合法"})
	} else {
		params := `{
  "app_id": "a7a034f9-48b7-4701-9d72-bcce27d09c08",
  "included_segments": ["All"],
  "data": {"foo": "bar"},
  "contents": {"en": "用户推送测试"}
}`
		headers := map[string]string{
			"Content-Type":  "application/json; charset=UTF-8",
			"Authorization": "Basic NmU3NjE1ZWQtZDU5NS00YjU5LWE4YzMtYWM1MWZlZjU3ODc4",
		}

		url := "https://onesignal.com/api/v1/notifications"

		res, err := lib.Request(url, http.MethodPost, headers, strings.NewReader(params), "UTF-8")
		if err != nil {
			helper.ResponseWithJson(w, http.StatusInternalServerError, helper.Response{Code: http.StatusInternalServerError, Msg: err.Error()})
			return
		}
		result := &PushResponse{}
		err = json.Unmarshal([]byte(res), result)
		if err != nil {
			helper.ResponseWithJson(w, http.StatusInternalServerError, helper.Response{Code: http.StatusInternalServerError, Msg: err.Error()})
			return
		}
		helper.ResponseWithJson(w, http.StatusOK, helper.Response{Code: http.StatusOK, Msg: "用户Id：" + id + " 推送成功"})
	}
}
