import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { patchUser } from '../../redux/actions/auth';


//component
import SliderTitle from '../SliderTitle';
import BackButton from '../BackButton';

class ProfileSettingOriginal extends Component {
	constructor(props) {
		super(props)
		this.state = {
			fullname: '',
			email: '',
			password: '',
			passwordVisible: true,
			isLoading: false,
		}
	}

	async componentDidMount() {
		await this.setState({
			fullname: this.props.auth.data.fullname,
		});
	}

	async handleSubmit() {
		const jwt = await this.props.auth.data.token;
		const { fullname } = this.state
		const data = {
			fullname
		}
		if (jwt !== null) {
			await this.props.dispatch(patchUser(jwt, data));
		}
	}

	render() {
		return (
			<ScrollView style={{ flex: 1, backgroundColor: 'white' }} showsVerticalScrollIndicator={false}>
				<View style={styles.container}>
					<View style={styles.headerWrapper}>
						<BackButton />
						<SliderTitle title="Edit Profile" />
					</View>

					<View style={{ flex: 0, flexDirection: 'row', padding: 10, }}>
						<View style={{ flexDirection: 'column', flex: 1 }}>
							<Text style={{ fontFamily: 'Nunito-Regular', fontSize: 20 }}>Fullname</Text>
							<TextInput style={{ borderBottomWidth: 1, width: '100%' }} placeholder="Fullname" value={this.state.fullname} onChange={(e) => this.setState({ name: e.nativeEvent.text })} />
						</View>
					</View>

					<View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end' }}>
						<TouchableOpacity style={{ backgroundColor: '#3399ff', flex: 1, flexDirection: 'row', padding: 10, margin: 20, justifyContent: 'center', borderRadius: 30 }} onPress={() => this.handleSubmit()}>
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