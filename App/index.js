import React, { Component } from 'react';
import { 
  SafeAreaView, 
  StyleSheet, 
  ScrollView, 
  View, 
  Text,
  StatusBar, 
  TouchableOpacity,
  Image
} from 'react-native';
import {Header, LearnMoreLinks, Colors, DebugInstructions, ReloadInstructions } from 'react-native/Libraries/NewAppScreen';
import NasaPicOfTheDay from './Components/NasaPictureOfTheDay';
import MuseumEuropeanPaints from './Components/MuseumEuropeanPaints';
import MuseumEuropeanSculptures from './Components/MuseumEuropeanSculptures';
import Drawer from 'react-native-drawer';
import Icon from 'react-native-vector-icons/dist/Entypo';
import Loading from 'react-native-whc-loading'

// import MuseumEuropeanSculptures from './Components/MuseumEuropeanSculptures';

class App extends Component {
  constructor(){
    super();
    this.state = {
      sculptures: false,
      paints: true,
      openedDrawer: false,
    }
  };

  closeDrawer = () => {
    this.drawer.close()
  };
  openDrawer = () => {
    this.drawer.open()
  };
  wichTorender(){
    var paints = <MuseumEuropeanPaints />
    var sculptures = <MuseumEuropeanSculptures />
    if(this.state.sculptures == false){
      return paints
    } else {
      return sculptures
    }
  }
  render() {
    var drawer = (
        <View style={{ flex: 1, backgroundColor: '#000000' }}>
          <Text style={{ marginLeft:0, color: '#FFF', marginTop: 30, fontSize: 25, }}>ArtiSplendore</Text>
          <View style={{ flex: 1, justifyContent: 'center', marginBottom: 0 }}>
            <TouchableOpacity onPress={() => this.setState({sculptures: true, paints: false, openedDrawer: false})}>
              <Text style={{ color: '#FFF', marginLeft: 20, marginBottom: 30, fontFamily: 'OpenSans-Bold' }}> Sculptures  </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({sculptures: false, paints: true, openedDrawer: false})}>
              <Text style={{ color: '#FFF', marginLeft: 20, marginBottom: 30, fontFamily: 'OpenSans-Bold' }}> Paints  </Text>
            </TouchableOpacity>
          </View>
        </View>
    );
    return (
      <Drawer 
      renderNavigationView={() => drawer}
      content={drawer}
      type="overlay"
      open={this.state.openedDrawer}
      tapToClose={true}
      openDrawerOffset={0.4}
      ref={_drawer => (this.drawer = _drawer)}>            
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <TouchableOpacity style={{backgroundColor:'#000000'}} onPress={this.openDrawer.bind(this)} >
            <Icon name="menu" style={{marginLeft:10}} size={30} color="#ffffff" />
          </TouchableOpacity>
          <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
            <View style={styles.body}>
              <Loading ref="loading"/>
              <NasaPicOfTheDay />
              {this.wichTorender()}
            </View>
          </ScrollView>
        </SafeAreaView>
        {/* <Routes /> */}
      </Drawer>
    );
  }
}

const styles = StyleSheet.create({
scrollView: {
    backgroundColor: '#d0bcb5',
  },
  
  body: {
    backgroundColor: '#d0bcb5',
  },
});


export default App
