import React, { Component } from 'react';
import { 
  SafeAreaView, 
  StyleSheet, 
  ScrollView, 
  View, 
  Text,
  StatusBar, 
} from 'react-native';
import {Header, LearnMoreLinks, Colors, DebugInstructions, ReloadInstructions } from 'react-native/Libraries/NewAppScreen';
// import NasaPicOfTheDay from './Components/NasaPictureOfTheDay';
import MuseumEuropeanPaints from './Components/MuseumEuropeanPaints';

class App extends Component {
  render() {
    return (
        <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
            <ScrollView
            // contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
                <View style={styles.body}>
                    {/* <NasaPicOfTheDay /> */}
                    <MuseumEuropeanPaints />
                </View>
            </ScrollView>
        </SafeAreaView>
       {/* <Routes /> */}
    </>
    );
  }
}

const styles = StyleSheet.create({
scrollView: {
    backgroundColor: Colors.lighter,
  },
  
  body: {
    backgroundColor: Colors.white,
  },
});


export default App
