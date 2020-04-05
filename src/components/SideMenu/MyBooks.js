//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import SliderTitle from '../SliderTitle';
import { getMyFavoriteBook } from '../../redux/actions/user';
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { APP_ICON_URL, APP_URL } from '../../config/config';

// create a component
class MyFavoriteBooks extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
    }
  }

  async componentDidMount() {
    await this.props.dispatch(getMyFavoriteBook(this.props.auth.token));
    await this.setState({ isLoading: false });
    this.props.navigation.addListener('didFocus', () => this.onFocus(this.props));
  }

  async onFocus(props) {
    props.dispatch(getMyFavoriteBook(this.props.auth.token));
  }
  render() {
    console.log(this.props.user)
    return (
      <View style={styles.container}>
        <View style={styles.headerWrapper}>
            <Text style={{ fontSize: 25, padding: 20 }}>My Books</Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.contentWrapper}>
            {!this.state.isLoading && this.props.user.data.map((v, i) => {
              var styler = [styles.card]
										if (i === 0) {
												styler.push()
										}
										if (i === this.props.user.data.length - 1) {
												styler.push()
										}
                    console.log('avg_rating', v.avg_rating)
										return (
												<TouchableOpacity style={styler} key={i} onPress={() => this.props.navigation.navigate('BookDetail', {bookId: v.id_book})}>
														<View style={styles.cardWrapper}>
																<View style={styles.card2}>
																<Image style={{ width: 60, height: 80,marginTop:25 }} source={{ uri: v.book_image }} />
																</View>
																<Text style={styles.title}>{v.book_name}</Text>
																{/* <View style={{flex:1, flexDirection:'row'}}>
																<Text style={styles.title}>Rating : <Icon name="ios-star" size={15} style={styles.star}> </Icon>{v.avg_rating}</Text>
																</View> */}
														</View>
												</TouchableOpacity>
										)
            })}
          </View>
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
    marginLeft:10 
  },

  headerWrapper: {
    flex: 0,
    flexDirection: 'row',
  },
  contentWrapper: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  categoryCard: {
    backgroundColor: 'white',
    margin: 5,
    elevation: 5,
    flexDirection: 'column',
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: '30%',
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 120,
  },
  card: { backgroundColor: '#3399ff', width: 320, height: 180,borderRadius:20, margin: 10,marginTop:50, elevation: 5 },
  card2: {backgroundColor:'#3399ff', width:120, height:120,borderRadius:60,marginTop:-100,alignItems:'center'},
  cardWrapper: { flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' },
  title: { marginTop: 10, textAlign: 'center', fontFamily: 'Nunito-Regular',color:'white' },
  star: {
      color: '#e3bd00',
  },
  best: {
    width: 450,
    height: 260,
    marginLeft:-60
  }
});

const mapStateToProps = state => {
  return {
    user: state.user,
    auth: state.auth
  }
}

const FavoriteBooks = withNavigation(MyFavoriteBooks)

//make this component available to the app
export default connect(mapStateToProps)(FavoriteBooks);
