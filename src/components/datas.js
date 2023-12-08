import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { FadeInDown } from 'react-native-reanimated';
import Loading from './loading';
import { CachedImage } from '../helpers/image';
import { useNavigation } from '@react-navigation/native';

export default function Datas({ buisnessDatas }) {
  const navigation = useNavigation();

  return (
    <View style={{ marginHorizontal: wp(4), marginBottom: hp(3) }}>
      <Text style={{ fontSize: hp(3), fontWeight: 'bold', color: 'black' }}>
        Explore
      </Text>
      <View>
        {buisnessDatas.length === 0 ? (
          <Loading size="large" style={{ marginTop: hp(5) }} />
        ) : (
          <View>
            {buisnessDatas.map((item, index) => (
              <RecipeCard key={item.id} item={item} index={index} navigation={navigation} />
            ))}
          </View>
        )}
      </View>
    </View>
  );
}

const RecipeCard = ({ item, index, navigation }) => {
  return (
    <Animated.View entering={FadeInDown.delay(index * 100).duration(600).springify().damping(12)}>
      <Pressable
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: 'white',
          borderRadius: 10,
          padding: 10,
          marginBottom: 10,
        }}
        onPress={() => navigation.navigate('RecipeDetail', { ...item })}
      >
        <View style={{ flex: 1, marginRight: 10 }}>
          <Text style={{ fontSize: hp(1.8), fontWeight: 'bold', marginBottom: 5 }}>{item.title}</Text>
          <Text style={{ fontSize: hp(1.5), color: 'gray' }}>
            {/* Display additional information based on your JSON structure */}
            {item.address.label}
          </Text>
        </View>
        {/* Adjust this based on your actual image property in the JSON */}
        <CachedImage uri={item.image} style={{ width: hp(8), height: hp(8), borderRadius: 5 }} />
      </Pressable>
    </Animated.View>
  );
};
