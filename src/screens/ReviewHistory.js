import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import SliderTitle from '../components/SliderTitle';
import BackButton from '../components/BackButton';

class ReviewHistory extends Component {
	render(){
		return(
			<View style={styles.container}>
				<View style={styles.headerWrapper}>
					<BackButton />
					<SliderTitle title="Review History" />
				</View>
				<View style={{flex:0, flexDirection: 'row', padding:20,}}>
                	<View style={{flexDirection: 'column', flex:1,}}>
                		<Text style={{fontFamily: 'Nunito-Regular', fontSize: 20}}>Review #1</Text>
                		<Text>Date: 02-03-2020</Text>
                	</View>
                	<Text>Buku ini Buku menarik</Text>
                </View>
								<View style={{flex:0, flexDirection: 'row', padding:20,}}>
                	<View style={{flexDirection: 'column', flex:1,}}>
                		<Text style={{fontFamily: 'Nunito-Regular', fontSize: 20}}>Review #2</Text>
                		<Text>Date: 03-03-2020</Text>
                	</View>
                	<Text>Buku ini Buku menarik0</Text>
                </View>
								<View style={{flex:0, flexDirection: 'row', padding:20,}}>
                	<View style={{flexDirection: 'column', flex:1,}}>
                		<Text style={{fontFamily: 'Nunito-Regular', fontSize: 20}}>Review #3</Text>
                		<Text>Date: 03-03-2020</Text>
                	</View>
                	<Text>Buku ini Buku menarik0</Text>
                </View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex:1,
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

export default ReviewHistory