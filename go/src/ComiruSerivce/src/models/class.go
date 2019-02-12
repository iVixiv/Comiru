package models

import "log"

//Class结构体
type Class struct {
	Id   int32  `bson:"id" json:"id"`
	Name string `bson:"name" json:"name"`
}

//登录
func ClassList() (*[]Class, error) {
	sql := `SELECT * FROM class`
	result := make([]Class, 0)
	rows, err := MySQL.Query(sql)
	if err != nil {
		return &result, err
	}
	for rows.Next() {
		var class = Class{}
		err := rows.Scan(&class.Id, &class.Name)
		if err != nil {
			log.Fatal(err)
			return &result, err
		}
		result = append(result, class)
	}
	return &result, nil
}

//查询班级成员
func ClassInfo(classId string) (*[]User, error) {
	sql := `SELECT id,username,class,identity FROM user WHERE class = ?`
	var args []interface{}
	args = append(args, classId)

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
