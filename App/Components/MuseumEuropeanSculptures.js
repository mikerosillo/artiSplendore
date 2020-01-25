import React, { Component } from 'react';
import { 
  Image, 
  Text,
  View,
  StyleSheet
} from 'react-native';


class MuseumEuropeanSculptures extends Component {
    constructor(){
        super();
        this.state = {
            paintImageUrl:[],
            title:[],
            objectId: 186124,
            artistDisplayName:[],
            artistBeginDate:[],
            artistEndDate:[],
            creditLine:[],
            artistDisplayBio:[],
        }
        this.getSculptures()
    };
    getSculptures(){
        fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${this.state.objectId}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }).then((response)=>{
          if(response.ok){
              response.json().then((data)=>{
                  console.log('from response data sculptures', data)
                  this.state.paintImageUrl.push(data.primaryImage)
                  this.state.title.push(data.title)
                  this.state.artistDisplayName.push(data.artistDisplayName)
                //   this.state.artistBeginDate.push(data.artistBeginDate)
                //   this.state.artistEndDate.push(data.artistEndDate)
                  this.state.creditLine.push(data.creditLine)
                  this.state.artistDisplayBio.push(data.artistDisplayBio)
                  let nextObjectId = this.state.objectId
                  if(nextObjectId <= 186127){
                    nextObjectId += 1
                      this.setState({objectId: nextObjectId})
                      return this.getSculptures()
                    } else {
                       return false
                  }
              })
          } else if(response.status == '404'){
              let nextObjectId = this.state.objectId
              nextObjectId += 1
              this.setState({objectId: nextObjectId})
              return this.getSculptures()
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
        // let artistBeginDate = this.state.artistBeginDate
        // let artistEndDate = this.state.artistEndDate
        let creditLine = this.state.creditLine
        let artistDisplayBio = this.state.artistDisplayBio
        var map = images.map((data, key) => {
           if(data !== ''){
            return (
                <>
                    <View style={styles.solicitudes}>
                        <Text style={{color:'#000', marginTop:15, letterSpacing:0.25, fontSize:20, fontWeight:'500', textAlign:'center'}}>{title[key]}</Text>
                        <View style={{alignItems:'center'}}>
                            <Image
                            source={{uri: data}}
                            resizeMode='contain'
                            style={{ width: 300, height: 300, marginTop:20}}
                            />
                        </View>
                        <View style={{flexDirection:'column'}}>
                            <Text style={{marginLeft:10,color:'#000', marginTop:20}}>{creditLine[key]}</Text>
                            <Text style={{marginLeft:10,color:'#000', marginTop:0}}>{artistDisplayBio[key]}</Text>
                            <Text style={{marginLeft:10,color:'#000', marginTop:0, marginBottom:20}}>{artistDisplayName[key]}{' '}</Text>
                        </View> 
                    </View> 
                </>
            )
            } else {
                return false
            }
        });
        return map
    };
    render() {
        return (
            <View style={{alignItems:'center', marginBottom:40}}>
                {this.renderImages()}
            </View>
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
        shadowOpacity: 0.84,
        shadowRadius: 3,
        elevation: 10,
        marginTop:20,
        marginBottom:20,
        backgroundColor:'#ffffff',
        maxWidth:'90%',
        minWidth:'90%'
    },
})


export default MuseumEuropeanSculptures
