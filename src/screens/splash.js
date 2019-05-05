import React from "react";
import { View, Text, StatusBar } from "react-native";
import Styles, { COLOR } from "../config/styles";

const Splash = () => (
  <View
    style={[
      Styles.container,
      {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLOR.DARK
      }
    ]}
  >
    <StatusBar backgroundColor={COLOR.PANTOME} barStyle="light-content" />
    <Text style={{ color: COLOR.PANTOME, fontSize: 36, fontWeight: "bold" }}>
      React Native Redux Login Authentication
    </Text>
  </View>
);

export default Splash;
