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
import Router from 'next/router'

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
    marginTop: 40
  },
  btn: {
    width: 80,
    height: 30,
    marginRight: 30,
    marginLeft: 30
  }
});

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
    this.handleInput = this.handleInput.bind(this);
    this.login = this.login.bind(this)
  }

  componentDidMount() {
    var data = window.localStorage.getItem("user")
    if (data != null && data != "") {
      var user = JSON.parse(data)
      if (user != null && user.token != "") {
        Router.push('/home')
      }
    }
  }

  handleInput(e) {
    const name = e.target.name;
    this.setState({ [name]: e.target.value });
  }

  login() {
    var data = {
      username: this.state.username,
      password: this.state.password
    }
    if (data.name == "" || data.password == "") {
      alert("账号密码不能为空")
    } else {
      let url = 'http://localhost:3333/user/login';
      fetch(url, {
        method: 'POST',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: JSON.stringify(data, null, 2)
      }).then(response => response.json()).then(function (res) {
        console.log(res)
        if (res.code === 200) {
          window.localStorage.setItem("user", JSON.stringify(res.data))
          alert("登录成功")
          Router.push('/home')
        } else {
          alert(res.msg)
        }
        console.log(res.status);
      });
    }
  }
  render() {
    const { classes } = this.props;

    return (
      <Layout>
        <div style={bg}>
          <Typography class={classes.title}> Comiru Test Web</Typography>
          <input class={classes.input} type="text" placeholder="用户名" name="username" value={this.state.username} onChange={this.handleInput}></input>
          <input class={classes.input} type="password" placeholder="密码" name="password" value={this.state.password} onChange={this.handleInput}></input>
          <div class={classes.btnDiv}>
            <button class={classes.btn} onClick={this.login}>
              登录
            </button>
            <Link href="/register">
              <button class={classes.btn}  >
                去注册
              </button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }
}

export default compose(withStyles(styles))(withRouter(Index));
