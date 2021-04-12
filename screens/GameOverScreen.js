import React from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import BodyText from "../components/BodyText";
import MainButtton from "../components/MainButton";
import TitleText from "../components/TitleText";
import Color from "../constant/color";

const GameOverScreen = (props) => {
  return (
    <View style={styles.screen}>
      <TitleText>Game Over</TitleText>
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/success.png")}
          resizeMode="cover"
          style={styles.image}
        />
      </View>
      <BodyText>
        Number of rounds :
        <Text style={styles.highlight}>{props.roundsNumber}</Text>
        Number was :<Text style={styles.highlight}> {props.userNumber}</Text>
      </BodyText>
      <MainButtton onPress={props.onRestart}>Game Over</MainButtton>
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: Dimensions.get("window").width * 0.6,
    height: Dimensions.get("window").width * 0.6,
    borderRadius: (Dimensions.get("window").width * 0.7) / 2,
    borderWidth: 3,
    borderColor: "black",
    overflow: "hidden",
    marginVertical: Dimensions.get("window").height / 40,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  highlight: {
    color: Color.primary,
  },
});

export default GameOverScreen;
