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
    width: 80,
    height: 30,
  },
  message: {
    height: 40,
    marginRight: 30,
    marginBottom: 30
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
  },
  user_layout: {
    display: 'flex',
    alignItems: 'left',
    flexDirection: 'column',
    flex: 1,
    fontFamily: 'NotoSansHans'
  },
  user_text: {
    fontSize: 16,
    padding: 0,
    marginLeft: 30,
    marginTop: 0,
    marginBottom: 10
  },
  head: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    width: '100%',
    fontFamily: 'NotoSansHans'
  },
  line: {
    width: '100%',
    height: 1,
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: "#aaa"
  },
  class_input_view: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'left',
    flexDirection: 'row',
  },
  userDiv: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'left',
    flexDirection: 'row',
  },
  username: {
    width: 200,
    margin: 0
  }
});

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
    this.updateListState = this.updateListState.bind(this)
  }

  componentDidMount() {
    var user = JSON.parse(window.localStorage.getItem("user"))
    if (user == null || user.token == "") {
      Router.push('/')
    } else {
      this.setState({ user: user })
      // this.updateClassInfo()
      // this.updateWatch()
    }
  }

  loginOut() {
    window.localStorage.setItem("user", "")
    Router.push('/')
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

  Watch(item) {
    let url = "http://localhost:3333/watch"
    let app = this
    let data = {
      user_id: this.state.user.id,
      w_id: parseInt(item.id)
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
          alert("关注成功")
          item.unWatch = 0
          app.updateListState(item)
        } else if (res.code === 401) {
          alert(res.msg)
          app.loginOut()
        } else {
          alert(res.msg)
        }
      });
  }

  updateListState(result) {
    let list = this.state.userList
    let watch = this.state.watch
    list.map((item, index) => {
      if (item.id == result.id) {
        item.unWatch = result.unWatch
      }
    })
    if (result.unWatch == 1) {
      watch.splice(watch.findIndex(item => item.id === result.id), 1)
    } else {
      watch.push(result)
    }

    this.setState({
      userList: list,
      watch: watch
    })
  }

  unWatch(item) {
    let url = "http://localhost:3333/unwatch"
    let app = this
    let data = {
      user_id: this.state.user.id,
      w_id: parseInt(item.id)
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
          item.unWatch = 1
          alert("取消关注成功")
          app.updateListState(item)
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

  handleWatch(item) {
    if (item.unWatch == 0) {
      this.unWatch(item)
    } else {
      this.Watch(item)
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
          <Typography className={classes.title}>管理中心</Typography>
          <div className={classes.head}>
            <div className={classes.user_layout}>
              <Typography className={classes.user_text}>
                ID: {this.state.user.id}
              </Typography>
              <Typography className={classes.user_text}>
                用户名: {this.state.user.username}
              </Typography>
              <Typography className={classes.user_text}>
                身份: {this.state.user.identity == 1 ? '学生' : '老师'}
              </Typography>
              <button className={classes.btn} onClick={this.loginOut}>
                退出登录
            </button>
            </div>
            <div className={classes.user_layout}>
              <input type="text" className={classes.message} placeholder="请输入要推送的消息" name="message" value={this.state.message} onChange={this.handleInput}></input>
              <button className={classes.btn} onClick={this.postMessage}>
                推送
              </button>
              <Typography className={classes.user_text}>
                *默认推送给该登录用户
              </Typography>
            </div>
          </div>
          <div className={classes.line} />

          <div className={classes.head}>
            <div className={classes.user_layout}>
              <div className={classes.class_input_view}>
                <button className={classes.btn} onClick={this.updateClassInfo}>
                  查询
                </button>
                <input className={classes.input} type="text" placeholder="请输入班级id" name="class" value={this.state.class} onChange={this.handleInput}></input>
              </div>
              <Typography className={classes.user_text}>
                当前班级成员：
              </Typography>

              {
                this.state.classInfo && this.state.classInfo.map((item, index) => (
                  <div key={index} className={classes.userDiv}>
                    <Typography className={classes.username}>用户名 : {item.username} </Typography>
                    <Typography >身份 : {item.identity == 1 ? '学生' : '老师'} </Typography>
                  </div>
                ))
              }
            </div>
            <div className={classes.user_layout}>
              <button className={classes.btn} onClick={this.updateWatch}>
                查询
              </button>
              <Typography className={classes.user_text}>
                关注列表:
             </Typography>
              {
                this.state.watch && this.state.watch.map((item, index) => (
                  <div key={index} className={classes.userDiv}>
                    <Typography className={classes.username}>用户名 : {item.username} </Typography>
                    <button key={item.id} name={item.unWatch} onClick={this.unWatch.bind(this, item)}>
                      取消关注
                    </button>
                  </div>
                ))
              }
            </div>
            <div className={classes.user_layout}>
              <button className={classes.btn} onClick={this.updateUserInfo}>
                查询
              </button>
              <Typography className={classes.user_text}>
                用户列表:
              </Typography>
              {
                this.state.userList && this.state.userList.map((item, index) => (
                  <div key={index} className={classes.userDiv}>
                    <Typography className={classes.username}>用户名 : {item.username} </Typography>
                    <button value={item} key={item.id} name={item.unWatch} onClick={this.handleWatch.bind(this, item)}>
                      {item.unWatch == 0 ? `取消关注` : `关注`}
                    </button>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default compose(withStyles(styles))(withRouter(Home));
