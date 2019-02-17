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

const styles = (theme) => {
  console.log(theme);
  return {

  };
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      class: "1",
      classInfo: []
    };
    this.updateClassInfo = this.updateClassInfo.bind(this)
    this.handleInput = this.handleInput.bind(this)
  }

  componentDidMount() {
    var user = JSON.parse(window.localStorage.getItem("user"))
    if (user == null || user.token == "") {
      window.location = "/"
    } else {
      this.setState({ user: user })
    }
  }

  login() {
    window.localStorage.setItem("user", "")
    window.location = "/"
  }

  updateClassInfo() {
    let url = "http://localhost:3333/class/" + this.state.class
    let app = this
    fetch(url, {
      method: 'GET',
      mode: 'cors',
      headers: {
        "authorization": this.state.user.token,
        "username": this.state.user.username
      }
    })
      .then(response => response.json())
      .then(function (res) {
        console.log(res)
        if (res.code === 200) {
          app.setState({
            classInfo: res.data
          })
        } else {
          alert(res.msg)
        }
      });
  }

  handleInput(e) {
    const name = e.target.name;
    this.setState({ [name]: e.target.value });
  }

  render() {
    const { classes } = this.props;

    return (
      <Layout>
        <div style={bg}>
          <Typography >
            用户名: {this.state.user.username}
          </Typography>
          <Typography >
            身份: {this.state.user.identity == 1 ? '学生' : '老师'}
          </Typography>
        </div>
        <button onClick={this.login}>
          退出登录
        </button>
        <input type="text" placeholder="请输入班级id" name="class" value={this.state.class} onChange={this.handleInput}></input>
        <button onClick={this.updateClassInfo}>
          查询
        </button>
        <Typography >
          当前班级成员：
        </Typography>
        {
          this.state.classInfo && this.state.classInfo.map((item, index) => (
            <div>
              <Typography >用户名 : {item.username} </Typography>
              <Typography >身份 : {item.identity == 1 ? '学生' : '老师'} </Typography>
            </div>
          ))
        }
      </Layout>
    );
  }
}

export default compose(withStyles(styles))(withRouter(Home));
