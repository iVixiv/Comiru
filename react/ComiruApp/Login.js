import React from "react";
import { View, Text, Button, TextInput, AsyncStorage } from "react-native";

class LoginPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.read()
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
      </View>
    );
  }
  read() {
    AsyncStorage.getItem('user', (error, result) => {
      var userInfo = JSON.parse(result)
      this.setState({
        username: userInfo.username,
        password: userInfo.password
      })
    })
  }
  login() {
    var userInfo = {
      password: this.state.password,
      username: this.state.username
    };
    AsyncStorage.setItem('user', JSON.stringify(userInfo), (error) => {
      if (error) {
        alert('存储失败');
      } else {
        alert('存储成功');
      }
    });
    this.props.navigation.navigate('Home')
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