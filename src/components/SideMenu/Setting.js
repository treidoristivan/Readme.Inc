import React, { Component } from "react";
import {StyleSheet} from 'react-native';
import { Container, Header, Content, Icon, Accordion, Text, View } from "native-base";
import BackButton from '../BackButton';
import SliderTitle from '../SliderTitle';
const dataArray = [
  { title: "Email Verification User", content: "Lorem ipsum dolor sit amet" },
  { title: "Deals is now Kindle Deals", content: "Goodreads Deals and Kindle Daily Deals have been combined into one program: Kindle Daily Deals. For the past few years, Amazon has supported two book price promotion programs – Goodreads Deals and Kindle Daily Deals – with the same mission. We have now decided to focus on providing one great experience with a single program. With Kindle Daily Deals, readers will save up to 80% each day on a wider selection of bestselling and top-rated ebooks in popular genres in one daily email from Kindle." },
  { title: "Want to Read shelf?", content: "If you've marked a book as Read, but it's still showing on your Want to Read or other exclusive shelf, it's likely that you've accidentally shelved multiple versions of the book." },
  { title: "Remove a star rating", content: "Navigate to the book page, Click edit next to My Review, Click clear next to the star rating" },
  { title: "Ratings are gone! What happened?", content: "Have you received any emails from Goodreads? If so, look at those emails to see exactly which address they were sent to. Then try logging in with that email address.Do you use multiple emails? If so, could you have registered your Goodreads account to another email? Try logging in with all of your email addresses.Did you connect your account to Facebook or Twitter? If so, try signing in with Twitter or Facebook (using the icons on the home page) to see if they'll lead to your original account." },
  { title: "Search for a book or author", content: "If you'd like to search for a specific book or author on Goodreads, you'll need to do this from the main Goodreads site (and not on Goodreads Help). Once there, simply type your search term into the search bar at the top of the page." },
  { title: "Find, and Connect to Us ?", content: "https://www.facebook.com/Goodreads/" },

];

export default class Setting extends Component {
  _renderHeader(item, expanded) {
    return (
      <View style={{
        flexDirection: "row",
        padding: 10,
        justifyContent: "space-between",
        alignItems: "center" ,
        backgroundColor: "#fff",
        marginBottom:20 }}>
      <Text style={{ fontWeight: "600" }}>
          {" "}{item.title}
        </Text>
        {expanded
          ? <Icon style={{ fontSize: 18 }} name="remove-circle" />
          : <Icon style={{ fontSize: 18 }} name="add-circle" />}
      </View>
    );
  }
  _renderContent(item) {
    return (
      <Text
        style={{
          backgroundColor: "#e3f1f1",
          padding: 10,
          fontStyle: "italic",
        }}
      >
        {item.content}
      </Text>
    );
  }
  render() {
    return (
      <Container>
        <View style={styles.headerWrapper}>
					<BackButton />
					<SliderTitle title="Help & Support" />
				</View>
        <Content padder >
          <Accordion
            dataArray={dataArray}
            animation={true}
            expanded={true}
            renderHeader={this._renderHeader}
            renderContent={this._renderContent}
          />
        </Content>
      </Container>
    );
  }
}
<br/>

const styles = StyleSheet.create({
	
	headerWrapper: {
        flex: 0,
        flexDirection: 'row',
        margin: 20,
    },
})