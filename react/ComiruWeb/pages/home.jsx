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
      classInfo: [],
      watch: [],
      userList: [],
      message: ""
    };
    this.updateClassInfo = this.updateClassInfo.bind(this)
    this.updateWatch = this.updateWatch.bind(this)
    this.unWatch = this.unWatch.bind(this)
    this.Watch = this.Watch.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.handleWatch = this.handleWatch.bind(this)
    this.updateUserInfo = this.updateUserInfo.bind(this)
    this.postMessage = this.postMessage.bind(this)
  }

  componentDidMount() {
    var user = JSON.parse(window.localStorage.getItem("user"))
    if (user == null || user.token == "") {
      window.location = "/"
    } else {
      this.setState({ user: user })
      // this.updateClassInfo()
      // this.updateWatch()
    }
  }

  loginOut() {
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
        } else if (res.code === 401) {
          alert(res.msg)
          app.loginOut()
        } else {
          alert(res.msg)
        }
      });
  }

  updateWatch() {
    let url = "http://localhost:3333/watched/" + (this.state.user && this.state.user.id)
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
            watch: res.data
          })
        } else if (res.code === 401) {
          alert(res.msg)
          app.loginOut()
        } else {
          alert(res.msg)
        }
      });
  }

  updateUserInfo() {
    let url = "http://localhost:3333/watch/" + (this.state.user && this.state.user.id)
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
            userList: res.data
          })
        } else if (res.code === 401) {
          alert(res.msg)
          app.loginOut()
        } else {
          alert(res.msg)
        }
      });
  }

  Watch(e) {
    let url = "http://localhost:3333/watch"
    let app = this
    let data = {
      user_id: this.state.user.id,
      w_id: parseInt(e.target.name)
    }
    fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        "authorization": this.state.user.token,
        "username": this.state.user.username
      },
      body: JSON.stringify(data, null, 2)
    })
      .then(response => response.json())
      .then(function (res) {
        console.log(res)
        if (res.code === 200) {
          app.setState({
            watch: res.data
          })
        } else if (res.code === 401) {
          alert(res.msg)
          app.loginOut()
        } else {
          alert(res.msg)
        }
      });
  }

  unWatch(e) {
    let url = "http://localhost:3333/unwatch"
    let app = this
    let data = {
      user_id: this.state.user.id,
      w_id: parseInt(e.target.name)
    }
    fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        "authorization": this.state.user.token,
        "username": this.state.user.username
      },
      body: JSON.stringify(data, null, 2)
    })
      .then(response => response.json())
      .then(function (res) {
        console.log(res)
        if (res.code === 200) {
          app.setState({
            watch: res.data
          })
        } else if (res.code === 401) {
          alert(res.msg)
          app.loginOut()
        } else {
          alert(res.msg)
        }
      });
  }

  postMessage(e) {
    let url = "http://localhost:3333/push/" + (this.state.user && this.state.user.id)
    let app = this
    let data = {
      message: this.state.message
    }
    fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        "authorization": this.state.user.token,
        "username": this.state.user.username
      },
      body: JSON.stringify(data, null, 2)
    })
      .then(response => response.json())
      .then(function (res) {
        console.log(res)
        if (res.code === 200) {
          alert(res.msg)
        } else if (res.code === 401) {
          alert(res.msg)
          app.loginOut()
        } else {
          alert(res.msg)
        }
      });
  }

  handleWatch(e) {
    if (e.target.key == 0) {
      this.unWatch(e)
    } else {
      this.Watch(e)
    }
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
            ID: {this.state.user.id}
          </Typography>
          <Typography >
            用户名: {this.state.user.username}
          </Typography>
          <Typography >
            身份: {this.state.user.identity == 1 ? '学生' : '老师'}
          </Typography>
        </div>
        <input type="text" placeholder="请输入要退送的消息" name="message" value={this.state.message} onChange={this.handleInput}></input>
        <button onClick={this.postMessage}>
          推送
        </button>
        <button onClick={this.loginOut}>
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
        <Typography >
          关注列表:
        </Typography>
        <button onClick={this.updateWatch}>
          查询
        </button>
        {
          this.state.watch && this.state.watch.map((item, index) => (
            <div>
              <Typography >用户名 : {item.username} </Typography>
              <button name={item.id} onClick={this.unWatch}>
                取消关注
              </button>
            </div>
          ))
        }
        <Typography >
          用户列表:
        </Typography>
        <button onClick={this.updateUserInfo}>
          查询
        </button>
        {
          this.state.userList && this.state.userList.map((item, index) => (
            <div>
              <Typography >用户名 : {item.username} </Typography>
              <button key={item.unWatch} name={item.id} onClick={this.handleWatch}>
                {item.unWatch == 0 ? `取消关注` : `关注`}
              </button>
            </div>
          ))
        }
      </Layout>
    );
  }
}

export default compose(withStyles(styles))(withRouter(Home));
