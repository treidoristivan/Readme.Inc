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
        await this.props.dispatch(getBooksByGenre());
        await this.setState({ isLoading: false });
        this.props.navigation.addListener('didFocus', () => this.onFocus(this.props));
    }

    async onFocus(props) {
        props.dispatch(getBooksByGenre());
    }

    render() {
        console.log('Category Detail, genre detail', this.props)
        return (
            <View style={styles.container}>
                <ScrollView vertikal showsVertialScrollIndicator={false}>
                    {this.state.isLoading &&
                        <View style={{flexDirection: 'column'}}>
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
                            <TouchableOpacity style={styler} key={i} onPress={() => this.props.navigation.navigate('Search', {search: [{name:"category", value: v.id}]})}>
                                <View style={styles.cardWrapper}>
                                    <Image style={{ width: 50, height: 50 }} source={{ uri: APP_ICON_URL.concat(v.icon) }} />
                                    <Text style={styles.title}>{v.name}</Text>
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
    card: { backgroundColor: '#fff', width: 150, height: 120, borderRadius: 12, margin: 10, elevation: 5 },
    cardWrapper: { flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' },
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
