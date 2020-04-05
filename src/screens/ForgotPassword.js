// import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { Input } from 'native-base';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { forgotPasswordRequest } from '../redux/actions/auth'

// create a component
class ForgotPasswordOriginal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            email: '',
            isLoading: false,
            isSuccess: false,
            message: '',
        }
    }

    async handleSubmit() {
        const { username, email } = this.state
        const data = {
            username,
            email
        }
        await this.props.dispatch(forgotPasswordRequest(data))
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
                    console.log('berhasil forgot password')
                    await this.setState({
                        isLoading: false,
                        isSuccess: true,
                        message: "Forgot Password Request Success.",
                    })
                    this.handleRedirect()
                } else {
                    console.log('gagal forgot password')
                    await this.setState({
                        isLoading: false,
                        isSuccess: false,
                        message: "Forgot Password Request Failed. Try Again.",
                    })
                    this.handleRedirect()
                }
            }
        }
    }

    handleRedirect() {
        if (this.props.navigation.state.routeName === 'ForgotPassword') {
            if (this.state.isSuccess) {
                this.setState({ isSuccess: false })
                this.props.navigation.navigate('ForgotPasswordSuccess')
            } else {
                Alert.alert('Login Message', this.state.message)
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
                <View style={styles.illustWrapper}>
                    <Image source={require('../assets/images/forgot_password.png')} style={styles.illust} />
                    <Text style={styles.title}>Forgot Password</Text>
                </View>
                <View style={styles.formWrapper}>
                    <View style={styles.input}>
                        <Input placeholder="Username" textContentType="username" value={this.state.username} onChange={(e) => this.setState({ username: e.nativeEvent.text })} />
                    </View>
                    <View style={styles.input}>
                        <Input placeholder="Email" value={this.state.email} onChange={(e) => this.setState({ email: e.nativeEvent.text })} />
                    </View>
                    <Text style={{ alignSelf: 'flex-end', textAlign: 'left', marginTop: 30, marginRight:10, color: '#3399ff' }} onPress={() => this.props.navigation.navigate('ForgotPasswordSuccess')}>Have a code?</Text>
                    <TouchableOpacity style={styles.loginButton} onPress={() => this.handleSubmit()}>
                        {this.props.auth.isLoading
                            ? <ActivityIndicator size="small" color="#fff" />
                            : <Text style={styles.buttonText}>Submit</Text>
                        }
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

    illustWrapper: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical:70,
       
        
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
        paddingBottom:100
    },
    loginButton: {
        backgroundColor: '#3399ff',
        padding: 10,
        borderRadius: 20,
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
    input: {
        flex: 0,
        flexDirection: 'row',
        margin: 5,
        borderBottomWidth: 1,
        borderBottomColor:'#3399ff',
        
    },
});

const ForgotPassword = withNavigation(ForgotPasswordOriginal)

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

//make this component available to the app
export default connect(mapStateToProps)(ForgotPassword);
