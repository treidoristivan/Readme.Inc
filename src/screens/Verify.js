//import libraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { Input } from 'native-base';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { verify } from '../redux/actions/auth';

// create a component
class VerifyOriginal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            isSuccess: false,
            message: '',
            verificationCode: ''
        }
    }

    async handleSubmit() {
        const { verificationCode } = this.state
        const data = { verificationCode: verificationCode.toLowerCase() }
        if (verificationCode) {
            await this.props.dispatch(verify(data))
        } else {
            Alert.alert('Verification Failed', 'Please provide the verification code')
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
                    console.log('berhasil login')
                    await this.setState({
                        isLoading: false,
                        isSuccess: true,
                        message: "Happy reading",
                    })
                    this.handleRedirect()
                } else {
                    console.log('gagal login')
                    await this.setState({
                        isLoading: false,
                        isSuccess: false,
                        message: "Wrong verification code. Please ensure your verification code",
                    })
                    this.handleRedirect()
                }
            }
        }
    }

    handleRedirect() {
        if (this.props.navigation.state.routeName === 'Verify') {
            if (this.state.isSuccess) {
                this.setState({ isSuccess: false })
                this.props.navigation.navigate('Login')
            } else {
                Alert.alert('Verification Failed', this.state.message)
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
                        <Image source={require('../assets/images/verify.png')} style={styles.illust} />
                    </View>
                    
                    <View style={styles.formWrapper}>
                        <View style={styles.input}>
                            <Input placeholder="Verification Code" value={this.state.verificationCode} onChange={(e) => this.setState({ verificationCode: e.nativeEvent.text })} />
                        </View>
                        <TouchableOpacity style={styles.loginButton} onPress={() => this.handleSubmit()}>
                            {this.props.auth.isLoading
                                ? <ActivityIndicator size="small" color="#fff" />
                                : <Text style={styles.buttonText}>Verify</Text>
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
        width: 200,
        height: 200
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
        borderRadius: 25,
        justifyContent: 'center',
        flex: 0,
        flexDirection: 'row',
        marginTop: 15,
        marginRight: 5
    },
    buttonText: {
        fontFamily: 'Nunito-Regular',
        color: '#fff',
        textTransform: 'uppercase'
    },
    registerButton: {
        backgroundColor: '#eee',
        padding: 10,
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

const Verify = withNavigation(VerifyOriginal)

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

//make this component available to the app
export default connect(mapStateToProps)(Verify);
