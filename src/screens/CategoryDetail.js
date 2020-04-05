//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Button } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import { withNavigationFocus } from 'react-navigation';
import { connect } from 'react-redux';
import { getBooksByGenre } from '../redux/actions/book';
import { getMyFavoriteBook, deleteMyFavoriteBook, postMyFavoriteBook } from '../redux/actions/user';
import { APP_ICON_URL } from '../config/config';
import formatRupiah from '../helper/formatRupiah'

// create a component
class CategoryDetailOriginal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            addFavorite: false,
        }
    }

    async componentDidMount() {


        await this.props.dispatch(getBooksByGenre(this.props.navigation.state.params.categoryId));
        await this.setState({ isLoading: false });
        this.props.navigation.addListener('didFocus', () => this.onFocus(this.props));


    }

    async onFocus(props) {
        props.dispatch(getBooksByGenre(this.props.navigation.state.params.categoryId));
    }




    render() {
        // console.log('Category Detail, genre detail', this.props)
        // console.log('Books in this genre', this.props.books.data)
        // console.log('BOOK PARAMS', this.props.navigation.state.params.categoryId)
        return (
            <View style={styles.container}>
                <ScrollView vertikal showsVertialScrollIndicator={false}>
                    {this.state.isLoading &&
                        <View style={{ flexDirection: 'column' }}>
                            <View style={styles.card}>
                                <View style={styles.cardWrapper}>
                                    
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
                            <TouchableOpacity style={styler} key={i} onPress={() => this.props.navigation.navigate('BookDetail', { bookId: v.id })}>
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <View style={styles.cardImg}>
                                        <Image style={styles.img} source={{ uri: v.book_image }} />
                                    </View>
                                    <View style={styles.cardWrapper}>
                                        <Text numberOfLines={2} style={styles.title}>{v.book_name}</Text>
                                        <Text >Reviews : {formatRupiah(v.total_reviewers, '') }</Text>
                                        <Text >Rating :  <Icon name="ios-star" size={15} style={styles.star} />  {v.avg_rating}</Text>

                                        {this.props.addFavorite &&
                                            <>
                                                < Button style={styles.button} onPress={() => this.setState({ modalVisible: true })}>
                                                    <Text style={styles.buttonText}>  <Icon name="md-appstore" size={15} />  Delete to Favorite  </Text>
                                                </Button>
                                            </>
                                        }

                                        {!this.state.addFavorite &&
                                            <>
                                                < Button style={styles.button} onPress={() => this.setState({ modalVisible: true })}>
                                                    <Text style={styles.buttonText}>  <Icon name="md-appstore" size={15} />  Add to Favorite  </Text>
                                                </Button>
                                            </>
                                        }

                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    })}
                </ScrollView>
            </View >
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: '#3399ff'
    },
    card: { backgroundColor: '#fff', width: 300, height: 165, borderRadius: 12, margin: 10, marginLeft: 25, elevation: 5 },
    cardImg: { flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start' },
    cardWrapper: { flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', alignSelf: 'stretch' },
    img: { width: 60, height: 80, marginLeft: 15 },
    title: { marginTop: 10, paddingBottom: 10, fontFamily: 'Nunito-Regular', color: '#3399ff' },
    star: {
        color: '#e3bd00',
    },
    button: { marginTop: 6, backgroundColor: '#3399ff', height: 33, marginLeft: 10 },
    buttonText: {
        color: 'white',
        fontSize: 10,
        textTransform: 'uppercase',
        paddingVertical: 0
    },
});

const mapStateToProps = state => {
    return {
        books: state.book,
        auth: state.auth,
        user: state.user
    }
}

const CategoryDetail = withNavigationFocus(CategoryDetailOriginal)

//make this component available to the app
export default connect(mapStateToProps)(CategoryDetail);
