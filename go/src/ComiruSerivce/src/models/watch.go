package models

import (
	"errors"
	"log"
)

//关注
func Watch(userId, w_id int) error {
	var args []interface{}
	args = append(args, userId)
	args = append(args, w_id)
	sql := `SELECT id FROM watch WHERE user_id = ? AND w_id = ? AND is_deleted = 0`
	rows, err := MySQL.Query(sql, args...)
	if err != nil {
		return err
	}
	if rows.Next() {
		return errors.New("已经关注过了")
	}
	sql = `INSERT INTO watch (user_id,w_id,is_deleted) VALUES (?,?,?)`

	args = append(args, 0)
	if _, err := MySQL.Exec(sql, args...); err != nil {
		log.Print(err)
		return err
	}
	return nil
}

//取消关注
func UnWatch(userId, w_id int) error {
	var args []interface{}
	args = append(args, userId)
	args = append(args, w_id)
	sql := `SELECT id FROM watch WHERE user_id = ? AND w_id = ? AND is_deleted = 0`
	rows, err := MySQL.Query(sql, args...)
	if err != nil {
		return err
	}
	if !rows.Next() {
		return errors.New("还没有关注")
	}
	sql = `UPDATE watch SET is_deleted=1 where user_id=? AND w_id = ?`

	if _, err := MySQL.Exec(sql, args...); err != nil {
		log.Print(err)
		return err
	}
	return nil
}
