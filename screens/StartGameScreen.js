import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Dimensions,
} from "react-native";
import BodyText from "../components/BodyText";
import Card from "../components/Card";
import Input from "../components/Input";
import MainButtton from "../components/MainButton";
import NumberContainer from "../components/NumberConatiner";
import Color from "../constant/color";
import DefaultStyle from "../constant/default-style";

const StartGameScreen = (props) => {
  const [enteredValue, SetenteredValue] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();
  const [buttonWidth, setButtonWidth] = useState(
    Dimensions.get("window").width / 4
  );
  //use so we can calculate the Dimenssions every time we swap the mobile screen
  useEffect(() => {
    const updateLayout = () => {
      setButtonWidth(Dimensions.get("window").width / 4);
    };
    Dimensions.addEventListener("change", updateLayout);
    return () => {
      Dimensions.removeEventListener("change", updateLayout);
    };
  });

  const numberInputText = (inputText) => {
    SetenteredValue(inputText.replace(/[^0-9]/g, ""));
  };
  const restInputHandler = () => {
    SetenteredValue("");
  };
  const confirmInputHandler = () => {
    const choseNumber = parseInt(enteredValue);
    if (isNaN(choseNumber) || choseNumber <= 0 || choseNumber > 99) {
      Alert.alert("Invalid input", "Number should be 1 to 99", [
        { text: "Okay", style: "destructive", onPress: restInputHandler },
      ]);
      return;
    }
    setConfirm(true);
    SetenteredValue("");
    setSelectedNumber(choseNumber);
    Keyboard.dismiss();
  };

  let confirmOutput;
  if (confirm) {
    confirmOutput = (
      <Card style={styles.summaryContainer}>
        <BodyText>Your Number</BodyText>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <MainButtton onPress={() => props.onStartGame(selectedNumber)}>
          Start Game
        </MainButtton>
      </Card>
    );
  }
  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="padding">
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <View style={styles.screen}>
            <Text style={DefaultStyle.title}> Start a New Game</Text>
            <Card style={styles.inputContainer}>
              <BodyText>Select a number</BodyText>
              <Input
                style={styles.input}
                blurOnSubmit
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="number-pad"
                maxLength={2}
                onChangeText={numberInputText}
                value={enteredValue}
              />
              <View style={styles.buttonContainer}>
                <View style={{ width: buttonWidth }}>
                  <Button
                    title="reset"
                    onPress={restInputHandler}
                    color={Color.accent}
                  />
                </View>
                <View style={{ width: buttonWidth }}>
                  <Button
                    title="Confirm"
                    onPress={confirmInputHandler}
                    color={Color.primary}
                  />
                </View>
              </View>
            </Card>
            {confirmOutput}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
  },
  inputContainer: {
    //width: 300,
    width: "80%",
    maxWidth: "100%",
    minWidth: 300,
    maxHeight: "80%",
    alignItems: "center",
    fontFamily: "open-sans-bold",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  // button: {
  //   width: Dimensions.get("window").width / 4,
  // },
  input: {
    width: 100,
    textAlign: "center",
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: "center",
  },
});
export default StartGameScreen;
