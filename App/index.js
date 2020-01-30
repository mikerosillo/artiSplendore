import React, { Component } from 'react';
import { 
  SafeAreaView, 
  StyleSheet, 
  ScrollView, 
  View, 
  Text,
  StatusBar, 
  TouchableOpacity,
} from 'react-native';
import NasaPicOfTheDay from './Components/NasaPictureOfTheDay';
import MuseumEuropeanPaints from './Components/MuseumEuropeanPaints';
import MuseumEuropeanSculptures from './Components/MuseumEuropeanSculptures';
import Drawer from 'react-native-drawer';
import Icon from 'react-native-vector-icons/dist/Entypo';
import SplashScreen from 'react-native-splash-screen';
import Connect_socketIo from './Components/Connect_socketIo';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      sculptures: false,
      paints: true,
      nasa: false,
      openedDrawer: false,
      chat: false,
      chatMessage: "",
      chatMessages: []
    }
  };
  componentDidMount() {
    SplashScreen.hide()
  };

  closeDrawer = () => {
    this.drawer.close()
  };
  openDrawer = () => {
    this.drawer.open()
  };
  wichTorender(){
    let nasa = <NasaPicOfTheDay />
    let paints = <MuseumEuropeanPaints />
    let sculptures = <MuseumEuropeanSculptures />
    if(this.state.sculptures == false && this.state.nasa == false && this.state.chat == false && this.state.paints == true){
      return paints
    } else if(this.state.paints == false && this.state.nasa == false && this.state.chat == false && this.state.sculptures == true) {
      return sculptures
    } else if(this.state.paints == false  && this.state.sculptures == false && this.state.chat == false && this.state.nasa == true) {
      return nasa
    }
  };
  render() {
    var drawer = (
        <View style={{ flex: 1, backgroundColor: '#000000' }}>
          <Text style={{ marginLeft:0, color: '#FFF',marginLeft: 20, marginTop: 30, fontSize: 25, }}>ArtiSplendore</Text>
          <View style={{ flex: 1, justifyContent: 'center', marginBottom: 0 }}>
            <TouchableOpacity onPress={() => this.setState({sculptures: false, paints: true,chat: false,nasa: false, openedDrawer: false})}>
              <Text style={{ color: '#FFF', marginLeft: 20, marginBottom: 30, fontFamily: 'OpenSans-Bold' }}> Paints  </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({sculptures: true, paints: false,nasa:false, chat:false, openedDrawer: false})}>
              <Text style={{ color: '#FFF', marginLeft: 20, marginBottom: 30, fontFamily: 'OpenSans-Bold' }}> sculpture  </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({sculptures: false, paints: false, openedDrawer: false, chat: false, nasa: true})}>
              <Text style={{ color: '#FFF', marginLeft: 20, marginBottom: 30, fontFamily: 'OpenSans-Bold' }}> Nasa picture of the day  </Text>
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
            <Icon name="menu" style={{padding:20}} size={30} color="#ffffff" />
          </TouchableOpacity>
          <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
            <View style={styles.body}> 
              <Connect_socketIo />
              {this.wichTorender()}
            </View>
          </ScrollView>
        </SafeAreaView>
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