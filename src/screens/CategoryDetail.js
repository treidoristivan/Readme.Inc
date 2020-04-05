//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import { connect } from 'react-redux';
import { getBooksByGenre } from '../redux/actions/book';
import { APP_ICON_URL } from '../config/config';

// create a component
class CategoryDetailOriginal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
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
        console.log('Category Detail, genre detail', this.props)
        console.log('Books in this genre', this.props.books.data)
        console.log('BOOK PARAMS', this.props.navigation.state.params.categoryId)
        return (
            <View style={styles.container}>
                <ScrollView vertikal showsVertialScrollIndicator={false}>
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
                              <View style={{flex:1, flexDirection:'row'}}>
                              <View style={styles.cardImg}>
                               <Image style={styles.img} source={{ uri: v.book_image }} />
                               </View>
                                <View style={styles.cardWrapper}>
                                    <Text style={styles.title}>{v.book_name}</Text>
                                    <Text style={styles.title}>{v.total_reviewers}</Text>
                                    <Text style={styles.title}>{v.avg_rating}</Text>
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
    container: {
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    card: { backgroundColor: '#fff', width: 300, height: 150, borderRadius: 12, margin: 10,marginLeft:25, elevation: 5 },
    cardImg: { flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start'},
    cardWrapper: { flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'stretch'},
    img: {width:60, height:80,marginLeft:15},
    title: { marginTop: 10, textAlign: 'center', fontFamily: 'Nunito-Regular' },
});

const mapStateToProps = state => {
    return {
        books: state.book,
    }
}

const CategoryDetail = withNavigationFocus(CategoryDetailOriginal)

//make this component available to the app
export default connect(mapStateToProps)(CategoryDetail);
