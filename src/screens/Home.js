//import liraries
import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Container, Toast } from 'native-base';
import NetInfo from '@react-native-community/netinfo';
import { withNavigation } from 'react-navigation';

// Components
import Header from '../components/Header';
import SliderTitle from '../components/SliderTitle';
import SliderBar from '../components/SliderBar';
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
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.content}>
                    <SliderBar />
                    <SliderTitle title="List On Top" to="Category" viewAll onViewAllPressed={() => this.props.navigation.navigate('Search')} />
                        <ListCard />
                        <ListCategory />  
                    <SliderTitle title="Book's Author" to="Author" viewAll />
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
