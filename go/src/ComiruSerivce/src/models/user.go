package models

import (
	"ComiruSerivce/src/auth"
	"crypto/md5"
	"encoding/hex"
	"errors"
	"log"
)

//USER结构体
type User struct {
	Id       int32  `bson:"id" json:"id"`
	UserName string `bson:"username" json:"username"`
	Password string `bson:"password" json:"password,omitempty" `
	Class    string `bson:"class" json:"class"`
	Token    string `bson:"token" json:"token,omitempty"`
	Identity uint8  `bson:"identity" json:"identity"`
	UnWatch  uint8  `bson:"unWatch" json:"unWatch" `
}

type JwtToken struct {
	Token string `json:"token"`
}

func MD5(str string) string {
	hash := md5.New()
	hash.Write([]byte(str))
	return hex.EncodeToString(hash.Sum(nil))
}

//注册
func Register(username, password, class string, identity uint8) (string, error) {
	//只保存密码摘要
	password = MD5(password)
	//生成Token
	token, _ := auth.GenerateToken(username)
	//新用户数据插入数据库
	sql := `INSERT INTO user (username,password,token,class,identity) VALUES (?,?,?,?,?)`

	var args []interface{}
	args = append(args, username)
	args = append(args, password)
	args = append(args, token)
	args = append(args, class)
	args = append(args, identity)
	if _, err := MySQL.Exec(sql, args...); err != nil {
		log.Print(err)
		return "", err
	}
	//token返回给前端登录用，少调用一次登录接口
	return token, nil
}

//登录
func Login(username, password string) (*User, error) {
	//密码摘要
	password = MD5(password)
	//查下密码和用户名一致的用户是否存在，USER表username设定为不可重复
	sql := `SELECT * FROM user WHERE username = ? AND password = ?`
	var args []interface{}
	args = append(args, username)
	args = append(args, password)
	var user = User{}
	err := MySQL.QueryRow(sql, args...).Scan(&user.Id, &user.UserName, &user.Token, &user.Class, &user.Password, &user.Identity)
	if err != nil {
		return nil, errors.New("用户名或密码错误")
	}
	//生成新的Token返回给前端，旧的Token销毁
	token, _ := auth.GenerateToken(username)
	sql = "update user set token=? where id=?"
	if _, err := MySQL.Exec(sql, token, user.Id); err != nil {
		return nil, err
	}
	user.Token = token
	return &user, nil
}

func UsersByWatch(user_id string) (*[]User, error) {
	sql := `SELECT user.id,username,class,identity,isnull(watch.id) unwatch FROM user LEFT JOIN watch ON user.id = watch.w_id AND watch.user_id= ? AND is_deleted = 0 WHERE user.id != ?`
	var args []interface{}
	args = append(args, user_id)
	args = append(args, user_id)

	result := make([]User, 0)
	rows, err := MySQL.Query(sql, args...)
	if err != nil {
		return &result, err
	}
	for rows.Next() {
		var user = User{}
		err := rows.Scan(&user.Id, &user.UserName, &user.Class, &user.Identity,&user.UnWatch)
		if err != nil {
			log.Fatal(err)
			return &result, err
		}
		result = append(result, user)
	}
	return &result, nil
}

func UsersByWatched(user_id string) (*[]User, error) {
	sql := `SELECT user.id,username,class,identity FROM watch LEFT JOIN user ON user.id = watch.w_id WHERE watch.is_deleted = 0 AND watch.user_id=?`
	var args []interface{}
	args = append(args, user_id)

	result := make([]User, 0)
	rows, err := MySQL.Query(sql, args...)
	if err != nil {
		return &result, err
	}
	for rows.Next() {
		var user = User{}
		err := rows.Scan(&user.Id, &user.UserName, &user.Class, &user.Identity)
		if err != nil {
			log.Fatal(err)
			return &result, err
		}
		result = append(result, user)
	}
	return &result, nil
}
