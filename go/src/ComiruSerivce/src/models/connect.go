package models

import (
	"database/sql"
	_ "github.com/go-sql-driver/mysql"
	"log"
)

var (
	MySQL *sql.DB
)

// http://godoc.org/github.com/go-sql-driver/mysql
// 务必调用 defer db.SafeClose() 安全关闭连接
func Connect() {
	var err error
	MySQL, err = sql.Open("mysql", "comiru:zxc123567@tcp(111.231.92.160:3306)/comiru?charset=utf8")
	if err != nil {
		log.Print("Failed to open mysql connect : %s", err.Error())
	}
	// 设置最大连接数
	MySQL.SetMaxOpenConns(200)
	// 设置最大闲置连接数
	MySQL.SetMaxIdleConns(5)
	err = MySQL.Ping()
	log.Print("Connected to the mysql!")
	if err != nil {
		log.Panic(err)
	}
}

// 安全关闭 MySQL 连接
func SafeClose() {
	if MySQL != nil {
		MySQL.Close()
	}
}
