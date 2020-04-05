//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { getMyFavoriteBook } from '../../redux/actions/user';
import { withNavigation } from 'react-navigation';
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
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.contentWrapper}>
            {!this.state.isLoading && this.props.user.data.map((v, i) => {
              var image = APP_ICON_URL.concat(v.icon)
              var styler = [styles.card]
              if (i === 0) {
                styler.push({ marginLeft: 20 })
              }
              if (i === this.props.user.data.length - 1) {
                styler.push({ marginRight: 20 })
              }
              return (
                <TouchableOpacity style={styles.categoryCard} key={i} onPress={() => this.props.navigation.navigate('BookDetail', { bookId: v.id_book })}>
                  <Image source={{ uri: `${v.book_image}` }} style={{ width: 40, height: 40 }} />
                  <Text style={{ marginTop: 5, fontFamily: 'Nunito-Regular', fontSize: 14, textAlign: 'center' }}>{v.book_name}</Text>

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
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 20,
    backgroundColor: 'white',
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
