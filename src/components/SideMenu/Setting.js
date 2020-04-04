import React, { Component } from "react";
import {StyleSheet} from 'react-native';
import { Container, Header, Content, Icon, Accordion, Text, View } from "native-base";
import BackButton from '../BackButton';
import SliderTitle from '../SliderTitle';
const dataArray = [
  { title: "Email Verification User", content: "Lorem ipsum dolor sit amet" },
  { title: "Forgot Password", content: "Lorem ipsum dolor sit amet" },
  { title: "Add List Book", content: "Lorem ipsum dolor sit amet" },
  { title: "Email Verification User", content: "Lorem ipsum dolor sit amet" },
  { title: "Forgot Password", content: "Lorem ipsum dolor sit amet" },
  { title: "Add List Book", content: "Lorem ipsum dolor sit amet" },
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