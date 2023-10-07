import React, { useState, useEffect } from 'react'
import { View, Text, Card } from 'react-native-ui-lib'
import axios from 'axios'

const NotificationsScreen = () => {
  const [data, setData] = useState(null)

  useEffect(() => {
    axios.get('http://localhost:2000/notifications')
      .then(response => {
        setData(response.data)
      })
      .catch(error => {
        console.error(error)
      })
  }, [])

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      }}
    >
      {data ? (
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
          <Text>{data}</Text>
        </Card>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  )
}

export default NotificationsScreen