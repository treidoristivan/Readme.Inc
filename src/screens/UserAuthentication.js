//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';

// create a component
class UserAuthenticationOriginal extends Component {
    componentDidMount() {
        if (this.props.auth.isLoggedIn) {
            this.props.navigation.navigate('Home')
        }
    }

    render() {
        return (
            <View style={styles.container}>
                
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.illustWrapper}>
                        <Image source={require('../assets/images/illust_1.jpg')} style={styles.illust} />
                    </View>
                    <View style={styles.prologWrapper}>
                        <Text style={styles.title}>Welcome!</Text>
                        {/* <Text style={styles.subtitle}>Explore the enjoyment and easiness of ordering food online with Fodel.</Text> */}
                    </View>
                    <View style={styles.buttonWrapper}>
                        <TouchableOpacity style={styles.loginButton} onPress={() => this.props.navigation.navigate('Login')}>
                            <Text style={styles.buttonText}>Sign In</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.registerButton} onPress={() => this.props.navigation.navigate('Register')}>
                            <Text style={styles.buttonText}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.epilogWrapper}>
                        <Text style={styles.subtitle}>With Sign In or Sign Up, You are agree the Terms of Services and Privacy Policy.</Text>
                    </View>
                </ScrollView>
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
        paddingHorizontal: 20,
        paddingTop:40
    },
    headerWrapper: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    logo: {
        width: 30,
        height: 30
    },
    logoText: {
        marginLeft: 4,
        fontFamily: 'Nunito-Regular'
    },
    illustWrapper: {
        flex: 0,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    illust: {
        width: 300,
        height: 300
    },
    prologWrapper: {
        flex: 0,
        flexDirection: 'column',
    
    },
    title: {
        fontFamily: 'Nunito-Regular',
        fontSize: 30,
        textAlign:'center',
        paddingBottom:30
    },
    subtitle: {
        fontFamily: 'Nunito-Regular',
        color: '#333',
        textAlign:'center',
        paddingTop:25
    },
    buttonWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    loginButton: {
        backgroundColor: '#3399ff',
        padding: 10,
        borderBottomLeftRadius:20,
        borderTopLeftRadius:20,
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        marginTop: 10,
        marginRight: 5
    },
    buttonText: {
        fontFamily: 'Nunito-Regular',
        color: '#fff',
        textTransform: 'uppercase'
    },
    registerButton: {
        backgroundColor: '#00cc00',
        padding: 10,
        borderBottomRightRadius:20,
        borderTopRightRadius:20,
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        marginTop: 10,
        marginLeft: 5
    },
    epilogWrapper: {
        flex: 0,
        flexDirection: 'row',
        marginVertical: 10,
        alignItems: 'flex-end'
    },
});

const UserAuthentication = withNavigation(UserAuthenticationOriginal)

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

//make this component available to the app
export default connect(mapStateToProps)(UserAuthentication);
