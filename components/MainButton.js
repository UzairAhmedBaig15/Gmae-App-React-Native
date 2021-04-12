import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Color from "../constant/color";

const MainButtton = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{props.children}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 12,
    paddingHorizontal: 30,
    backgroundColor: Color.primary,
    borderRadius: 25,
  },
  buttonText: {
    color: "white",
    fontFamily: "open-sans",
    fontSize: 18,
  },
});

export default MainButtton;
