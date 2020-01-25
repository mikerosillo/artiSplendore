import React, { Component } from 'react';
import { 
  Image, 
  Text,
  View,
  ImageBackground,
  StyleSheet
} from 'react-native';


class MuseumEuropeanPaints extends Component {
    constructor(){
        super();
        this.state = {
            paintImageUrl:[],
            title:[],
            objectId: 436865,
            artistDisplayName:[],
            artistBeginDate:[],
            artistEndDate:[],
            creditLine:[],
            artistDisplayBio:[],
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
                  this.state.artistDisplayName.push(data.artistDisplayName)
                  this.state.artistBeginDate.push(data.artistBeginDate)
                  this.state.artistEndDate.push(data.artistEndDate)
                  this.state.creditLine.push(data.creditLine)
                  this.state.artistDisplayBio.push(data.artistDisplayBio)
                  let nextObjectId = this.state.objectId
                  if(nextObjectId <= 436870){
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
        let artistDisplayName = this.state.artistDisplayName
        let artistBeginDate = this.state.artistBeginDate
        let artistEndDate = this.state.artistEndDate
        let creditLine = this.state.creditLine
        let artistDisplayBio = this.state.artistDisplayBio
        // console.log(artistBegingDate)
        var map = images.map((data, key) => {
           if(data !== ''){
            return (
                <>
                <Text style={{color:'#000', marginTop:15, letterSpacing:0.25, fontSize:20, fontWeight:'500'}}>{title[key]}</Text>
                <View style={styles.solicitudes}>
                    <Image
                    source={{uri: data}}
                    resizeMode='contain'
                    style={{ width: 300, height: 300, marginTop:20}}
                    />
                    <View style={{flexDirection:'column'}}>
                        <Text style={{marginLeft:10,color:'#000', marginTop:20}}>{creditLine[key]}</Text>
                        <Text style={{marginLeft:10,color:'#000', marginTop:0}}>{artistDisplayBio[key]}</Text>
                        <Text style={{marginLeft:10,color:'#000', marginTop:0, marginBottom:20}}>{artistDisplayName[key]}{' '}{artistBeginDate[key]}/{artistEndDate[key]}</Text>
                    </View> 
                </View>
                
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
            <View style={{alignItems:'center'}}>
                {this.renderImages()}
               
                   
                   
                
                {/* <ImageBackground source={{uri :`${this.state.nasaPicOfTheDayUrl}`}} resizeMode='cover' style={{width: '100%', height: '100%'}}>
                    <Text style={{color:'#FFF', textAlign:'center'}}>{this.state.title}</Text>
                </ImageBackground> */}
            </View>
            // <Text>From Nasa component</Text>
        );
    }
}
const styles = StyleSheet.create({
    solicitudes:{
        borderTopLeftRadius:4,
        borderTopRightRadius:4,
        borderRadius:4,
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.34,
        shadowRadius: 3,
        elevation: 10,
        marginTop:20,
        marginBottom:20,
        backgroundColor:'#ffffff',
        maxWidth:'95%',
        minWidth:'95%'
    },
})


export default MuseumEuropeanPaints
