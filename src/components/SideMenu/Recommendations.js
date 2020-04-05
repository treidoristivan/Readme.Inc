//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { getPopularBooks } from '../../redux/actions/book';


// create a component
class RecommendationsOriginal extends Component {
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
			return (
				<View style={styles.container}>
					
						<ScrollView vertikal showsVertialScrollIndicator={false}>
            <View>
					<Image style={styles.best} source={require('../../assets/images/rec.png')} />
					</View>
								{this.state.isLoading &&
										<View style={{flexDirection: 'column'}}>
												<View style={styles.card}>
														<View style={styles.cardWrapper}>
																<View style={{ backgroundColor: '#eee', width: 50, height: 50 }}></View>
																<View style={{ backgroundColor: '#eee', height: 10, width: 50, marginTop: 5 }}></View>
														</View>
												</View>
										</View>
								}
								{!this.state.isLoading && this.props.books.data.map((v, i) => {
										var styler = [styles.card]
										if (i === 0) {
												styler.push()
										}
										if (i === this.props.books.data.length - 1) {
												styler.push()
										}
										return (
												<TouchableOpacity style={styler} key={i} onPress={() => this.props.navigation.navigate('BookDetail', {bookId: v.id})}>
														<View style={styles.cardWrapper}>
																<View style={styles.card2}>
																<Image style={{ width: 60, height: 80,marginTop:25 }} source={{ uri: v.book_image }} />
																</View>
																<Text style={styles.title}>{v.book_name}</Text>
																<View style={{flex:1, flexDirection:'row'}}>
																<Text style={styles.title}>Rating : <Icon name="ios-star" size={15} style={styles.star}> </Icon>{v.avg_rating}</Text>
																</View>
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
container: { flex: 1, justifyContent: 'center', alignItems: 'flex-start',marginLeft:10 },
card: { backgroundColor: '#3399ff', width: 320, height: 180,borderRadius:20, margin: 10,marginTop:50, elevation: 5 },
card2: {backgroundColor:'#3399ff', width:120, height:120,borderRadius:60,marginTop:-40,alignItems:'center'},
cardWrapper: { flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' },
title: { marginTop: 10, textAlign: 'center', fontFamily: 'Nunito-Regular',color:'white' },
star: {
		color: '#e3bd00',
},
best: {
	width: 450,
	height: 260,
	marginLeft:-60
}
});

const mapStateToProps = state => {
return {
		books: state.book,
}
}

const Recommendations = withNavigationFocus(RecommendationsOriginal)

//make this component available to the app
export default connect(mapStateToProps)(Recommendations);
