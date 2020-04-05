//import liraries
import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground, ScrollView, TouchableOpacity, Image, Modal, TextInput, ActivityIndicator, Alert, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Counter from 'react-native-counters';
import Feather from 'react-native-vector-icons/Feather';
import { Button, Text } from 'native-base';
import { connect } from 'react-redux';
import { APP_IMAGE_URL, APP_URL } from '../config/config';
import { getBook } from '../redux/actions/book';
import { withNavigation } from 'react-navigation';
import formatRupiah from '../helper/formatRupiah';
import { getMyFavoriteBook, deleteMyFavoriteBook, postMyFavoriteBook } from '../redux/actions/user';

import { getReviewByIdBook, postReviewByIdBook } from '../redux/actions/review'

// component
import ButtonBack from '../components/BackButton';

const minusIcon = (isMinusDisabled, touchableDisabledColor, touchableColor) => {
    return <Feather name='minus' size={15} color={isMinusDisabled ? touchableDisabledColor : touchableColor} />
};

const plusIcon = (isPlusDisabled, touchableDisabledColor, touchableColor) => {
    return <Feather name='plus' size={15} color={isPlusDisabled ? touchableDisabledColor : touchableColor} />
};

// create a component
class BookDetailOriginal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            itemImage: null,
            isLoading: true,
            modalVisible: false,
            quantity: 1,
            description: '',
            addFavorite: false,
            statsBook: true,
            modalReview: false,
            review: ''
        }
    }

    toogleReview() {
        this.setState({ modalReview: !this.state.modalReview })
    }

    async componentDidMount() {

        await this.props.dispatch(getBook(this.props.navigation.state.params.bookId))
        await this.setState({ isLoading: false })

        this.props.dispatch(getMyFavoriteBook(this.props.auth.token))
        if (this.props.user.data) {
            const data = this.props.user.data.map((v) => {
                return v.id_book;
            })
            for (var i = 0; i < data.length; i++) {

                if (data[i] == this.props.book.itemDetail.id) {
                    this.setState({ addFavorite: true })
                    break;
                } else {
                    this.setState({ addFavorite: false })
                }
            }
        }
        const data = {
            idBook: this.props.navigation.state.params.bookId
        }
        console.log('datadatadatadatafdatadatarad', data)
        await this.props.dispatch(getReviewByIdBook(data, this.props.auth.token))
    }

    handleDeleteFavorite(id) {
        const data = {
            idBook: id
        }
        this.props.dispatch(deleteMyFavoriteBook(data, this.props.auth.token))
        this.props.dispatch(getMyFavoriteBook(this.props.auth.token))
        this.setState({ addFavorite: !this.state.addFavorite })
    }

    handleAddFavorite(id) {
        const data = {
            idBook: id
        }

        this.props.dispatch(postMyFavoriteBook(data, this.props.auth.token))
        this.props.dispatch(getMyFavoriteBook(this.props.auth.token))
        this.setState({ addFavorite: !this.state.addFavorite })
    }

    async handleAddReview() {
        const dataReview = {
            idBook: this.props.navigation.state.params.bookId,
            review: this.state.review,
        }

        const data = {
            idBook: this.props.navigation.state.params.bookId
        }

        await this.props.dispatch(postReviewByIdBook(dataReview, this.props.auth.token))
        await this.props.dispatch(getReviewByIdBook(data, this.props.auth.token))

    }

    // async handleAddToCart() {
    //     await this.setState({ isLoading: true })
    //     const { quantity, description } = this.state
    //     const jwt = await this.props.auth.data.token
    //     const data = {
    //         item_id: this.props.item.itemDetail.id,
    //         quantity,
    //         description,
    //     }
    //     await this.props.dispatch(postCart(jwt, data))
    //     await this.setState({ isLoading: false, modalVisible: false })
    //     Alert.alert("Order Message", "Order Success.")
    // }

    // onChange(number) {
    //     this.setState({ quantity: number })
    // }

    render() {
        console.log(this.props.review.data)
        console.log(this.state.modalReview)
        return (

            <View style={styles.container}>
                <Text style={styles.description}>{this.props.book.itemDetail.description}</Text>
                <>
                    {this.state.itemImage !== null ?
                        <ImageBackground source={this.props.book.itemDetail.book_image} style={styles.imageBackground} resizeMethod="auto" resizeMode="cover">
                        </ImageBackground>
                        :
                        <View style={styles.imageBackground}>
                        </View>
                    }
                    <View style={styles.infoCard}>
                        <ScrollView showsVerticalScrollIndicator={false}>

                            <Text style={styles.name}>{this.props.book.itemDetail.book_name}</Text>

                            <View style={styles.infoWrapper}>
                                <View style={styles.ratingWrapper}>
                                    <Icon name="ios-star" size={20} style={styles.star} />
                                    <Text style={styles.starCount}>{this.props.book.itemDetail.avg_rating}</Text>
                                    <Text style={styles.description}>{this.props.book.itemDetail.author_name}</Text>
                                </View>

                            </View>
                            <View style={styles.buttonWrapper}>

                            {this.state.addFavorite == true &&
                                <Button rounded dark style={styles.buttonDel} onPress={() => this.handleDeleteFavorite(this.props.book.itemDetail.id)}>
                                    <Text style={styles.buttonText}>Delete To Favorite</Text>
                                </Button>
                            }

                            {this.state.addFavorite == false &&
                                <Button rounded dark style={styles.button} onPress={() => this.handleAddFavorite(this.props.book.itemDetail.id)}>
                                    <Text style={styles.buttonText}>Add To Favorite</Text>
                                </Button>
                            }


                            <Button rounded dark style={styles.button2} onPress={() => this.setState({ modalVisible: true })}>
                                <Text style={styles.buttonText}>Get Book</Text>
                            </Button>
                            </View>
                            {/* <View style={styles.categoryWrapper}>
                                        {this.props.book.itemDetail.map((v, i) => (
                                            <TouchableOpacity style={styles.categories} key={i} onPress={() => this.props.navigation.navigate('Search', { search: [{ name: "category", value: v.id }] })}>
                                                <Text style={styles.categoryText}>{v.name}</Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View> */}
                            {/* <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                        {this.props.item.itemDetail.suggests.map((v, i) => {
                                            console.log(v);
                                            return (
                                                <TouchableOpacity style={{ backgroundColor: '#fff', width: 100, height: 120, borderRadius: 12, margin: 10, elevation: 5, marginLeft: 20 }} key={i} onPress={() => this.props.navigation.replace('ItemDetail', { itemId: v.id })}>
                                                    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 20 }}>
                                                        {
                                                            v.images.length !== 0
                                                                ? <Image source={{ uri: APP_IMAGE_URL.concat(v.images[0].filename) }} style={{ backgroundColor: '#eee', width: '100%', height: '100%', borderRadius: 12, }} resizeMode="cover" />
                                                                : <Image source={{ uri: `asset:/icons/favicon.png` }} style={{ width: 50, height: 50 }} resizeMode="cover" />
                                                        }
                                                        <Text style={{ fontFamily: 'Nunito-Regular', fontSize: 12, textAlign: 'center' }}>{v.name}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            )
                                        })}
                                    </ScrollView> */}
                            <View style={{ marginTop: 20, height: 40, alignSelf: 'center' }}>

                                <View style={{ flex: 1, backgroundColor: 'grey', width: 140, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
                                    <TouchableOpacity onPress={() => this.toogleReview()}>
                                        <Text style={{ color: 'white', alignContent: 'center', textAlign: 'center' }}>See Reviews</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {this.state.modalReview == true &&
                                <ScrollView contentContainerStyle={{marginVertical: 10}}>
                                    <FlatList
                                        data={this.props.review.data}
                                        renderItem={({ item, index }) =>

                                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                                <View style={{ flex: 1, marginLeft: 10 }}>

                                                    {item.user_image == '' &&
                                                        <Image source={require('../assets/images/default.png')}
                                                            style={{ height: 50, width: 50, borderRadius: 50 }}>
                                                        </Image>
                                                    }

                                                    {item.user_image !== '' &&
                                                        <Image source={{ uri: `${APP_URL}${item.user_image}` }}
                                                            style={{ height: 50, width: 50, borderRadius: 50 }}>
                                                        </Image>
                                                    }

                                                </View>

                                                <View style={{ flex: 4, marginTop: 6, marginRight: 10, borderRadius: 15, backgroundColor: '#F0EAE8' }}>
                                                    <View style={{ marginLeft: 14, marginTop: 5, marginBottom: 10 }}>
                                                        <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>{item.user_fullname}</Text>

                                                        <Text>{item.review}</Text>
                                                    </View>
                                                </View>



                                            </View>

                                        } />
                                    <View style={{ position: 'relative', flex: 1, marginTop: 10 }}>
                                        <View style={{ flex: 1 }}>
                                            <TextInput on placeholder='Review ' style={{ borderBottomColor: '#8A8F9E', borderBottomWidth: 1, height: 50, fontSize: 15, color: '#161F3D', borderWidth: 1, borderRadius: 10, paddingLeft: 20 }
                                            }
                                                underlineColorAndroid="transparent" onChangeText={review => this.setState({ review })}
                                            />
                                        </View>
                                        <View style={{ flex: 1, backgroundColor: 'grey', width: 140, height: 35, justifyContent: 'center', alignItems: 'center',marginTop: 10, alignSelf: 'center', borderRadius: 10 }}>
                                            <TouchableOpacity onPress={() => this.handleAddReview()}>
                                                <Text style={{ color: 'white', alignContent: 'center', textAlign: 'center' }}>Send</Text>
                                            </TouchableOpacity>
                                        </View>

                                    </View>

                                </ScrollView>

                            /* {
                                        this.props.item.itemDetail.reviews.map((v, i) => {
                                            return (
                                                <View style={{ backgroundColor: 'white', padding: 10, margin: 10, elevation: 3, borderRadius: 12 }} key={i}>
                                                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                                                        <View style={{ flex: 1 }}>
                                                            <Text style={{ fontSize: 16, fontFamily: 'Nunito-Regular' }}>{v.user.length !== 0 ? v.user[0].name : 'Anonimous'}</Text>
                                                        </View>
                                                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                                                            <Icon name="ios-star" size={20} style={styles.star} />
                                                            <Text style={styles.starCount, { fontSize: 16 }}>{v.rating}</Text>
                                                        </View>
                                                    </View>
                                                    <Text style={{ margin: 5, fontSize: 12, fontFamily: 'Nunito-Regular' }}>{v.review}</Text>
                                                </View>
                                            )
                                        })
                                    } */}
                        </ScrollView>

                    </View>
                </>
            </View >
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    imageBackground: {
        flex: 1,
        padding: 20,
    },
    infoCard: {
        backgroundColor: 'white',
        flex: 1,
        flexDirection: 'column',
        marginTop: -200,
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        paddingHorizontal: 30,
        paddingTop: 15
    },
    buttonWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    infoWrapper: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    ratingWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    star: {
        color: '#e3bd00',
    },
    starCount: {
        fontFamily: 'Nunito-Regular',
        fontSize: 18,
    },
    price: {
        fontFamily: 'Nunito-Regular',
        fontSize: 25,
        color: 'green',
    },
    name: {
        fontFamily: 'Nunito-Regular',
        fontSize: 25,
        marginBottom: 5,
    },
    description: {
        fontFamily: 'Nunito-Regular',
        fontSize: 14,
        color: '#666',
        marginTop: 5,
        padding: 15
    },
    button: {
        backgroundColor: '#3399ff',
        padding: 8,
        borderBottomLeftRadius:20,
        borderTopLeftRadius:20,
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        marginTop: 10,
        marginRight: 5
    },   
    buttonDel: {
        backgroundColor: 'red',
        padding: 10,
        borderBottomLeftRadius:20,
        borderTopLeftRadius:20,
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        marginTop: 10,
        marginRight: 5
    },
    button2: {
        backgroundColor: '#00cc00',
        padding: 10,
        borderBottomRightRadius:20,
        borderTopRightRadius:20,
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        marginTop: 10,
        marginLeft: 5
    },
    buttonText: {
        color: 'white',
        textTransform: 'uppercase',
    },
    categoryWrapper: {
        flexDirection: 'row',
        marginTop: 5,
        flexWrap: 'wrap',
    },
    categories: {
        backgroundColor: '#ddd',
        marginRight: 5,
        marginBottom: 5,
        borderRadius: 10,
        padding: 5,
    },
    categoryText: {
        color: '#111',
        fontFamily: 'Nunito-Regular',
    },
});

const mapStateToProps = state => {
    return {
        book: state.book,
        auth: state.auth,
        user: state.user,
        review: state.review
    }
}

const BookDetail = withNavigation(BookDetailOriginal)

//make this component available to the app
export default connect(mapStateToProps)(BookDetail);
