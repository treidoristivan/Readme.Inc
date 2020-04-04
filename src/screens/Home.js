//import liraries
import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Container, Toast } from 'native-base';
import NetInfo from '@react-native-community/netinfo';
import { withNavigation } from 'react-navigation';

// Components
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import SliderTitle from '../components/SliderTitle';
import ListCategory from '../components/ListCategory';
import ListCard from '../components/ListCard';
import ListAuthor from '../components/ListAuthor';

// create a component
class HomeOriginal extends Component {
    
    async componentDidMount() {
        NetInfo.fetch().then(state => {
            if (!state.isConnected) {
                Toast.show({
                    text: 'No Internet Connection',
                    buttonText: 'Okay',
                    duration: 7000,
                    position: 'bottom',
                })
            }
        });
    }
    render() {
        return (
            <Container>
                <Header />
                <SearchBar />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.content}>

                    <SliderTitle title="List On Top" viewAll onViewAllPressed={() => this.props.navigation.navigate('Search', { sort: [{ name: "rating", value: "desc" }] })} />
                        <ListCard />
                        <ListCategory />  
                    <SliderTitle title="All Genre" viewAll />
                        <ListAuthor />
                    </View>
                </ScrollView>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    content: { paddingBottom: 20 },
})

const Home = withNavigation(HomeOriginal)

//make this component available to the app
export default Home;
