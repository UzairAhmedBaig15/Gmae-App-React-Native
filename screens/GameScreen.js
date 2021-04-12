import React, { useState, useRef, useEffect } from "react";

import {
  View,
  StyleSheet,
  Text,
  Alert,
  FlatList,
  Dimensions,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

import NumberContainer from "../components/NumberConatiner";
import Card from "../components/Card";
import MainButtton from "../components/MainButton";
import BodyText from "../components/BodyText";

const generateRandomBetween = (min, max, exculde) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const randNum = Math.floor(Math.random() * (max - min)) + min;
  if (randNum == exculde) {
    return generateRandomBetween(min, max, exculde);
  } else {
    return randNum;
  }
};
// const renderListItem = (value, numberOfRound) => (
//   <View key={value} style={styles.listItem}>
//     <BodyText>#{numberOfRound}</BodyText>
//     <BodyText>{value}</BodyText>
//   </View>
// );
const renderListItem = (listLength, itemData) => (
  <View style={styles.listItem}>
    <BodyText>#{listLength - itemData.index}</BodyText>
    <BodyText>{itemData.item}</BodyText>
  </View>
);
const GameScreen = (props) => {
  const initialGuess = generateRandomBetween(1, 100, props.userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  // const [rounds, setRounds] = useState(0);
  const [availableDeviceHeight, setavailableDeviceHeight] = useState(
    Dimensions.get("window").height
  );

  const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
  const currentLow = useRef(1);
  const currentHigh = useRef(100);
  const { userChoice, onGameOver } = props;
  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice, onGameOver]);

  useEffect(() => {
    const updateLayout = () => {
      setavailableDeviceHeight(Dimensions.get("window").height);
    };
    Dimensions.addEventListener("change", updateLayout);
    return () => {
      Dimensions.removeEventListener("change", updateLayout);
    };
  });

  const nextGuessHandler = (direction) => {
    if (
      (direction === "lower" && currentGuess < props.userChoice) ||
      (direction === "greater" && currentGuess > props.userChoice)
    ) {
      Alert.alert("Incorrect", "Your Guess Is Wrong", [
        { text: "Okay", style: "destructive" },
      ]);
      return;
    }
    if (direction === "lower") {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }
    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);
    // setRounds((curRounds) => curRounds + 1);
    setPastGuesses((curPastGuesses) => [
      nextNumber.toString(),
      ...curPastGuesses,
    ]);
  };

  if (availableDeviceHeight < 400) {
    return (
      <View style={styles.screen}>
        <Text>Opponent's Guess</Text>
        <View style={styles.Horizantalstyle}>
          <MainButtton onPress={nextGuessHandler.bind(this, "lower")}>
            <AntDesign name="left" size={28} color="white" />
          </MainButtton>
          <NumberContainer>{currentGuess}</NumberContainer>
          <MainButtton onPress={nextGuessHandler.bind(this, "greater")}>
            <AntDesign name="right" size={28} color="white" />
          </MainButtton>
        </View>
        <View style={styles.listContainer}>
          <FlatList
            contentContainerStyle={styles.list}
            keyExtractor={(item) => item}
            data={pastGuesses}
            renderItem={renderListItem.bind(this, pastGuesses.length)}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Text>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButtton onPress={nextGuessHandler.bind(this, "lower")}>
          <AntDesign name="left" size={28} color="white" />
        </MainButtton>
        <MainButtton onPress={nextGuessHandler.bind(this, "greater")}>
          <AntDesign name="right" size={28} color="white" />
        </MainButtton>
      </Card>
      <View style={styles.listContainer}>
        {/* <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((guess, index) =>
            renderListItem(guess, pastGuesses.length - index)
          )}
        </ScrollView> */}
        <FlatList
          contentContainerStyle={styles.list}
          keyExtractor={(item) => item}
          data={pastGuesses}
          renderItem={renderListItem.bind(this, pastGuesses.length)}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    //marginTop:Dimension.get('window').height > 600 ? 20:5,
    marginTop: 20,
    width: 300,
    maxWidth: "90%",
  },
  listItem: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "60%",
  },
  list: {
    flexGrow: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  listContainer: {
    width: "100%",
    flex: 1,
  },
  Horizantalstyle: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "40%",
    alignItems: "center",
  },
});

export default GameScreen;
