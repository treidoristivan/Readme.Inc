//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { Input } from 'native-base';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { forgotPasswordSuccess } from '../redux/actions/auth';

// create a component
class ForgotPasswordSuccessOriginal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            verificationCode: '',
            newPassword: '',
            confirmPassword: '',
            isLoading: false,
            isSuccess: false,
            message: ''
        }
    }

    async handleSubmit() {
        const { verificationCode, newPassword, confirmPassword } = this.state
        const data = {
            verificationCode, newPassword, confirmPassword
        }
        if (newPassword === confirmPassword) {
            await this.props.dispatch(forgotPasswordSuccess(data))
        } else {
            Alert.alert('Reset Password Failed', 'New Password and Confirm Password Must Match')
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
                    console.log('berhasil reset password')
                    await this.setState({
                        isLoading: false,
                        isSuccess: true,
                        message: "Reset Password Success.",
                    })
                    this.handleRedirect()
                } else {
                    console.log('gagal reset password')
                    await this.setState({
                        isLoading: false,
                        isSuccess: false,
                        message: "Reset Password Failed. Try Again.",
                    })
                    this.handleRedirect()
                }
            }
        }
    }

    handleRedirect() {
        if (this.props.navigation.state.routeName === 'ForgotPasswordSuccess') {
            if (this.state.isSuccess) {
                this.setState({ isSuccess: false })
                this.props.navigation.navigate('Login')
            } else {
                Alert.alert('Reset Password Failed', this.state.message)
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
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.illustWrapper}>
                        <Image source={require('../assets/images/forgot_password.png')} style={styles.illust} />
                        <Text style={styles.title}>Reset Password</Text>
                    </View>
                    
                    <View style={styles.formWrapper}>
                        <View style={styles.input}>
                            <Input placeholder="Verification Code" value={this.state.verificationCode} onChange={(e) => this.setState({ verificationCode: e.nativeEvent.text })} />
                        </View>
                        <View style={styles.input}>
                            <Input placeholder="New Password" secureTextEntry textContentType="password" value={this.state.newPassword} onChange={(e) => this.setState({ newPassword: e.nativeEvent.text })} />
                        </View>
                        <View style={styles.input}>
                            <Input placeholder="Confirm Password" secureTextEntry textContentType="password" value={this.state.confirmPassword} onChange={(e) => this.setState({ confirmPassword: e.nativeEvent.text })} />
                        </View>
                        <TouchableOpacity style={styles.loginButton} onPress={() => this.handleSubmit()}>
                            {this.props.auth.isLoading
                                ? <ActivityIndicator size="small" color="#fff" />
                                : <Text style={styles.buttonText}>Submit</Text>
                            }
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
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
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

const ForgotPasswordSuccess = withNavigation(ForgotPasswordSuccessOriginal)

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

//make this component available to the app
export default connect(mapStateToProps)(ForgotPasswordSuccess);
