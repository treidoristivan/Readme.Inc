//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation'
import { Icon, Item } from 'native-base';

// create a component
class SearchBarOriginal extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.searchbarWrapper}>
                    <Item style={styles.searchbar} onPress={() => this.props.navigation.navigate('Search')}>
                        <Icon name="ios-search" style={styles.searchIcon} />
                        <Text style={styles.searchInput}>Request Favorite Books</Text>
                    </Item>
                </View>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        height: 60,
        paddingBottom: 10,
    },
    searchbarWrapper: { paddingLeft: 20, paddingRight: 20, },
    searchbar: { backgroundColor: '#3399ff', borderRadius: 12, paddingLeft: 15, opacity:0.7, height: 50 },
    searchIcon: { fontSize: 25, color: 'white' },
    searchInput: { fontFamily: 'Nunito-Regular', fontSize: 18, color: 'white' }
});

const SearchBar = withNavigation(SearchBarOriginal);

//make this component available to the app
export default SearchBar;
