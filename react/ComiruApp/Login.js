import React from "react";
import { View, Text, Button, TextInput, AsyncStorage } from "react-native";

class LoginPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  static navigationOptions = {
    title: 'Login',
  };

  render() {
    return (
      <View style={styles.root}>
        <Text style={styles.title}>Welcome to Comiru</Text>
        <TextInput
          style={styles.input}
          placeholder="请输入用户名"
          onChangeText={(username) => this.setState({ username })}
          value={this.state.username}
        />
        <View style={styles.inputLine} />
        <TextInput
          style={styles.input}
          placeholder="请输入密码"
          onChangeText={(password) => this.setState({ password })}
          value={this.state.password}
        />
        <View style={styles.inputLine} />
        <View style={styles.space} />
        <Button
          title="登录"
          onPress={() =>
            this.login()
          }
        />
        <Button
          title="注册"
          onPress={() =>
            this.register()
          }
        />
      </View>
    );
  }

  register() {
    var user = {
      username: this.state.username,
      password: this.state.password,
      class: "1",
      identity: 1
    }
    if (user.name == "" || user.password == "") {
      alert("账号密码不能为空")
    } else {
      let url = global.app.host + '/user/register';
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
        } else {
          alert(res.msg)
        }
      });
    }
  }
  login() {
    let page = this
    var data = {
      username: this.state.username,
      password: this.state.password
    }
    if (data.name == "" || data.password == "") {
      alert("账号密码不能为空")
    } else {
      fetch(global.app.host + '/user/login', {
        method: 'POST',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: JSON.stringify(data, null, 2)
      }).then(response =>
        response.json()
      ).then(function (res) {
        console.log(res)
        if (res.code === 200) {
          AsyncStorage.setItem('user', JSON.stringify(res.data), (error) => {
            if (error) {
              alert('存储失败');
            } else {
            }
            page.props.navigation.navigate('Home')
          });
        } else {
          alert(res.msg)
        }
      });
    }
  }
}




const styles = {
  root: {
    display: "flex",
    flex: 1,
    alignItems: "center"
  },
  title: {
    marginTop: 100,
    textAlign: "center",
    fontSize: 20,
    color: "#333"
  },
  input: {
    marginTop: 30,
    width: "80%",
    height: 50,
  },
  inputLine: {
    width: "80%",
    height: 1,
    backgroundColor: "#555"
  },
  space: {
    height: 50
  },
}
export default LoginPage;