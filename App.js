import { StatusBar } from 'expo-status-bar';
import { Alert, View, Switch, ScrollView,  StyleSheet} from 'react-native';
import NumericInput from 'react-native-numeric-input';
import { MD3LightTheme as DefaultTheme, Button, Provider,RadioButton, Text, TextInput, MD3LightTheme, MD3DarkTheme} from 'react-native-paper';
import Style from './Styles/Style.js';
import {  useState } from 'react';
import { useFonts } from 'expo-font';
import React from 'react';

//Theme setups

const redTheme = {
  ...DefaultTheme,
  colors: {
      ...DefaultTheme.colors,
      background: '#D5BFBE',
      primary: '#8C6E6C',
  }
}

const blueTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
      background: '#BFCBD6',
      primary: '#637A8F',
    }
}




export default function App() {

  const [loaded] = useFonts({
    Exo2: require('./assets/fonts/Exo2-Medium.ttf'),
  });

  const [isDark, setIsDark] = useState(false);


//Alert for 0 weight
  const showAlert = () => {
    Alert.alert(
      "Hey!",
      "Don't forget to insert your weight!",
      [
        {
          text: 'Ok',
          onPress: () => console.log('ok')
        }
      ]
      );
  }

//Variable setup
  const [bottles, setBottles] = useState(1)
  const [weight, setWeight] = useState(0)
  const [gender, setGender] = useState('male')
  const [hours, setHours] = useState(1)
  const [result, setResult] = useState(0.00)


//Function to calculate the alcohol level
  function calculate(){

    if(weight <= 0) {
      showAlert()
    }
    else {

    const litres = bottles * 0.33
    const grams = litres * 8 * 4.5
    const burning = weight / 10
    const gramsLeft = grams - (burning * hours)
    let totalResult;
    console.log(redTheme.colors.backgroundColor)

    if (gender === "male") {
      totalResult = gramsLeft / (weight * 0.7)
      setResult(totalResult.toFixed(2))
    } else {
      totalResult = gramsLeft / (weight * 0.6)
      setResult(totalResult.toFixed(2))
    }
    if (totalResult <= 0 ){
      totalResult = 0
      setResult(totalResult)
    }
}
}
  //Coloring the result accordingly
    const getColor = () => {
      let color;
      if (result <= 1) {
        color = 'green'
      } else if (result > 1 && result < 2) {
         color = '#9c5b00'
      } else if (result >= 2) {
          color = 'red'
        }
        return color;

      }

  return (
    <Provider theme={ isDark ? redTheme : blueTheme}>
      <ScrollView contentContainerStyle={[Style.scrollView, {backgroundColor: isDark ? blueTheme.colors.background : redTheme.colors.background}]}>
      <View style={Style.container}>
        <StatusBar style="auto" />

        {/* Theme Switcher */}
        <Switch
        style={Style.themeSwitcher}
        value={isDark}
        thumbColor='darkgrey'
        trackColor={{false:'#8C6E6C', true: '#637A8F'}}
        onValueChange={ newValue =>  setIsDark(newValue) }
        />

        {/* Header */}
        <Text style={headerFont.header}>Alcometer</Text>

        {/* Weight input */}
        <Text style={Style.label}>Weight</Text>
        <TextInput placeHolder={weight} style={Style.textInput} keyboardType='number-pad' right={<TextInput.Icon icon ="scale" />} onChangeText={setWeight} />

        {/* Numeric input for bottles */}
        <Text style={Style.label}>Bottles</Text>
        <NumericInput style={Style.numeric} minValue={0} onChange={b => setBottles(b)}
        value={bottles} inputStyle={{backgroundColor: 'white'}} leftButtonBackgroundColor={'#bfd6c1'} rightButtonBackgroundColor={'#805454'} borderColor={'darkgrey'} rounded/>

        {/* Numeric input for hours */}
        <Text style={Style.label}>Hours</Text>
        <NumericInput style={Style.numeric} minValue={0}  onChange={h => setHours(h)}
        value={hours} inputStyle={{backgroundColor: 'white'}} leftButtonBackgroundColor={'#805454'} rightButtonBackgroundColor={'#bfd6c1'} borderColor={'darkgrey'} rounded/>

        {/* Radiobutton for gender */}
        <RadioButton.Group onValueChange={g => setGender(g)} value={gender}>
          <View style={Style.radioStyle}>
            <RadioButton value="male" />
            <Text style={Style.label}>Male</Text>
          </View>
          <View style={Style.radioStyle}>
            <RadioButton value="female"/>
            <Text style={Style.label}>Female</Text>
          </View>
        </RadioButton.Group>

        {/* Results */}
        <Text style=
        {[Style.result,
          {color:getColor()}]}>{result}</Text>

        {/* Button to calculate */}
        <Button mode="contained" title="Calculate" value="calculate" onPress={calculate} >Calculate</Button>
        </View>
      </ScrollView>

    </Provider>
  );
}


/* Additional font styling for header*/
const headerFont = StyleSheet.create({
  header: {
    fontFamily: 'Exo2',
    fontSize: 45,
    textAlign: 'center',
    color: '#637A8F'
  }
});