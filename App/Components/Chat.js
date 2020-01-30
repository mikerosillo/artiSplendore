import React, { useEffect, useState, useRef } from 'react'; // learning and practicing hooks
import { StyleSheet, Text, View, TextInput } from 'react-native';
import io from "socket.io-client";


export default function Chat() {
  const [messageToSend, setMessageToSend] = useState('');
  const [receivedMessage, setReceivedMessage] = useState([]);
  const socket = useRef(null); // so we can access variable socket in the whole component
  useEffect( () => { // learnig and practicing arrow functions es6
    socket.current = io("http://192.168.0.3:3001");
    socket.current.on('message', message => {
      setReceivedMessage(prevState => [...prevState, message]);// we take the prev state and add the new message
    })
  },[])
  const sendMessage = () => {
      socket.current.emit('message', messageToSend)
      setMessageToSend('');//once the message is sent we set the state to empty string again
  };
  const displayReceivedMessages = receivedMessage.map(message => (
    <Text key={message}>{message}</Text>
  ))
  return (
    <View style={styles.container}>
      <Text>Share your ideas!</Text>
      {displayReceivedMessages}
      <TextInput 
        value={messageToSend}
        onChangeText={text => setMessageToSend(text)}
        placeholder='Enter message'
        onSubmitEditing={sendMessage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});