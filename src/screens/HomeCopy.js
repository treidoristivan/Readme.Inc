import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { Container, Toast } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

// Components
import SearchBar from '../components/SearchBar';
import Category from '../components/Category';
import SliderTitle from '../components/SliderTitle';
import CardList from '../components/CardList';
import AuthorList from '../components/AuthorList';

//Component SideMenu
import Profile from '../components/SideMenu/Profile';
import MyBooks from '../components/SideMenu/MyBooks';
import ReadingChallenge from '../components/SideMenu/ReadingChallenge';
import Recommendations from '../components/SideMenu/Recommendations';
import BestBooks from '../components/SideMenu/BestBooks';
import { withNavigation } from 'react-navigation';
import Home from './Home';

function Feed({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Container>
      <Button title="Open drawer" onPress={() => navigation.openDrawer()} />
      <SearchBar />
            <ScrollView showsVerticalScrollIndicator={false}>
                 <View style={styles.content}>
                    <SliderTitle title="List On Top" viewAll onViewAllPressed={() => this.props.navigation.navigate('Search', { sort: [{ name: "rating", value: "desc" }] })} />
                        <CardList />
                        <Category />
                        <SliderTitle title="All Genre" viewAll />
                        <AuthorList />
                    </View>
                </ScrollView>

      </Container>
      <Button title="Toggle drawer" onPress={() => navigation.toggleDrawer()} />
    </View>
  );
}

function Profile() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Profile/>
    </View>
  );
}

function MyBooks() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <MyBooks/>
    </View>
  );
}

function ReadingChallenge() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ReadingChallenge/>
    </View>
  );
}

function Recommendations() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Recommendations/>
    </View>
  );
}

function BestBooks() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <BestBooks/>
    </View>
  );
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Close drawer"
        onPress={() => props.navigation.closeDrawer()}
      />
      <DrawerItem
        label="Toggle drawer"
        onPress={() => props.navigation.toggleDrawer()}
      />
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Feed" component={Feed} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="MyBooks" component={MyBooks} />
      <Drawer.Screen name="ReadingChallenge" component={ReadingChallenge} />
      <Drawer.Screen name="Recommendations" component={Recommendations} />
      <Drawer.Screen name="BestBooks" component={BestBooks} />
    </Drawer.Navigator>
  );
}

// const HomeCopy=withNavigation(Home)
export default function Home() {
  return (
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
  );
}
