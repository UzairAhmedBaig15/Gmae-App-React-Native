import React from "react";
import { StyleSheet, View, Platform } from "react-native";
import Color from "../constant/color";
import TitleText from "./TitleText";

const Header = (props) => {
  return (
    <View
      style={{
        ...styles.header,
        ...Platform.select({ android: styles.headerAndriod }),
      }}
    >
      <TitleText style={styles.titleHeader}>{props.title}</TitleText>
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 90,
    paddingTop: 36,
    backgroundColor: Color.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  headerAndriod: {
    backgroundColor: "green",
  },
});
export default Header;
