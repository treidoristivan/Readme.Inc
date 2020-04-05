//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { Input } from 'native-base';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { register } from '../redux/actions/auth';

// create a component
class RegisterOriginal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            isLoading: false,
            isSuccess: false,
            message: '',
        }
    }

    async handleSubmit() {
        const { username, email, password } = this.state
        const data = {
            username,
            email,
            password,
        }
        if (username && email && password && this.state.confirmPassword) {
            if (password === this.state.confirmPassword) {
                await this.props.dispatch(register(data))
            } else {
                Alert.alert('Register Failed', 'Password and Confirm Password Must Match')
            }
        } else {
            Alert.alert('Register Failed', 'Please provide the required fields')
        }
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
                    console.log('berhasil register')
                    await this.setState({
                        isLoading: false,
                        isSuccess: true,
                        message: "Please check your email to verify your account",
                    })
                    this.handleRedirect()
                } else {
                    console.log('gagal register')
                    await this.setState({
                        isLoading: false,
                        isSuccess: false,
                        message: "Please choose another username",
                    })
                    this.handleRedirect()
                }
            }
        }
    }

    async handleRedirect() {
        if (this.props.navigation.state.routeName === 'Register') {
            if (this.state.isSuccess) {
                this.setState({ isSuccess: false })
                this.props.navigation.navigate('Verify')
            } else {
                Alert.alert('Register Failed', this.state.message)
            }
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.headerWrapper}>
                    <Image source={require('../assets/icons/favicon.png')} style={styles.logo} />
                    <Text style={styles.logoText}>Readme</Text>
                </View>
                <ScrollView showsVerticalScrollIndicator={false} >
                    <View style={styles.illustWrapper}>
                        <Image source={require('../assets/images/register.png')} style={styles.illust} />
                    </View>
                    
                    <View style={styles.formWrapper}>
                        {/* <View style={styles.input}>
                            <Input placeholder="Fullname" value={this.state.name} onChange={(e) => this.setState({ name: e.nativeEvent.text })} />
                        </View> */}
                        <View style={styles.input}>
                            <Input placeholder="Username" textContentType="username" value={this.state.username} onChange={(e) => this.setState({ username: e.nativeEvent.text })} />
                        </View>
                        <View style={styles.input}>
                            <Input placeholder="Email" textContentType="emailAddress" keyboardType="email-address" value={this.state.email} onChange={(e) => this.setState({ email: e.nativeEvent.text })} />
                        </View>
                        <View style={styles.input}>
                            <Input placeholder="Password" secureTextEntry textContentType="password" value={this.state.password} onChange={(e) => this.setState({ password: e.nativeEvent.text })} />
                        </View>
                        <View style={styles.input}>
                            <Input placeholder="Confirm Password" secureTextEntry textContentType="password" value={this.state.confirmPassword} onChange={(e) => this.setState({ confirmPassword: e.nativeEvent.text })} />
                        </View>
                        <TouchableOpacity style={styles.registerButton} onPress={() => this.handleSubmit()}>
                            {this.props.auth.isLoading
                                ? <ActivityIndicator size="small" color="#fff" />
                                : <Text style={styles.buttonText}>Register</Text>
                            }
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.loginButton} onPress={() => this.props.navigation.navigate('Login')}>
                            <Text style={[styles.buttonText, { color: 'white' }]}>i have an account</Text>
                        </TouchableOpacity>
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
        flex: 0,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    illust: {
        width: 300,
        height: 150
    },
    formWrapper: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 20
    },
    registerButton: {
        backgroundColor: '#3399ff',
        padding: 10,
        borderRadius: 20,
        justifyContent: 'center',
        flex: 0,
        flexDirection: 'row',
        marginTop: 30,
        marginRight: 0
    },
    buttonText: {
        fontFamily: 'Nunito-Regular',
        color: '#fff',
        textTransform: 'uppercase'
    },
    loginButton: {
        backgroundColor: '#00cc00',
        padding: 10,
        borderRadius: 20,
        justifyContent: 'center',
        flex: 0,
        flexDirection: 'row',
        marginTop: 10,
        
    },
    input: {
        flex: 1,
        flexDirection: 'column',
        margin: 5,
        marginHorizontal:10,
        borderBottomWidth: 1,
        borderBottomColor: '#3399ff',
        
       
    },
});

const Register = withNavigation(RegisterOriginal)

const mapStateToProps = state => {
    return {
        auth: state.auth,
    }
}

//make this component available to the app
export default connect(mapStateToProps)(Register);
