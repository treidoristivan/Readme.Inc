// import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Input } from 'native-base';
import { withNavigation } from 'react-navigation';

// create a component
class ForgotPasswordOriginal extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.headerWrapper}>
                    <Image source={require('../assets/icons/favicon.png')} style={styles.logo} />
                    <Text style={styles.logoText}>Book&Food</Text>
                </View>
                <View style={styles.illustWrapper}>
                    <Image source={require('../assets/images/forgot_password.png')} style={styles.illust} />
                    <Text style={styles.title}>Forgot Password</Text>

                </View>
                
                <View style={styles.formWrapper}>
                    <View style={styles.input}>
                        <Input placeholder="Username" />
                    </View>
                    <View style={styles.input}>
                        <Input placeholder="Email Address" />
                    </View>
                    <TouchableOpacity style={styles.loginButton} onPress={() => this.props.navigation.navigate('Home')}>
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: '#fff',
        padding: 20,
    },
    headerWrapper: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center'
    },
    logo: {
        width: 30,
        height: 30,
        
    },
    logoText: {
        marginLeft: 4,
        fontFamily: 'Nunito-Regular'
    },
    illustWrapper: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:50,
    },
    illust: {
        width: 180,
        height: 130,
    },
    
    title: {
        fontFamily: 'Nunito-Regular',
        fontSize: 20
    },
    formWrapper: {
        flex: 0,
        flexDirection: 'column',
        marginBottom: 80
    },
    loginButton: {
        backgroundColor: '#3399ff',
        padding: 15,
        borderRadius: 12,
        justifyContent: 'center',
        flex: 0,
        flexDirection: 'row',
        marginTop: 20,
        marginRight: 5
    },
    buttonText: {
        fontFamily: 'Nunito-Regular',
        color: '#fff',
        textTransform: 'uppercase'
    },
    registerButton: {
        backgroundColor: '#eee',
        padding: 20,
        borderRadius: 12,
        justifyContent: 'center',
        flex: 0,
        flexDirection: 'row',
        marginTop: 10,
        marginLeft: 5
    },
    input: {
        flex: 0,
        flexDirection: 'row',
        margin: 5,
        borderBottomWidth: 2
    },
});

const ForgotPassword = withNavigation(ForgotPasswordOriginal)

//make this component available to the app
export default ForgotPassword;
