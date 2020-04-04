//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { getAuthor } from '../redux/actions/author';
import { withNavigation } from 'react-navigation';
import { APP_IMAGE_URL } from '../config/config';

// create a component
class AuthorOriginal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            isSuccess: false,
        }
    }

    async componentDidMount() {
        await this.props.dispatch(getAuthor())
        await this.setState({
            isLoading: false,
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView
                    vertikal
                    showsVerticalScrollIndicator={false}
                >
                    {this.state.isLoading &&
                        <>
                            <View style={[styles.card, { marginHorizontal: 30 }]}>
                                <View style={styles.cardWrapper}>
                                    <View style={{ backgroundColor: '#eee', width: 250, height: 50 }}></View>
                                    <View style={{ backgroundColor: '#eee', height: 10, width: 250, marginTop: 5 }}></View>
                                </View>
                            </View>
                            <View style={[styles.card, { marginHorizontal: 30 }]}>
                                <View style={styles.cardWrapper}>
                                    <View style={{ backgroundColor: '#eee', width: 250, height: 50 }}></View>
                                    <View style={{ backgroundColor: '#eee', height: 10, width: 250, marginTop: 5 }}></View>
                                </View>
                            </View>
                            <View style={[styles.card, { marginHorizontal: 30 }]}>
                                <View style={styles.cardWrapper}>
                                    <View style={{ backgroundColor: '#eee', width: 250, height: 50 }}></View>
                                    <View style={{ backgroundColor: '#eee', height: 10, width: 250, marginTop: 5 }}></View>
                                </View>
                            </View>
                        </>
                    }
                    {!this.state.isLoading && this.props.author.data.map((v, i) => {
                        var img = <Image source={{ uri: v.author_image }} style={{ width: 250, height: 50, borderRadius: 50, }} resizeMode="cover" />
                        var styled = [styles.card]
                        if (i === 0) {
                            styled.push({ marginHorizontal: 30 })
                        }
                        if (i === this.props.author.data.length - 1) {
                            styled.push({ marginRight: 20 })
                        }
                        return (
                            <TouchableOpacity style={styled} key={i} onPress={() => this.props.navigation.navigate('AuthorDetail')}>
                                <View style={styles.cardWrapper}>
                                    {img}
                                    <Text style={styles.title}>{v.author_name}</Text>
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    card: { backgroundColor: '#fff', width: 300, height: 120, margin: 10, elevation: 5, },
    cardWrapper: { flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' },
    title: { marginTop: 10, textAlign: 'center', fontFamily: 'Nunito-Regular' },
});

const mapStateToProps = state => {
    return {
        author: state.author
    }
}

const ListAuthor = withNavigation(AuthorOriginal)

//make this component available to the app
export default connect(mapStateToProps)(ListAuthor);
