import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions, Image, ScrollView } from 'react-native'

const {width, height} = Dimensions.get('window')
class SideMenu extends Component {
    render() {
        return (
            <View style={styles.menu}>
                <View style={styles.avatarContainer}>
                    <View style={styles.avatarImage}>
                        <Image 
                            style={styles.avatar}
                            source={require('../assets/images/default.png')}
                            />
                        <Text style={styles.text}>Team Tesla</Text>
                    </View>

                </View>

                <ScrollView style={styles.scrollContainer}>
                    <View style={styles.textWithIcon}>
                        <View style={styles.withIcon}>
                            
                            <Text style={styles.text}>My Books</Text>
                        </View>
                        
                    </View>

                    <View style={styles.textWithIcon}>
                        <View style={styles.withIcon}>
                            
                            <Text style={styles.text}>My List</Text>
                        </View>
                          
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
        backgroundColor: '#3399ff'
    },
    avatarContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: width / 2 + 50,
        borderColor: '#fff',
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
        borderColor: '#fff',
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
