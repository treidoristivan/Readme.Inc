import React, { Component } from "react";
import { Container, Header, Content, Icon, Accordion, Text, View } from "native-base";

export default class AccordionCustomHeaderContent extends Component {
  constructor(props){
    super(props)
    this.state = {

    }
  }
  _renderHeader(item, expanded) {
    return (
      <View style={{
        flexDirection: "row",
        padding: 10,
        alignItems: "center" ,
        backgroundColor: "#fff",
        justifyContent: 'center'}}>
        <Text>
          {" "}{item.title}
        </Text>
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
          <Accordion
            dataArray={this.props.data}
            animation={true}
            expanded={true}
            renderHeader={this._renderHeader}
            renderContent={this._renderContent}
          />
    );
  }
}