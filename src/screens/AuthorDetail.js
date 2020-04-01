//import liraries
import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Button, Text, Badge } from 'native-base';
import { connect } from 'react-redux';
import { getItem } from '../redux/actions/book';
import { APP_IMAGE_URL } from '../config/config';


// component
import ButtonBack from '../components/BackButton';

// create a component
class AuthorDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
        }
    }

    async componentDidMount() {
        await this.props.dispatch(getItem())
        await this.setState({ isLoading: false })
    }

    rupiah(angka) {
        if (!angka){
            return angka}
        var rupiah = '';
        var angkarev = angka.toString().split('').reverse().join('');
        for (var i = 0; i < angkarev.length; i++) if (i % 3 === 0) rupiah += angkarev.substr(i, 3) + '.';
        return 'Rp.' + rupiah.split('', rupiah.length - 1).reverse().join('');
    }

    render() {
        return (
            <View style={styles.container}>
                {console.log('Cobaaaaaaaaaaaa',this.props.item.data.items)}
                {!this.state.isLoading &&                     <>
                        <ImageBackground source={{ uri: APP_IMAGE_URL.concat(this.props.navigation.state.params.logo) }} style={styles.imageBackground} resizeMethod="auto" resizeMode="cover">
                            <ButtonBack />
                        </ImageBackground>
                        <View style={styles.infoCard}>
                            <Text style={styles.name}>{this.props.navigation.state.params.name}</Text>
                            <ScrollView showsVerticalScrollIndicator={false}>
                                {/* <View style={styles.infoWrapper}>
                                    <View style={styles.ratingWrapper}>
                                        <Icon name="ios-star" size={30} style={styles.star} />
                                        <Text style={styles.starCount}>{this.props.item.data.rating}</Text>
                                    </View>
                                    <Text style={styles.price}>{this.rupiah(this.props.item.data.price)}</Text>
                                </View> */}
                                {/* <Text style={styles.description}>{this.props.item.data.description}</Text> */}
                                {/* <View style={styles.categoryWrapper}>
                                    {this.props.item.data.items && this.props.item.data.items.map((v, i) => (
                                        <Badge style={styles.categories} key={i}>
                                            <Text style={styles.categoryText}>{v.name}</Text>
                                        </Badge>
                                    ))}
                                </View> */}
                            </ScrollView>
                            <Button rounded style={styles.button}>
                                <Text style={styles.buttonText}>Give Review</Text>
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
        marginTop: -120,
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
        marginTop: 85,
        marginLeft:50
    },
    description: {
        fontFamily: 'Nunito-Regular',
        fontSize: 14,
        color: '#666',
        marginTop: 5,
    },
    button: { justifyContent: 'center', marginTop: 10,marginBottom:90, backgroundColor:'#008080' },
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
    },
    categoryText: {
        color: '#111',
        fontFamily: 'Nunito-Regular',
    },
});

const mapStateToProps = state => {
    return {
        item: state.item
    }
}

//make this component available to the app
export default connect(mapStateToProps)(AuthorDetail);
