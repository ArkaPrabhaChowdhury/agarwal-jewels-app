import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PrivacyPolicy = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Privacy Policy</Text>
            <Text style={styles.subheading}>Agarwal Jewellers</Text>
            <Text style={styles.paragraph}>
                At Agarwal Jewellers, we take your privacy seriously. This Privacy Policy explains how we collect, use, and share your personal information when you use our mobile application.
            </Text>
            <Text style={styles.subheading}>Information We Collect</Text>
            <Text style={styles.paragraph}>
                We collect information you provide directly to us, such as your name, email address, and phone number. We may also collect information about your device, including its operating system, browser type, and IP address.
            </Text>
            <Text style={styles.subheading}>How We Use Your Information</Text>
            <Text style={styles.paragraph}>
                We use the information we collect to provide and improve our services, to communicate with you, and to personalize your experience. We may also use your information to send you marketing communications.
            </Text>
            <Text style={styles.subheading}>Sharing Your Information</Text>
            <Text style={styles.paragraph}>
                We may share your information with third-party service providers who help us provide our services. We may also share your information with law enforcement or other third parties if we are required to do so by law.
            </Text>
            <Text style={styles.subheading}>Camera Permission</Text>
            <Text style={styles.paragraph}>
                Our mobile application requires access to your device's camera in order to provide certain features. We will only access your camera with your permission, and we will not use your camera for any other purpose.
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subheading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    },
    paragraph: {
        fontSize: 16,
        marginBottom: 20,
    },
});

export default PrivacyPolicy;
