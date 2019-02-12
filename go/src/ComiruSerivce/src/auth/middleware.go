package auth

import (
	"ComiruSerivce/src/helper"
	"fmt"
	"net/http"
	"reflect"
	"strconv"
	"time"

	"github.com/dgrijalva/jwt-go"
)

//生成Token
func GenerateToken(username string) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"username": username,                                                 //用户名
		"exp":      fmt.Sprintf("%d", time.Now().Add(time.Hour * 12).Unix()), //过期时间
	})
	return token.SignedString([]byte("secret"))
}

//校验Token有效性
func TokenMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		//获取Header中的token
		tokenStr := r.Header.Get("authorization")
		//获取Header中的用户名
		username := r.Header.Get("username")
		//当前时间
		now := time.Now().Unix()
		if tokenStr == "" {
			//token为空直接校验失败
			helper.ResponseWithJson(w, http.StatusUnauthorized, helper.Response{Code: http.StatusUnauthorized, Msg: "not authorized"})
		} else {
			token, _ := jwt.Parse(tokenStr, func(token *jwt.Token) (interface{}, error) {
				if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
					//解析token信息失败
					helper.ResponseWithJson(w, http.StatusUnauthorized, helper.Response{Code: http.StatusUnauthorized, Msg: "not authorized"})
					return nil, fmt.Errorf("not authorization")
				}
				return []byte("secret"), nil
			})
			if token == nil || !token.Valid {
				//token信息是否解析成功
				helper.ResponseWithJson(w, http.StatusUnauthorized, helper.Response{Code: http.StatusUnauthorized, Msg: "not authorized"})
			} else {
				//获取token中保存的过期时间
				time, _ := strconv.ParseInt(getIdFromClaims("exp", token.Claims), 10, 64)
				if getIdFromClaims("username", token.Claims) != username {
					//用户名校验一致
					helper.ResponseWithJson(w, http.StatusUnauthorized, helper.Response{Code: http.StatusUnauthorized, Msg: "not authorized"})
				} else if (now - time) > 0 {
					//Token是否过期
					helper.ResponseWithJson(w, http.StatusUnauthorized, helper.Response{Code: http.StatusUnauthorized, Msg: "token过期请重新登录"})
				} else {
					//鉴权成功
					//有必要的场合可以从数据库取出用户Token的摘要信息对比
					next.ServeHTTP(w, r)
				}
			}
		}
	})
}

//从Token里获取键值对信息
func getIdFromClaims(key string, claims jwt.Claims) string {
	v := reflect.ValueOf(claims)
	if v.Kind() == reflect.Map {
		for _, k := range v.MapKeys() {
			value := v.MapIndex(k)
			if fmt.Sprintf("%s", k.Interface()) == key {
				return fmt.Sprintf("%v", value.Interface())
			}
		}
	}
	return ""
}
