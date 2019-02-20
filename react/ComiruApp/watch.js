import React from "react";
import { View, Text, Button, TextInput, AsyncStorage, FlatList } from "react-native";

class WatchPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      watch: [],
      userList: [],
      user: null
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('user', (error, result) => {
      if (result != null && result != null) {
        var user = JSON.parse(result)
        this.setState({
          user: user,
          class_id: user.class
        })
      }
    })
  }

  _keyExtractor = (item, index) => parseInt(item.id);

  render() {
    return (
      <View style={styles.root}>
        <View style={styles.user_layout}>
          <Button style={styles.btn} title="查询" onPress={() => this.updateWatch()} />
          <Text style={styles.user_text}>关注列表:</Text>
          <FlatList
            data={this.state.watch}
            keyExtractor={this._keyExtractor}
            renderItem={({ item }) =>
              <View style={styles.userDiv}>
                <Text style={styles.username}>用户名 : {item.username} </Text>
                <Button title="取消关注" onPress={() => this.unWatch(item)}></Button>
              </View>
            } />
        </View>
        <View style={styles.user_layout}>
          <Button style={styles.btn} title="查询" onPress={() => this.updateUserInfo()} />
          <Text style={styles.user_text}>用户列表:</Text>
          <FlatList
            keyExtractor={this._keyExtractor}
            data={this.state.userList}
            renderItem={({ item }) =>
              <View style={styles.userDiv}>
                <Text style={styles.username}>用户名 : {item.username} </Text>
                <Button title={item.unWatch == 0 ? `取消关注` : `关注`} onPress={() => this.handleWatch(item)} />
              </View>
            } />
        </View>
      </View>
    );
  }
  updateWatch() {
    let url = "http://api.v2code.online/watched/" + (this.state.user && this.state.user.id)
    let app = this
    console.log(url)
    fetch(url, {
      method: 'GET',
      mode: 'cors',
      headers: {
        "authorization": this.state.user.token,
        "username": this.state.user.username
      }
    })
      .then(response => {
        console.log(response)
        return response.json()
      })
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
      }).catch((error) => {
        alert(error)
      });
  }

  updateUserInfo() {
    let url = "http://api.v2code.online/watch/" + (this.state.user && this.state.user.id)
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
      }).catch((error) => {
        alert(error)
      });
  }
  handleWatch(item) {
    if (item.unWatch == 0) {
      this.unWatch(item)
    } else {
      this.Watch(item)
    }
  }
  Watch(item) {
    let url = "http://api.v2code.online/watch"
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
          app.updateListState(app, item)
        } else if (res.code === 401) {
          alert(res.msg)
          app.loginOut()
        } else {
          alert(res.msg)
        }
      });
  }

  updateListState(app, result) {
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
    console.log(watch)
    app.setState({
      userList: list,
      watch: watch
    })
  }

  unWatch(item) {
    let url = "http://api.v2code.online/unwatch"
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
          app.updateListState(app, item)
        } else if (res.code === 401) {
          alert(res.msg)
          app.loginOut()
        } else {
          alert(res.msg)
        }
      });
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
    flexDirection: 'row',
  },
  userDiv: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  username: {
    width: 200,
    margin: 0
  }
}
export default WatchPage;