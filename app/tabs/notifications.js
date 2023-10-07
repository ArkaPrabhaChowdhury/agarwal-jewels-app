import React from 'react'
import { View, Text , Card } from 'react-native-ui-lib'
import { Dimensions } from 'react-native'
import axios from 'axios'

axios.get('http://localhost:2000/notifications')
  .then(response => {
    console.log(response.data)
    // Do something with the response data
  })
  .catch(error => {
    console.error(error)
  })

const NotifcationsScreen = () => {
  const screenWidth = Math.round(Dimensions.get('window').width)
  const cardWidth = screenWidth * 0.9
  const cardHeight = cardWidth
  return (
    <View
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Card
      style={{
        width: 200,
        height: 200,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}
    >
      <Text>Sample Text</Text>
    </Card>
  </View>
  )
}

export default NotifcationsScreen