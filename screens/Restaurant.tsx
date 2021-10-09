import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';
import {isIphoneX} from 'react-native-iphone-x-helper';

import {icons, COLORS, FONTS, SIZES} from '../constants';

const Restaurant = ({route, navigation}) => {
  const scrollX = new Animated.Value(0);
  const [restaurant, setRestaurant] = React.useState(null);
  const [currentLocation, setCurrentLocation] = React.useState(null);

  React.useEffect(() => {
    let {item, currentLocation} = route.params;
    setCurrentLocation(currentLocation);
    setRestaurant(item);
  });
  const renderHeader = () => {
    return (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={{
            width: 50,
            paddingLeft: SIZES.padding * 2,
            justifyContent: 'center',
          }}
          onPress={() => {
            navigation.goBack();
          }}>
          <Image
            source={icons.back}
            resizeMode="contain"
            style={{width: 30, height: 30}}
          />
        </TouchableOpacity>
        {/* restaurant name section */}
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <View
            style={{
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: SIZES.padding * 3,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.lightGray3,
            }}>
            <Text style={{...FONTS.h5}}>{restaurant?.name}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={{
            width: 50,
            paddingRight: SIZES.padding + 2,
            justifyContent: 'center',
          }}>
          <Image
            source={icons.list}
            resizeMode="contain"
            style={{height: 30, width: 30}}
          />
        </TouchableOpacity>
      </View>
    );
  };
  const renderFoodInfo = () => {
    return (
      <Animated.ScrollView
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}>
        {restaurant?.menu.map((item, index) => (
          <View key={`menu-${index}`} style={{alignItems: 'center'}}>
            <View style={{height: SIZES.height * 0.35}}>
              {/* foodImage */}
              <Image
                source={item.photo}
                resizeMode="cover"
                style={{width: SIZES.width, height: '100%'}}
              />
              <View
                style={{
                  position: 'absolute',
                  bottom: -20,
                  width: SIZES.width,
                  height: 50,
                  justifyContent: 'center',
                  flexDirection: 'row',
                }}>
                <TouchableOpacity
                  style={{
                    width: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: COLORS.white,
                    borderBottomLeftRadius: 25,
                    borderTopLeftRadius: 25,
                  }}>
                  <Text style={{...FONTS.body1}}>-</Text>
                </TouchableOpacity>
                <View
                  style={{
                    width: 58,
                    backgroundColor: COLORS.white,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{...FONTS.h2}}>5</Text>
                </View>
                <TouchableOpacity
                  style={{
                    width: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: COLORS.white,
                    borderBottomRightRadius: 25,
                    borderTopRightRadius: 25,
                  }}>
                  <Text style={{...FONTS.body1}}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* name & description */}
            <View
              style={{
                width: SIZES.width,
                alignItems: 'center',
                marginTop: 15,
                paddingHorizontal: SIZES.padding * 2,
              }}>
              <Text
                style={{...FONTS.h2, marginVertical: 10, textAlign: 'center'}}>
                {item.name} - {item.price.toFixed(2)}
              </Text>
              <Text style={{...FONTS.body3, textAlign: 'center'}}>
                {item.description}
              </Text>
            </View>
            {/* calories */}
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <Image
                source={icons.fire}
                style={{width: 20, height: 20, marginRight: 10}}
              />
              <Text style={{...FONTS.body3, color: COLORS.darkgray}}>
                {item.calories.toFixed(2)} cal
              </Text>
            </View>
          </View>
        ))}
      </Animated.ScrollView>
    );
  };
  const renderDots = () => {
    const dotPosition = Animated.divide(scrollX, SIZES.width);
    return (
      <View style={{height: 30}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            height: SIZES.padding,
          }}>
          {restaurant?.menu.map((item, index) => {
            const opacity = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp',
            });
            const dotSize = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [SIZES.base * 0.8, 10, SIZES.base * 0.8],
              extrapolate: 'clamp',
            });
            const dotColor = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [COLORS.darkgray, COLORS.primary, COLORS.darkgray],
              extrapolate: 'clamp',
            });
            return (
              <Animated.View
                key={`dot-${index}`}
                opacity={opacity}
                style={{
                  borderRadius: SIZES.radius,
                  marginHorizontal: 6,
                  width: dotSize,
                  height: dotSize,
                  backgroundColor: dotColor,
                }}
              />
            );
          })}
        </View>
      </View>
    );
  };
  const renderOrder = () => {
    return <View>{renderDots()}</View>;
  };
  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {renderFoodInfo()}
      {renderOrder()}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray2,
  },
});

export default Restaurant;
