//import liraries
import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground, ScrollView, TouchableOpacity, Image, Modal, TextInput, ActivityIndicator, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Counter from 'react-native-counters';
import Feather from 'react-native-vector-icons/Feather';
import { Button, Text } from 'native-base';
import { connect } from 'react-redux';
import { APP_IMAGE_URL } from '../config/config';
import { getBook } from '../redux/actions/book';
import { withNavigation } from 'react-navigation';
import formatRupiah from '../helper/formatRupiah';
import { getMyFavoriteBook, deleteMyFavoriteBook, postMyFavoriteBook } from '../redux/actions/user';
import { getReviewByIdBook } from '../redux/actions/review'

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
            statsBook: true
        }
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
        console.log(this.props.review)
        return (

            <View style={styles.container}>
                <Image style={{ width: 50, height: 50 }} source={{ uri: this.props.book.itemDetail.book_image }} />
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
                            {this.state.addFavorite == true &&
                                <Button rounded dark style={styles.buttonDelete} onPress={() => this.handleDeleteFavorite(this.props.book.itemDetail.id)}>
                                    <Text style={styles.buttonText}>Delete To Favorite</Text>
                                </Button>
                            }

                            {this.state.addFavorite == false &&
                                <Button rounded dark style={styles.button} onPress={() => this.handleAddFavorite(this.props.book.itemDetail.id)}>
                                    <Text style={styles.buttonText}>Add To Favorite</Text>
                                </Button>
                            }


                            <Button rounded dark style={styles.button} onPress={() => this.setState({ modalVisible: true })}>
                                <Text style={styles.buttonText}>Get Book</Text>
                            </Button>

                            {/* <View style={styles.categoryWrapper}>
                                        {this.props.book.itemDetail.map((v, i) => (
                                            <TouchableOpacity style={styles.categories} key={i} onPress={() => this.props.navigation.navigate('Search', { search: [{ name: "category", value: v.id }] })}>
                                                <Text style={styles.categoryText}>{v.name}</Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View> */}
                            <Text style={{ fontFamily: 'Nunito-Regular', marginTop: 10 }}>We Found Related Books for You</Text>
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
                            <View style={{ flex: 1, marginTop: 20, height: 40 }}>

                                <View style={{ flex: 1, backgroundColor: 'grey', width: 140, marginLeft: 20, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
                                    <TouchableOpacity onPress={() => this.toogleReview()}>
                                        <Text style={{ color: 'white', alignContent: 'center', textAlign: 'center' }}>Lihat Komentar</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {/* {
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
        padding: 30
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
    button: { justifyContent: 'center', marginTop: 10, backgroundColor: '#008080' },
    buttonDelete: { justifyContent: 'center', marginTop: 10, backgroundColor: 'red' },
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
