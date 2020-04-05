//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { Input, Container } from 'native-base';
import { Button} from 'native-base';
import SliderTitle from '../components/SliderTitle';
import { connect } from 'react-redux';
import { getBooks } from '../redux/actions/book';
import { withNavigation } from 'react-navigation';
import { withNavigationFocus } from 'react-navigation';
import { List } from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons';
import { APP_IMAGE_URL } from '../config/config';
import IonIcon from 'react-native-vector-icons/Ionicons';
import BackButton from '../components/BackButton';

// create a component
class SearchOriginal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            isSuccess: false,
            data: [],
            page: 1,
            pagination: {}
        }
    }

    async componentDidMount() {
        await this.setState({ isLoading: true })
        await this.props.dispatch(getBooks(this.state.page))
        this.setState({
            data: this.props.book.data,
            pagination: this.props.book.pagination
        })
        await this.setState({ isLoading: false })
    }

    async componentDidUpdate(prevProps, prevState) {
        if (prevState.searchValue !== this.state.searchValue) {
            if (this.state.searchValue.length >= 3) {
                await this.setState({ isLoading: true })
                await this.props.dispatch(getBooks(1, `&search[book_name]=${this.state.searchValue}`))
                this.setState({data: this.props.book.data})
                await this.setState({ isLoading: false })
            } else if (this.state.searchValue.length === 0) {
                await this.setState({ isLoading: true })
                await this.props.dispatch(getBooks(1, ''))
                this.setState({data: this.props.book.data})
                await this.setState({ isLoading: false })
            }
        }
    }

    fetchData = async () => {
        this.setState({ isLoading: true })
        await this.props.dispatch(getBooks(this.state.page, this.state.searchValue))
        this.setState(prevState => ({ 
            data: [...prevState.data, ...this.props.book.data],
            isLoading: false
        }))
    }

    handleEnd = () => {
        console.log('handleEnd')
        this.setState(prevState => ({ page: prevState.page + 1 }), () => this.fetchData())
    }

    render() {
        console.log('SEARCHED BOOKS LENGTH: ', this.props.book.data)
        return (
            <Container style={styles.container}>
                <View style={styles.headerWrapper}>
                    <BackButton />
                    <View style={styles.searchWrapper}>
                        <IonIcon name="ios-search" style={styles.searchIcon} />
                        <Input style={styles.searchInput} placeholder="Search Books" value={this.state.searchValue} onChange={(e) => this.setState({ searchValue: e.nativeEvent.text })} />
                    </View>
                </View>
                <View style={{
                    flex: 1,
                    position: 'absolute',
                    left: '40%',
                    top: '45%',
                    zIndex: 99
                }}>
                    <ActivityIndicator animating={this.state.isLoading} size={75} color='#aaa' />
                </View>
                <View>
                    <List style={{ paddingBottom: 50 }}>
                        <FlatList
                            data={this.state.data}
                            keyExtractor={(item) => item.id}
                            onEndReached={() => this.handleEnd()}
                            onEndReachedThreshold={0.5}
                            renderItem={({ item }) => {
                                var styler = [styles.card]
                                if (item.id === 0) {
                                    styler.push()
                                }
                                if (item.id === this.state.data.length - 1) {
                                    styler.push()
                                }
                                return (
                                    <TouchableOpacity key={item.id} onPress={() => this.props.navigation.navigate('BookDetail', {bookId: item.id})}>
                                    <View style={{flex:1, flexDirection:'row'}}>
                                    <View style={styles.cardImg}>
                                    <Image style={styles.img} source={{ uri: item.book_image }} />
                                    </View>
                                        <View style={styles.cardWrapper}>
                                            <Text style={styles.title}>{item.book_name}</Text>
                                            <Text >Reviews : {item.total_reviewers}</Text>
                                            <Text >Rating :  <Icon name="ios-star" size={15} style={styles.star} />  {item.avg_rating}</Text>

                                            <Button style={styles.button} onPress={() => this.setState({ modalVisible: true })}>
                                            <Text style={styles.buttonText}>  <Icon name="md-appstore" size={15}/>  Add to List  </Text>
                                            </Button>
                                        </View>
                                        </View>
                                    </TouchableOpacity>
                                )
                            }}
                        />
                            {/* {this.state.isLoading &&
                                <>
                                    <View style={[styles.card, { marginHorizontal: 30 }]}>
                                        <View style={styles.cardWrapper}>
                                            <View style={{ backgroundColor: '#eee', width: 250, height: 50 }}></View>
                                            <View style={{ backgroundColor: '#eee', height: 10, width: 250, marginTop: 5 }}></View>
                                        </View>
                                    </View>
                                    
                                </>
                            } */}
                            {/* {!this.state.isLoading && this.props.author.data.map((v, i) => {
                                
                            })} */}
                    </List>
                </View>
                {/* {
                    this.state.isLoading
                    ?   <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <ActivityIndicator size="large" color='#3399ff' />
                        </View>
                    :   <ScrollView showsVerticalScrollIndicator={false}>
                            {!this.state.isLoading && this.props.item.data.items.map((v, i) => {
                                var img = <View style={[styles.image, { backgroundColor: '#bbb' }]}><Text>No Image</Text></View>
                                if (v.images.length !== 0) {
                                    if (v.images[0].filename.substr(0, 4) === 'http') {
                                        img = <Image source={{ uri: v.images.filename }} style={styles.image} resizeMode="cover" />
                                    } else {
                                        img = <Image source={{ uri: APP_IMAGE_URL.concat(v.images[0].filename) }} style={styles.image} resizeMode="cover" />
                                    }
                                }
                                return (
                                    <TouchableOpacity style={styles.itemWrapper} key={i} onPress={() => this.props.navigation.navigate('ItemDetail', { itemId: v.id })}>
                                        <View>
                                            {img}
                                        </View>
                                        <View style={styles.itemInfo}>
                                            <Text style={styles.itemName}>{v.name}</Text>
                                            <Text style={styles.itemRestaurant}>{v.restaurant}</Text>
                                            <View style={styles.info}>
                                                <Text style={styles.startCount}><IonIcon name="ios-star" style={styles.star} size={18} /> {v.rating}</Text>
                                                <Text style={styles.price}>{formatRupiah(v.price, 'Rp.')}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )
                            })}
                        </ScrollView>
                } */}
            </Container>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor:'#3399ff'
    },
    card: { backgroundColor: '#fff', width: 300, height: 165, borderRadius: 12, margin: 10,marginLeft:25, elevation: 5 },
    cardImg: { flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start'},
    cardWrapper: { flex: 1, flexDirection: 'column', justifyContent: 'flex-start',alignItems:'flex-start', alignSelf:'stretch'},
    img: {width:60, height:80,marginLeft:15},
    title: { marginTop: 10,paddingBottom:10, fontFamily: 'Nunito-Regular',color:'#3399ff' },
    star: {
        color: '#e3bd00',
    },
    button: { marginTop: 6 ,backgroundColor:'#3399ff', height:33,marginLeft:10},
    buttonText: {
        color: 'white',
        fontSize:10,
        textTransform: 'uppercase',
        paddingVertical:0
    },
headerWrapper: {
    flexDirection: 'row',
    margin: 10,
},
searchWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#eee',
    height: 50,
    borderRadius: 25,
    padding: 20,
    marginLeft: 20,
},
itemWrapper: {
    backgroundColor: '#fff',
    elevation: 5,
    borderRadius: 12,
    margin: 10,
    flex: 1,
    flexDirection: 'row',
},
itemInfo: {
    padding: 10,
    flex: 1,
    flexDirection: 'column'
},
itemName: {
    fontFamily: 'Nunito-Regular',
    fontSize: 15
},
itemRestaurant: {
    fontFamily: 'Nunito-Regular',
    fontSize: 10,
    color: '#333'
},
image: {
    width: 100,
    height: 80,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
},
searchIcon: {
    fontSize: 25,
    color: '#3399ff',
    marginRight: 10,
},
searchInput: {
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    color: '#3399ff',
    
},
info: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
},
star: { color: '#e3bd00' },
starCount: { fontFamily: 'Nunito-Regular', },
price: { fontFamily: 'Nunito-Regular', color: 'green' },

});

const mapStateToProps = state => {
    return {
        book: state.book
    }
}

const Search = withNavigation(SearchOriginal)

//make this component available to the app
export default connect(mapStateToProps)(Search);
