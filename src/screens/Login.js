//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { Input } from 'native-base';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { login } from '../redux/actions/auth';

// create a component
class LoginOriginal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            isLoading: false,
            isSuccess: false,
            message: '',
        }
    }

    async handleSubmit() {
        const { username, password } = this.state
        const data = {
            username,
            password
        }
        await this.props.dispatch(login(data))
    }

    async componentDidUpdate(prevProps) {
        if (prevProps.auth.isLoading !== this.state.isLoading) {
            if (prevProps.auth.isLoading === true) {
                this.setState({
                    isLoading: true
                })
                console.log('masih loading')
            } else {
                console.log('sudah fulfill')
                if (this.props.auth.isSuccess) {
                    console.log('berhasil login')
                    await this.setState({
                        isLoading: false,
                        isSuccess: true,
                        message: "Login Success.",
                    })
                    this.handleRedirect()
                } else {
                    console.log('gagal login')
                    await this.setState({
                        isLoading: false,
                        isSuccess: false,
                        message: "Login Failed. Try Again.",
                    })
                    this.handleRedirect()
                }
            }
        }
    }

    handleRedirect() {
        if (this.state.isSuccess) {
            Alert.alert('Login Message', this.state.message, [
                { text: 'OK', onPress: () => this.props.navigation.navigate('Home') },
            ])
        } else {
            Alert.alert('Login Message', this.state.message)
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.headerWrapper}>
                    <Image source={require('../assets/icons/favicon.png')} style={styles.logo} />
                    <Text style={styles.logoText}>Readme</Text>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.illustWrapper}>
                        <Image source={require('../assets/images/login.png')} style={styles.illust} />
                    </View>
                    
                    <View style={styles.formWrapper}>
                        <View style={styles.input}>
                            <Input placeholder="Username" textContentType="username" value={this.state.username} onChange={(e) => this.setState({ username: e.nativeEvent.text })} />
                        </View>
                        <View style={styles.input}>
                            <Input placeholder="Password" secureTextEntry textContentType="password" value={this.state.password} onChange={(e) => this.setState({ password: e.nativeEvent.text })} />
                        </View>
                        <Text style={{ textAlign: 'right', marginTop: 30,marginRight:10, color: '#3399ff' }} onPress={() => this.props.navigation.navigate('ForgotPassword')}>Forgot Password?</Text>
                        <TouchableOpacity style={styles.loginButton} onPress={() => this.handleSubmit()}>
                            {this.props.auth.isLoading
                                ? <ActivityIndicator size="small" color="#fff" />
                                : <Text style={styles.buttonText}>Sign In</Text>
                            }
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.registerButton} onPress={() => this.props.navigation.navigate('Register')}>
                            <Text style={styles.buttonText}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View >
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
        height: 30
    },
    logoText: {
        marginLeft: 4,
        fontFamily: 'Nunito-Regular'
    },
    illustWrapper: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    illust: {
        width: 250,
        height: 150
    },
    
    title: {
        fontFamily: 'Nunito-Regular',
        fontSize: 30
    },
    formWrapper: {
        flex: 0,
        flexDirection: 'column',
        marginTop: 20
    },
    loginButton: {
        backgroundColor: '#3399ff',
        padding: 10,
        borderRadius: 20,
        justifyContent: 'center',
        flex: 0,
        flexDirection: 'row',
        marginTop: 15,
    },
    buttonText: {
        fontFamily: 'Nunito-Regular',
        color: '#fff',
        textTransform: 'uppercase'
    },
    registerButton: {
        backgroundColor: '#00cc00',
        padding: 10,
        borderRadius: 20,
        justifyContent: 'center',
        flex: 0,
        flexDirection: 'row',
        marginTop: 10,
    },
    input: {
        flex: 0,
        flexDirection: 'row',
        margin: 5,
        borderBottomWidth: 1,
        borderBottomColor:'#3399ff'
    },
});

const Login = withNavigation(LoginOriginal)

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

//make this component available to the app
export default connect(mapStateToProps)(Login);
