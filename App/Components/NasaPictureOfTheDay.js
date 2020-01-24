import React, { Component } from 'react';
import { 
  Image, 
  Text,
  View,
  ImageBackground
} from 'react-native';


class NasaPicOfTHeDay extends Component {
    constructor(){
        super();
        this.state = {
            nasaPicOfTheDayUrl:'',
            title:'',
        }
        this.getNasaPicOfTheDay()
    }
    getNasaPicOfTheDay(){
        fetch('https://api.nasa.gov/planetary/apod?api_key=SQ65mKgJbnforeihsspfIZmOKL5rdRhqdGEsEx22', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }).then((response)=>{
          if(response.ok){
              response.json().then((data)=>{
                  this.setState({nasaPicOfTheDayUrl: data.url, title: data.title})
              })
          }
      }).catch((err)=>{
          console.log(err.message)
      }) 
    }
    render() {
        return (
            <View style={{height:250}}> 
                {/* <Text>From Nasa component</Text> */}
                {/* <Image
                    source={{uri :`${this.state.nasaPicOfTheDayUrl}`}}
                    resizeMode='contain'
                    style={{ width: 150, height: 150, padding:0, margin:0}}
                /> */}
                <ImageBackground source={{uri :`${this.state.nasaPicOfTheDayUrl}`}} resizeMode='cover' style={{width: '100%', height: '100%'}}>
                    <Text style={{color:'#FFF', textAlign:'center'}}>{this.state.title}</Text>
                </ImageBackground>
            </View>
            // <Text>From Nasa component</Text>
        );
    }
}



export default NasaPicOfTHeDay
