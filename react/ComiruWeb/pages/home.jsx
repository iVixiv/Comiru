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
      user: {}
    };
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

  render() {
    const { classes } = this.props;

    return (
      <Layout>
        <div style={bg}>
          <Typography >
            用户名: {this.state.user.username}
          </Typography>
          <Typography >
            身份: {this.state.user.identity}
          </Typography>
        </div>
        <button onClick={this.login}>
          退出登录
        </button>
        
        <Typography >
          当前班级信息：
        </Typography>
      </Layout>
    );
  }
}

export default compose(withStyles(styles))(withRouter(Home));
