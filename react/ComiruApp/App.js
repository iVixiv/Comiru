// In App.js in a new project

import React from "react";
import OneSignal from "react-native-onesignal";
import { View, Text, AsyncStorage, StyleSheet, Button, TextInput, FlatList } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import Login from "./Login"
import WatchPage from "./watch";

class HomeScreen extends React.Component {

  constructor(properties) {
    super(properties);
    this.state = {
      user: null,
      classInfo: [],
      class_id: '1'
    };
    OneSignal.init("a7a034f9-48b7-4701-9d72-bcce27d09c08");
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
  }

  componentDidMount() {
    AsyncStorage.getItem('user', (error, result) => {
      if (result != null && result != null) {
        var user = JSON.parse(result)
        this.setState({
          user: user,
          class_id: user.class
        })
        OneSignal.sendTag("user_id", user.id + "")
      }
    })

  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived(notification) {
    console.log("Notification received: ", notification);
  }

  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  onIds(device) {
    console.log('Device info: ', device);
  }

  loginOut() {
    AsyncStorage.setItem('user', "", (error) => {
      if (error) {
        alert('存储失败');
      } else {
        alert('退出登录成功')
      }
      this.props.navigation.navigate('Login')
    });
  }

  updateClassInfo() {
    let url = "http://api.v2code.online/class/" + this.state.class_id
    let app = this
    console.log(this.state.user.token)
    fetch(url, {
      method: 'GET',
      mode: 'cors',
      headers: {
        "authorization": this.state.user.token,
        "username": this.state.user.username
      }
    })
      .then(response =>
        response.json()
      )
      .then(function (res) {
        if (res.code === 200) {
          app.setState({
            classInfo: res.data
          })
        } else if (res.code === 401) {
          app.loginOut()
        } else {
          console.log(res.msg)
        }
      }).catch((error) => { console.log(error) });
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center" }}>
        <View style={styles.user_layout}>
          <Text style={styles.user_text}>
            ID: {this.state.user && this.state.user.id}
          </Text>
          <Text style={styles.user_text}>
            用户名: {this.state.user && this.state.user.username}
          </Text>
          <Text style={styles.user_text}>
            身份: {this.state.user && this.state.user.identity == 1 ? '学生' : '老师'}
          </Text>
          <Button title="退出登录" onPress={() => this.loginOut()} />
        </View>
        <Button title="关注列表" onPress={() => this.props.navigation.navigate('Watch')} />
        <View style={styles.class_layout}>
          <View style={styles.class_input_view}>
            <Button title="查询" style={styles.btn} onPress={() => this.updateClassInfo()}></Button>
            <TextInput
              style={styles.input}
              placeholder="请输入班级id"
              onChangeText={(class_id) => this.setState({ class_id })}
              value={this.state.class_id}
            />
          </View>
          <Text style={styles.user_text}>
            当前班级成员：
          </Text>
          <FlatList
            data={this.state.classInfo}
            renderItem={({ item }) =>
              <View style={styles.userDiv}>
                <Text style={styles.username}>用户名 : {item.username} </Text>
                <Text >身份 : {item.identity == 1 ? '学生' : '老师'} </Text>
              </View>}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  user_layout: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  class_layout: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  title: {
    fontSize: 40,
    fontFamily: 'NotoSansHans',
    marginBottom: 40
  },
  input: {
    width: 300,
    height: 40,
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
  username: {
    width: 200,
    margin: 0
  }
});

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Login: Login,
    Watch: WatchPage
  },
  {
    initialRouteName: "Login"
  }
);

export default createAppContainer(AppNavigator);