import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { patchUser } from '../redux/actions/auth';

//component
import SliderTitle from '../components/SliderTitle';
import BackButton from '../components/BackButton';

class ProfileSettingOriginal extends Component {
	constructor(props) {
		super(props)
		this.state = {
			name: '',
			username: '',
			email: '',
			password: '',
			passwordVisible: true,
			isLoading: false,
		}
	}

	async componentDidMount() {
		await this.setState({
			name: this.props.auth.data.name,
			username: this.props.auth.data.username,
			email: this.props.auth.data.email,
		});
	}

	async handleSubmit() {
		const jwt = await this.props.auth.data.token;
		const { name, username, email, password } = this.state
		const data = {
			name, username, email
		}
		if(password !== ''){
			data.password = password
		}
		if (jwt !== null) {
			await this.props.dispatch(patchUser(jwt, data));
		}
	}

	render() {
		return (
			<ScrollView style={{flex: 1, backgroundColor: 'white'}} showsVerticalScrollIndicator={false}>
				<View style={styles.container}>
					<View style={styles.headerWrapper}>
						<BackButton />
						<SliderTitle title="Edit Profile" />
					</View>

					<View style={{ flex: 0, flexDirection: 'row', padding: 10, }}>
						<View style={{ flexDirection: 'column', flex: 1 }}>
							<Text style={{ fontFamily: 'Nunito-Regular', fontSize: 20 }}>Name</Text>
							<TextInput style={{ borderBottomWidth: 1, width: '100%' }} placeholder="Name" value={this.state.name} onChange={(e) => this.setState({ name: e.nativeEvent.text })} />
						</View>
					</View>
					<View style={{ flex: 0, flexDirection: 'row', padding: 10, }}>
						<View style={{ flexDirection: 'column', flex: 1 }}>
							<Text style={{ fontFamily: 'Nunito-Regular', fontSize: 20 }}>Username</Text>
							<TextInput style={{ borderBottomWidth: 1, width: '100%' }} placeholder="Username" value={this.state.username} onChange={(e) => this.setState({ username: e.nativeEvent.text })} />
						</View>
					</View>
					<View style={{ flex: 0, flexDirection: 'row', padding: 10, }}>
						<View style={{ flexDirection: 'column', flex: 1 }}>
							<Text style={{ fontFamily: 'Nunito-Regular', fontSize: 20 }}>E-mail</Text>
							<TextInput style={{ borderBottomWidth: 1, width: '100%' }} placeholder="Email" value={this.state.email} keyboardType="email-address" onChange={(e) => this.setState({ email: e.nativeEvent.text })} />
						</View>
					</View>
					<View style={{ flex: 0, flexDirection: 'row', padding: 10, }}>
						<View style={{ flexDirection: 'column', flex: 1 }}>
							<Text style={{ fontFamily: 'Nunito-Regular', fontSize: 20 }}>Password</Text>
							<TextInput style={{ borderBottomWidth: 1, width: '100%' }} placeholder="Password" value={this.state.password} secureTextEntry={this.state.passwordVisible} onChange={(e) => this.setState({ password: e.nativeEvent.text })} />
						</View>
					</View>
					<View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end' }}>
						<TouchableOpacity style={{ backgroundColor: '#008080', flex: 1, flexDirection: 'row', padding: 20, margin: 20, justifyContent: 'center', borderRadius: 30 }} onPress={() => this.handleSubmit()}>
							{
								this.props.auth.isLoading
									? <ActivityIndicator size="small" color="#fff" />
									: <Text style={{ color: 'white', textTransform: 'uppercase' }}>Save Changes</Text>
							}
						</TouchableOpacity>
					</View>
				</View>
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		backgroundColor: '#fff',
	},
	headerWrapper: {
		flex: 0,
		flexDirection: 'row',
		margin: 20,
	},
})

const ProfileSetting = withNavigation(ProfileSettingOriginal)

const mapStateToProps = state => {
	return {
		auth: state.auth,
	}
}

export default connect(mapStateToProps)(ProfileSetting)