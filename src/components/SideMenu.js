import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions, Image, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import IonIcon from 'react-native-vector-icons/Ionicons'

const {width, height} = Dimensions.get('window')
class SideMenu extends Component {
    render() {
        return (
            <View style={styles.menu}>
                <View style={styles.avatarContainer}>
                    <View style={styles.avatarImage}>
                        <Image 
                            style={styles.avatar}
                            source={require('../images/user.png')} />
                        <Text style={styles.text}>Team Tesla</Text>
                    </View>

                    <Icon
                        name='exchange'
                        color='#fff'
                        size={25}
                        />  
                </View>

                <ScrollView style={styles.scrollContainer}>
                    <View style={styles.textWithIcon}>
                        <View style={styles.withIcon}>
                            <Icon
                                style={styles.iconWithText}
                                name='download'
                                color='#fff'
                                size={25}
                            />
                            <Text style={styles.text}>My Books</Text>
                        </View>
                        <Icon
                            style={styles.rightIcon}
                            name='angle-right'
                            color='#fff'
                            size={25}
                        />     
                    </View>

                    <View style={styles.textWithIcon}>
                        <View style={styles.withIcon}>
                            <IonIcon
                                style={styles.iconWithText}
                                name='md-checkmark'
                                color='#fff'
                                size={25}
                            />
                            <Text style={styles.text}>My List</Text>
                        </View>
                        <Icon
                            style={styles.rightIcon}
                            name='angle-right'
                            color='#fff'
                            size={25}
                        />     
                    </View>

                    <View style={[styles.items, styles.itemSelected]}>
                        <Text style={styles.text}>Home</Text>
                    </View>
                    <View style={[styles.items, styles.noSelectedItems]}>
                        <Text style={styles.text}>Recommendations</Text>
                    </View>
                    <View style={[styles.items, styles.noSelectedItems]}>
                        <Text style={styles.text}>Best Books of 2019</Text>
                    </View>
                    <View style={[styles.items, styles.noSelectedItems]}>
                        <Text style={styles.text}>Goodreads Original</Text>
                    </View>
                    
                    <View style={[styles.items, styles.noSelectedItems]}>
                        <Text style={styles.text}>Log Out</Text>
                    </View>

                </ScrollView>
            </View>
        )
    }
}
 
const styles = StyleSheet.create({
    menu: {
        paddingTop: 40,
        flex: 1,
        width,
        height,
        backgroundColor: '#191919'
    },
    avatarContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: width / 2 + 50,
        borderColor: '#000',
        borderBottomWidth: 3,
        paddingHorizontal: 10,
        paddingVertical: 10
    }, 
    avatar: {
        width: 60,
        height: 60,
        marginRight: 20
    },
    avatarImage: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    text: {
        color: '#fff',
        fontSize: 20
    },
    textWithIcon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: '#000',
        borderBottomWidth: 3,
        paddingVertical: 15
    },
    withIcon: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    scrollContainer: {
        width: width / 2 + 50
    },
    rightIcon: {
        paddingRight: 10
    },
    iconWithText: {
        paddingLeft: 15,
        marginRight: 10
    },
    items: {
        paddingVertical: 15,
        paddingLeft: 20,
        marginTop: 5
    },
    itemSelected: {
        borderLeftWidth: 5,
        borderColor: 'red'
    },
    noSelectedItems: {
        paddingVertical: 15, 
        paddingLeft: 25,
        marginTop: 5
    }

})

export default SideMenu
