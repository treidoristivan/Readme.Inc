//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';

// create a component
class SplashOriginal extends Component {
    componentDidMount() {
        setTimeout(() => {
            if (!this.props.auth.data.token) {
                this.props.navigation.navigate('UserAuthentication')
            } else {
                this.props.navigation.navigate('Home')
            }
        }, 3000)
    }
    render() {
        return (
            <View style={styles.container}>
                <Image source={require('../assets/icons/favicon.png')} style={styles.logo} />
                <Text style={styles.title}>Readme Inc ©</Text>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    logo: {
        width: 90,
        height: 140,

        
    },
    title: {
        fontFamily: 'Nunito-Regular',
        fontSize: 33,
        color: '#00cc00',
        marginBottom:50

    }
});

const Splash = withNavigation(SplashOriginal)

const mapStateToProps = state => {
    return {
        auth: state.auth,
    }
}

//make this component available to the app
export default connect(mapStateToProps)(Splash);
