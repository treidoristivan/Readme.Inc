//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import SliderTitle from '../components/SliderTitle';
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
              <View style={styles.headerWrapper}>
                    <SliderTitle title="Author" />
                </View>
                <ScrollView
                    vertikal
                    showsVerticalScrollIndicator={true}
                >
                    {this.state.isLoading &&
                        <>
                            <View style={[styles.card, { marginHorizontal: 30 }]}>
                                <View style={styles.cardWrapper}>
                                    <View style={{ backgroundColor: '#eee', width: 250, height: 50 }}></View>
                                    <View style={{ backgroundColor: '#eee', height: 10, width: 250, marginTop: 5 }}></View>
                                </View>
                            </View>
                            
                        </>
                    }
                    {!this.state.isLoading && this.props.author.data.map((v, i) => {
                        var img = <Image source={{ uri: v.author_image }} style={{ width: 100, height: 100, borderRadius: 70, }} resizeMode="cover" />
                        var styled = [styles.card]
                        if (i === 0) {
                            styled.push({ marginHorizontal: 30 })
                        }
                        if (i === this.props.author.data.length - 1) {
                            styled.push({ marginRight: 20 })
                        }
                        return (
                            <TouchableOpacity style={styled} key={i} onPress={() => this.props.navigation.navigate('AuthorDetail', { authorId: v.id })}>
                            <View style={styles.card}>
                                <View style={styles.cardWrapper}>
                                    {img}
                                    <Text style={styles.titles}>Author Name :</Text>
                                    <Text style={styles.title}>{v.author_name}</Text>
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
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 20,
    backgroundColor: 'white',
},
    card: { backgroundColor: '#3399ff', width: 250, height: 150, marginHorizontal: 35,marginVertical:10, elevation: 5, },
    cardWrapper: { flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' },
    title: {textAlign: 'center', fontFamily: 'Nunito-Regular',color:'white', fontSize:17 },
    titles: {textAlign: 'center', fontFamily: 'Nunito-Regular',color:'white', fontSize:10 },
    headerWrapper: {
      flex: 0,
      flexDirection: 'row',
  },

});

const mapStateToProps = state => {
    return {
        author: state.author
    }
}

const Author = withNavigation(AuthorOriginal)

//make this component available to the app
export default connect(mapStateToProps)(Author);
