/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import { Image, Text, View } from 'react-native';


const OnboardingItem = ({ item,navigation }: any) => {
    const { width } = useWindowDimensions();
    const onStarted = ()=>{
        navigation.navigate('Homepage');
    };
    return (
        <View style={[Styles.container, { width }]}>
            <Image source={item.image} style={[Styles.image, { width: width * 0.6, resizeMode: 'contain' }]} />
            <View style={{ flex: 0.3 }}>
                <Text style={Styles.title}>{item.title}</Text>
                <Text style={Styles.description}>{item.description}</Text>
                {item.isButton && <TouchableOpacity style={Styles.buttonStyle} onPress={onStarted}>
                    <Text style={Styles.buttonText}>
                        Get Started
                    </Text>
                </TouchableOpacity>}
            </View>
        </View>
    );
};

export default OnboardingItem;

const Styles = StyleSheet.create({
    image: {
        flex: 0.7,
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontWeight: '800',
        fontSize: 20,
        marginBottom: 10,
        color: '#493d8a',
        textAlign: 'center',
    },
    description: {
        fontWeight: '500',
        color: '#62656b',
        textAlign: 'center',
        paddingHorizontal: 64,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: 'white',
        textAlign: 'center',
    },
    buttonStyle: {
        backgroundColor: 'black',
        paddingVertical: 10,
        borderRadius: 20,
        marginVertical: 20,
    },
});
