//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import { connect } from 'react-redux';
import { getCategories } from '../redux/actions/category';
import { APP_ICON_URL } from '../config/config';
import imagePlaceholder from '../assets/images/default.png'

// create a component
class CategoryOriginal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
        }
    }

    async componentDidMount() {
        await this.props.dispatch(getCategories());
        await this.setState({ isLoading: false });
        this.props.navigation.addListener('didFocus', () => this.onFocus(this.props));
    }

    async onFocus(props) {
        props.dispatch(getCategories());
    }

    render() {
        console.log('In component Category', this.props.category.data)
        return (
            <View style={styles.container}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                >
                    {this.state.isLoading &&
                        <View style={{flexDirection: 'row'}}>
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
                    {!this.state.isLoading && this.props.category.data.map((v, i) => {
                        var styler = [styles.card]
                        if (i === 0) {
                            styler.push({ marginLeft: 20 })
                        }
                        if (i === this.props.category.data.length - 1) {
                            styler.push({ marginRight: 20 })
                        }
                        const arrayOfColors = ['#567ce3', '#3c7eb5', '#5f61cf', '#2f3ec4', '#484bdb']
                        const color = arrayOfColors[Math.floor(Math.random() * arrayOfColors.length)]
                        console.log('color', color)
                        return (
                            <TouchableOpacity style={[styler, {backgroundColor: color}]} key={i} onPress={() => this.props.navigation.navigate('CategoryDetail', { categoryId: v.id })}>
                                <View style={styles.cardWrapper}>
                                    <Text style={[styles.title, {color: '#fff'}]}>{v.genre_name}</Text>
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
        category: state.category,
    }
}

const ListCategory = withNavigationFocus(CategoryOriginal)

//make this component available to the app
export default connect(mapStateToProps)(ListCategory);
