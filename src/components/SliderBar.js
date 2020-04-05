import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  Dimensions,
  StyleSheet
} from 'react-native';
import Swiper from 'react-native-swiper';

const {width} = Dimensions.get('window')

const Slider = props => (
  <View style={styles.container}>
    <Image style={styles.image} source={props.uri} />
  </View>
)

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
  },
  image:  {
    flex: 1,
    width,
    paddingRight:20

  }
});

export default class SliderBar extends Component{
  constructor(props){
    super(props);
    this.state = {
      imagesSlider: [
        require('../assets/icons/1.jpg'),
        require('../assets/icons/2.jpg'),
        require('../assets/icons/3.jpeg')
      ]
    }
  }
  render(){
    return(
      <View>
        <Swiper autoplay height={200} width={360} >
            {this.state.imagesSlider.map((item,index)  =>
              <Slider uri={item} key={index} />)
             }
        </Swiper>
      </View>
    )
  }
}