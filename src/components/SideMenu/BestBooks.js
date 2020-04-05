//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import { connect } from 'react-redux';
import { getPopularBooks } from '../../redux/actions/book';
import SliderTitle from '../SliderTitle';
import { APP_ICON_URL, APP_URL } from '../../config/config';

// create a component
class BestBooksOriginal extends Component {
	constructor(props) {
		super(props)
		this.state = {
			isLoading: true,
		}
	}

	async componentDidMount() {
		await this.props.dispatch(getPopularBooks());
		await this.setState({ isLoading: false });
		this.props.navigation.addListener('didFocus', () => this.onFocus(this.props));
	}

	async onFocus(props) {
		props.dispatch(getPopularBooks());
	}

	render() {
		console.log('PROPSPROPSPROPSPROPSPROPSPROPSPROPSPROPSPROPSPROPSPROPSPROPSPROPS', this.props.book.data)
		return (
			<View style={styles.container}>
				<ScrollView
					horizontal
					showsHorizontalScrollIndicator={false}
				>
					{this.state.isLoading &&
						<View style={{ flexDirection: 'row' }}>
							<View style={[styles.card, { marginLeft: 30 }]}>
								<View style={styles.cardWrapper}>
									<View style={{ backgroundColor: '#eee', width: 50, height: 50 }}></View>
									<View style={{ backgroundColor: '#eee', height: 10, width: 50, marginTop: 5 }}></View>
								</View>
							</View>
							<View style={[styles.card, { marginLeft: 20 }]}>
								<View style={styles.cardWrapper}>
									<View style={{ backgroundColor: '#eee', width: 50, height: 50 }}></View>
									<View style={{ backgroundColor: '#eee', height: 10, width: 50, marginTop: 5 }}></View>
								</View>
							</View>
							<View style={[styles.card, { marginLeft: 20 }]}>
								<View style={styles.cardWrapper}>
									<View style={{ backgroundColor: '#eee', width: 50, height: 50 }}></View>
									<View style={{ backgroundColor: '#eee', height: 10, width: 50, marginTop: 5 }}></View>
								</View>
							</View>
						</View>
					}
					{!this.state.isLoading && this.props.book.data.map((v, i) => {
						var styler = [styles.card]
						if (i === 0) {
							styler.push({ marginLeft: 20 })
						}
						if (i === this.props.book.data.length - 1) {
							styler.push({ marginRight: 20 })
						}
						return (
							<TouchableOpacity style={styler} key={i} onPress={() => this.props.navigation.navigate('Search', { search: [{ name: "category", value: v.id }] })}>
								<View style={styles.cardWrapper}>
									<Image style={{ width: 50, height: 50 }} source={{ uri: v.book_image }} />
									<Text style={styles.title}>{v.book_name}</Text>
								</View>
							</TouchableOpacity>
						)
					})}
				</ScrollView>
			</View>
		);
	}
}

// define your styles
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'flex-start',
	},
	card: { backgroundColor: '#fff', width: 100, height: 120, borderRadius: 12, margin: 10, elevation: 5 },
	cardWrapper: { flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' },
	title: { marginTop: 10, textAlign: 'center', fontFamily: 'Nunito-Regular' },
});

const mapStateToProps = state => {
	return {
		book: state.book,
	}
}

const BestBooks = withNavigationFocus(BestBooksOriginal)

//make this component available to the app
export default connect(mapStateToProps)(BestBooks);
