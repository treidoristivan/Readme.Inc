//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TextInput } from 'react-native';
import StarRating from 'react-native-star-rating';

// create a component
class BookRating extends Component {
    constructor(props) {
        super(props)
        this.state = {
            starCount: this.props.rating,
            review: '',
        }
    }
    async handleStarCountChange(starCount) {
        await this.setState({
            starCount
        });
        const data = {
            item_id: this.props.item.id,
            rating: this.state.starCount,
            review: this.state.review,
        }
        this.props.onReviewed(this.props.order, data);
    }
    async handleReviewChange(e) {
        await this.setState({review: e});
        const data = {
            item_id: this.props.item.id,
            rating: this.state.starCount,
            review: this.state.review,
        }
        this.props.onReviewed(this.props.order, data);   
    }
    render() {
        return (
            <View style={styles.menuWrapper}>
                <View>
                    <Image source={{ uri: this.props.image }} style={styles.image} resizeMode="cover" />
                </View>
                <View style={styles.menuInfo}>
                    <Text style={styles.menuTitle}>{this.props.name}</Text>
                </View>
                <View>
                    <StarRating
                        disabled={false}
                        maxStars={5}
                        rating={this.state.starCount}
                        emptyStarColor={'#e3bd00'}
                        fullStarColor={'#e3bd00'}
                        selectedStar={(rating) => this.handleStarCountChange(rating)}
                    />
                    <TextInput value={this.state.review} onChange={e => this.handleReviewChange(e.nativeEvent.text)} placeholder="type your review" style={{borderBottomColor: 'black', borderBottomWidth: 1}} />
                </View>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    menuWrapper: {
        flex: 1,
        flexDirection: 'column',
        margin: 20,
    },
    image: {
        width: '100%',
        height: 160,
        borderRadius: 30
    },
    menuInfo: {
        flex: 1,
        flexDirection: 'column',
        margin: 10,
    },
    menuTitle: {
        fontFamily: 'Nunito-Regular',
        fontSize: 20,
    },
});

//make this component available to the app
export default BookRating;
