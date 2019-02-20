import Typography from '@material-ui/core/Typography';
import React, { Component } from 'react';
import { withRouter } from 'next/router';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import Link from 'next/link';
// import SwipeableView from '../components/SwipeableView';
// import Contact from '../components/Contact';
// import axios from 'axios';
// import { Button } from 'antd-mobile';

import Layout from '../components/Layout';

const bg = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  width: '100%',
  fontFamily: 'NotoSansHans'
};


const styles = theme => ({
  title: {
    fontSize: 40,
    fontFamily: 'NotoSansHans',
    marginBottom: 40
  },
  input: {
    width: 300,
    height: 40,
    marginTop: 30
  },
  btnDiv: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 30,
    marginBottom: 30
  },
  btn: {
    width: 80,
    height: 30,
    marginRight: 30,
    marginLeft: 30
  },
  select: {
    width: 80,
    height: 30,
    marginRight: 30,
    marginLeft: 30
  }
});

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      class: "1",
      identity: 1,
      ops: []
    }
    this.handleInput = this.handleInput.bind(this);
    this.login = this.login.bind(this)
  }

  componentDidMount() {
    this.updateClass()
  }

  handleInput(e) {
    const name = e.target.name;
    this.setState({ [name]: e.target.value });
    console.log(name, e.target.value)
  }

  login() {
    var user = {
      username: this.state.username,
      password: this.state.password,
      class: this.state.class,
      identity: parseInt(this.state.identity)
    }
    if (user.name == "" || user.password == "") {
      alert("账号密码不能为空")
    } else {
      let url = 'http://localhost:3333/user/register';
      fetch(url, {
        method: 'POST',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: JSON.stringify(user, null, 2)
      }).then(response => response.json()).then(function (res) {
        console.log(res)
        if (res.code === 200) {
          alert("注册成功")
          Router.push('/')
        } else {
          alert(res.msg)
        }
      });
    }
  }

  updateClass() {
    let url = 'http://localhost:3333/classes';
    let app = this
    fetch(url, {
      method: 'GET',
      headers: {},
    }).then(response => response.json()).then(function (res) {
      console.log(res)
      if (res.code === 200) {
        app.setState({
          ops: res.data
        })
      } else {
        alert(res.msg)
      }
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <Layout>
        <div style={bg}>
          <Typography class={classes.title}> 注册</Typography>
          <input class={classes.input} type="text" placeholder="用户名" name="username" value={this.state.username} onChange={this.handleInput}></input>
          <input class={classes.input} type="text" placeholder="密码" name="password" value={this.state.password} onChange={this.handleInput}></input>
          <div class={classes.btnDiv}>
            <select class={classes.select} value={this.state.class} name="class" onChange={this.handleInput}>
              {
                this.state.ops.map((item, index) => (
                  <option key={index} value={item.id}>{item.name}</option>
                ))
              }
            </select>
            <select class={classes.select} value={this.state.identity} onChange={this.handleInput} name="identity">
              <option key="1" value="1">学生</option>
              <option key="2" value="2">老师</option>
            </select>
          </div>
          <button class={classes.btn} onClick={this.login}>
            注册
          </button>
        </div>
      </Layout>
    );
  }
}

export default compose(withStyles(styles))(withRouter(Register));
