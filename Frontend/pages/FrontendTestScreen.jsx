import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

const FrontendTestScreen = ({ navigation }) => {
    return (
        <View>
            <Text>
            Diese Seite dient der Navigation zu allen erstellten Seiten und ist lediglich für Testzwecke angelegt.
            </Text>
            <Button onPress={() => navigation.navigate('Splash')} title={'Go to Splash-Screen'} />
            <Button onPress={() => navigation.navigate('Login')} title={'Go to LoginPage'} />
            <Button onPress={() => navigation.navigate('Register')} title={'Go to RegisterPage'} />
            <Button onPress={() => navigation.navigate('Menue')} title={'Go to MenuePage'} />
            <Button onPress={() => navigation.navigate('Archiv')} title={'Go to ArchivPage'} />
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

export  { FrontendTestScreen }
