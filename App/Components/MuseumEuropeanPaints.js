import React, { Component } from 'react';
import { 
  Image, 
  Text,
  View,
  ImageBackground
} from 'react-native';


class MuseumEuropeanPaints extends Component {
    constructor(){
        super();
        this.state = {
            paintImageUrl:[],
            title:[],
            objectId: 436890,
            im:null
        }
        this.getFirstPaint()
    }
    getNextPaint(){
        var objectId = 436865
        fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }).then((response)=>{
          if(response.ok){
              response.json().then((data)=>{
                  this.setState({paintImageUrl: data.primaryImage})
                //   console.log(data)
              })
          }
      }).catch((err)=>{
          console.log(err.message)
      }) 
    };
    getFirstPaint(){
        // var objectId = 436865
        fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${this.state.objectId}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }).then((response)=>{
        console.log(response.status)
          if(response.ok){
              response.json().then((data)=>{
                  console.log('from response data', data)
                  this.state.paintImageUrl.push(data.primaryImage)
                  this.state.title.push(data.title)
                  let nextObjectId = this.state.objectId
                  if(nextObjectId < 436910){
                    nextObjectId += 1
                      this.setState({objectId: nextObjectId})
                    //   const timer = setTimeout(() => {
                    //     this.getFirstPaint()
                    //   }, 1000);
                    //   return () => clearTimeout(timer);
                      return this.getFirstPaint()
                    } else {
                       return false  //stop recursion here
                  }
              })
          } else if(response.status == '404'){
              let nextObjectId = this.state.objectId
              nextObjectId += 1
              this.setState({objectId: nextObjectId})
              return this.getFirstPaint()
          } else {
              return false
          }
      }).catch((err)=>{
          console.log(err.message)
      }) 
    };
    renderImages(){
        let title = this.state.title
        let images =this.state.paintImageUrl
        var map = images.map((data, key) => {
           if(data !== ''){
            return (
                <>
                <Text style={{color:'#000'}}>{title[key]}</Text>
                <Image
                source={{uri: data}}
                resizeMode='contain'
                style={{ width: 400, height: 400, padding:0, margin:0}}
                /> 
                </>
            )
            } else {
                return false
            }
        });
        return map
    }
    render() {
        var im = this.state.paintImageUrl
        return (
            <View style={{alignItems:'center', marginTop:20}}> 
                {this.renderImages()}
               
                   
                   
                
                {/* <ImageBackground source={{uri :`${this.state.nasaPicOfTheDayUrl}`}} resizeMode='cover' style={{width: '100%', height: '100%'}}>
                    <Text style={{color:'#FFF', textAlign:'center'}}>{this.state.title}</Text>
                </ImageBackground> */}
            </View>
            // <Text>From Nasa component</Text>
        );
    }
}



export default MuseumEuropeanPaints
