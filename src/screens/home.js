import React, { Component } from "react";
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  Button,
  FlatList
} from "react-native";

import CustomButton from "../components/button";
import CustomLoading from "../components/loading";
import DrawerHeader from "../components/header";

import Styles, { COLOR } from "../config/styles";

import Icon from "react-native-vector-icons/FontAwesome";

import { bindActionCreators } from "redux";
import * as authActions from "../actions/authenticate";
import { connect } from "react-redux";
import { List, ListItem, SearchBar } from "react-native-elements";

//import ajax from "./FetchData";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      page: 1,
      seed: 1
    };
  }
  componentDidMount() {
    const { page, seed } = this.state;
    const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`;
    fetch(url)
      .then(res => res.json())
      .then(res => {
        console.log(JSON.stringify(res));
        this.setState({
          data: page === 1 ? res.results : [...this.state.data, ...res.results],
          error: res.error || null,
          loading: false,
          refreshing: false
        });
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  }

  render() {
    return (
      <View style={[Styles.container, { padding: 0 }]}>
        <View style={Styles.header}>
          <DrawerHeader
            headerTitle="Home"
            icon="menu"
            onPress={() => this.props.navigation.openDrawer()}
          />
        </View>
        <View
          style={{
            backgroundColor: "blue",
            left: 16,
            right: 16
          }}
        >
          <FlatList
            data={this.state.data}
            renderItem={({ item }) => (
              <ListItem
                roundAvatar
                title={`${item.name.first} ${item.name.last}`}
                subtitle={item.email}
              />
            )}
          />
        </View>
        <View
          style={{
            position: "absolute",
            bottom: 32,
            left: 16,
            right: 16,
            height: 40
          }}
        >
          <CustomButton
            onPress={this.props.actions.logout}
            title={"SIGN OUT"}
          />
        </View>
        <CustomLoading
          text={"Signing you out..."}
          loading={this.props.state.clearingAuth}
        />
      </View>
    );
  }
}

export default connect(
  state => ({ state: state.authenticate }),
  dispatch => ({
    actions: bindActionCreators(authActions, dispatch)
  })
)(Home);
