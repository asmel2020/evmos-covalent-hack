import React,{useState} from 'react';
import {Layout, Text} from '@ui-kitten/components';
import style from './style';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {Image, useWindowDimensions, View} from 'react-native';
import {Slider} from './interfaces';

const data = [
  {
    img: require('../../assets/snapCarousel/a.png'),
  },
  {
    img: require('../../assets/snapCarousel/b.png'),
  },
  {
    img: require('../../assets/snapCarousel/c.png'),
  },
];

const LayoutDescription = () => {
  const {width} = useWindowDimensions();
  const [snapIndex, setSnapIndex] = useState<number>(0)
  const renderItem = (item: Slider) => {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image style={{height: '100%', width: '100%',marginTop:100}} source={item.img} />
      </View>
    );
  };
  return (
    <Layout style={style.container}>
      <Carousel
        //ref={(c) => { this._carousel = c; }}
        data={data}
        renderItem={({item}) => renderItem(item)}
        sliderWidth={width}
        itemWidth={width}
        layout="default"
        onSnapToItem={(index)=>{
          setSnapIndex(index)
        }}
      />

      <Pagination dotsLength={data.length} activeDotIndex={snapIndex} dotStyle={{
        backgroundColor:'#0F4695'
      }} />
    </Layout>
  );
};
export default LayoutDescription;
