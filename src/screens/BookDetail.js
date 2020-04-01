//import liraries
import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground, ScrollView, TouchableOpacity, Image, Modal, TextInput, ActivityIndicator, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Counter from 'react-native-counters';
import Feather from 'react-native-vector-icons/Feather';
import { Button, Text } from 'native-base';
import { connect } from 'react-redux';
import { APP_URL, APP_IMAGE_URL } from '../config/config';
import { getItem } from '../redux/actions/book';
import { postCart } from '../redux/actions/cart';
import { withNavigation } from 'react-navigation';
import formatRupiah from '../helper/formatRupiah';

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
        }
    }

    async componentDidMount() {
        const jwt = this.props.auth.data.token;
        await this.props.dispatch(getItem(jwt, this.props.navigation.getParam('itemId')))
        await this.setState({ isLoading: false })
        await this.setState({
            itemImage: { uri: APP_IMAGE_URL.concat(this.props.item.itemDetail.images[0].filename) }
        });
    }

    async handleAddToCart() {
        await this.setState({ isLoading: true })
        const { quantity, description } = this.state
        const jwt = await this.props.auth.data.token
        const data = {
            item_id: this.props.item.itemDetail.id,
            quantity,
            description,
        }
        await this.props.dispatch(postCart(jwt, data))
        await this.setState({ isLoading: false, modalVisible: false })
        Alert.alert("Order Message", "Order Success.")
    }

    onChange(number) {
        this.setState({ quantity: number })
    }

    render() {
        return (
            <View style={styles.container}>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                >
                    <View style={{ marginTop: 22, flex: 1, flexDirection: 'column' }}>
                        <TouchableOpacity style={{ flex: 0, flexDirection: 'row', justifyContent: 'flex-end', margin: 20 }} onPress={() => this.setState({modalVisible: false})}>
                            <Icon name="ios-close-circle" size={30} />
                        </TouchableOpacity>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 30, fontFamily: 'Nunito-Regular' }}>It's FREE !!</Text>
                            <Text style={{ fontSize: 20, fontFamily: 'Nunito-Regular' }}>You can Take Everythings</Text>

                        </View>
                        <View style={{ flex: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                                <Text style={{ fontFamily: 'Nunito-Regular', fontSize: 20 }}>Quantity :</Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                                <Counter start={this.state.quantity} minusIcon={minusIcon} plusIcon={plusIcon} onChange={this.onChange.bind(this)} />
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'column', backgroundColor: '#fff', margin: 20, padding: 20, elevation: 5, borderRadius: 30 }}>
                            <TextInput multiline={true} style={{ justifyContent: 'flex-start' }} placeholder="Type a description for your order" value={this.state.description} onChange={(e) => this.setState({ description: e.nativeEvent.text })} />
                        </View>
                        <View style={{ flex: 0, flexDirection: 'row',paddingBottom:50 }}>
                            <TouchableOpacity style={{ backgroundColor: '#008080', borderRadius: 30, flex: 1, margin: 20, padding: 10 }}
                                onPress={() => {
                                    this.handleAddToCart();
                                }}>
                                {
                                    this.state.isLoading
                                        ? <ActivityIndicator size="small" color="#fff" />
                                        : <Text style={{ color: 'white', fontFamily: 'Nunito-Regular', fontSize: 20, textAlign: 'center', textTransform: 'uppercase' }}>confirm</Text>
                                }
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                {this.state.isLoading 
                    ?   <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><ActivityIndicator size="large" color="black" /></View>
                    :   <>
                            {this.state.itemImage !== null ?
                                <ImageBackground source={this.state.itemImage} style={styles.imageBackground} resizeMethod="auto" resizeMode="cover">
                                    <ButtonBack />
                                </ImageBackground>
                                :
                                <View style={styles.imageBackground}>
                                    <ButtonBack />
                                </View>
                            }
                            <View style={styles.infoCard}>
                                <Text style={styles.name}>{this.props.item.itemDetail.name}</Text>
                                <ScrollView showsVerticalScrollIndicator={false}>
                                    <View style={styles.infoWrapper}>
                                        <View style={styles.ratingWrapper}>
                                            <Icon name="ios-star" size={30} style={styles.star} />
                                            <Text style={styles.starCount}>{this.props.item.itemDetail.rating}</Text>
                                        </View>
                                        {
                                            this.props.item.itemDetail.price !== null &&
                                            <Text style={styles.price}>{formatRupiah(this.props.item.itemDetail.price, 'Rp.')}</Text>
                                        }
                                    </View>
                                    <Text style={styles.description}>{this.props.item.itemDetail.description}</Text>
                                    <View style={styles.categoryWrapper}>
                                        {this.props.item.itemDetail.categories.map((v, i) => (
                                            <TouchableOpacity style={styles.categories} key={i} onPress={() => this.props.navigation.navigate('Search', { search: [{ name: "category", value: v.id }] })}>
                                                <Text style={styles.categoryText}>{v.name}</Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                    <Text style={{ fontFamily: 'Nunito-Regular', marginTop: 10 }}>Suggested Menu</Text>
                                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
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
                                    </ScrollView>
                                    <Text style={{ fontFamily: 'Nunito-Regular', marginTop: 10 }}>Review</Text>
                                    {
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
                                    }
                                </ScrollView>
                                <Button rounded dark style={styles.button} onPress={() => this.setState({ modalVisible: true })}>
                                    <Text style={styles.buttonText}>Add to cart</Text>
                                </Button>
                            </View>
                        </>
                }
            </View>
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
        fontSize: 25,
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
    },
    button: { justifyContent: 'center', marginTop: 10, backgroundColor:'#008080' },
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
        item: state.item,
        auth: state.auth,
    }
}

const BookDetail = withNavigation(BookDetailOriginal)

//make this component available to the app
export default connect(mapStateToProps)(BookDetail);
