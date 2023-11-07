import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { theme } from '../styles';

const Loading = (props) => {
    const {color} = props;
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={color || theme} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Loading;