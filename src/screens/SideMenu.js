import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions, Image, ScrollView,TouchableOpacity,TouchableWithoutFeedback,Linking } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { APP_URL } from '../config/config';
import { connect } from 'react-redux';

const { width, height } = Dimensions.get('window')
class SideMenu extends Component {
    render() {
        return (
            <View style={styles.menu}>
                <TouchableOpacity style={styles.imageWrapper} onPress={() => this.props.navigation.navigate('Profile')}>
                    <View style={styles.avatarContainer}>
                        <View style={styles.avatarImage}>
                            <>
                                {this.props.auth.data.user_image !== null &&
                                    <Image style={styles.avatar} source={{ uri: `${APP_URL}${this.props.auth.data.user_image}` }} />
                                }

                                {this.props.auth.data.user_image !== null &&
                                    <Text style={styles.text}>{this.props.auth.data.user_fullname}</Text>
                                }

                                {this.props.auth.data.user_image === null &&
                                    <Image style={styles.avatar} source={require('../assets/images/default.png')} />
                                }

                                {this.props.auth.data.user_image === null &&
                                    <Text style={styles.text}>Tesla</Text>
                                }


                            </>

                        </View>
                        <Icon name='tshirt-crew-outline' color='#fff' size={25} />
                    </View>
                </TouchableOpacity>


                <View style={styles.textWithIcon}>
                    <View style={styles.withIcon}>
                        <Icon style={styles.iconWithText} name='file-cabinet' color='#fff' size={25} />
                        <Text style={styles.text}>My Books</Text>
                    </View>
                    <Icon style={styles.rightIcon} name='menu-right' color='#fff' size={25} />
                </View>

                <View style={styles.textWithIcon}>
                    <View style={styles.withIcon}>
                        <Icon style={styles.iconWithText} name='file-cabinet' color='#fff' size={25} />
                        <Text style={styles.text}>My List</Text>
                    </View>
                    <Icon style={styles.rightIcon} name='menu-right' color='#fff' size={25} />
                </View>
                <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                    <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Home')}>
                        <View style={[styles.items, styles.itemSelected]} >
                            <Icon style={styles.iconWithText} name='home-outline' color='#fff' size={25} />
                            <Text style={styles.text}>Home</Text>
                        </View>
                    </TouchableWithoutFeedback>

                    {/* <View style={[styles.items, styles.noSelectedItems]}>
                        <Text style={styles.text}>Reading Challenge</Text>
                    </View> */}
                 <TouchableOpacity style={styles.imageWrapper} onPress={() => this.props.navigation.navigate('Recommendations')}>
                    <View style={[styles.items, styles.noSelectedItems]}>
                        <Icon style={styles.iconWithText} name='thumb-up' color='#fff' size={25} />
                        <Text style={styles.text}>Recommendations</Text>
                    </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.imageWrapper} onPress={() => this.props.navigation.navigate('BestBooks')}>
                        <View style={[styles.items, styles.noSelectedItems]}>
                            <Icon style={styles.iconWithText} name='trophy' color='#fff' size={25} />
                            <Text style={styles.text}>Best Books of 2019</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.imageWrapper} onPress={ ()=> Linking.openURL('https://play.google.com/store/apps/details?id=com.goodreads') }>
                    <View style={[styles.items, styles.noSelectedItems]}>
                        <Icon style={styles.iconWithText} name='link' color='#fff' size={25} />
                        <Text style={styles.text}>Goodreads Original</Text>
                    </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.imageWrapper} onPress={() => this.props.navigation.navigate('Setting')}>
                    <View style={[styles.items, styles.noSelectedItems]}>
                        <Icon style={styles.iconWithText} name='settings-outline' color='#fff' size={25} />
                        <Text style={styles.text}>Help & Support</Text>
                    </View>
                    </TouchableOpacity>
                    
                    <View style={[styles.items, styles.noSelectedItems]}>
                        <Icon style={styles.iconWithText} name='logout' color='#fff' size={25} />
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
        width: 280,
        height,
        backgroundColor: '#3399ff',

    },
    avatarContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: '#fff',
        borderBottomWidth: 2,
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
        fontSize: 16
    },
    textWithIcon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: '#fff',
        borderBottomWidth: 2,
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
        flexDirection: 'row',
        borderLeftWidth: 0,
        paddingLeft: 0,
        borderColor: 'white'
    },
    noSelectedItems: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingLeft: 0,
        marginTop: 5
    }

})

const mapStateToProps = state => {
    return {
        auth: state.auth,
    }
};

export default connect(mapStateToProps)(SideMenu)