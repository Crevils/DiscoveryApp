import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Pressable, ScrollView, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Datas from '../components/datas';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { CachedImage } from '../helpers/image';
import axios from 'axios';
import Loading from '../components/loading';
import * as Location from 'expo-location';

export default function NotificationScreen() {
    const navigation = useNavigation();
    const [data, setData] = useState([]);
  
    useEffect(() => {
        const fetchData = async () => {
            try {
                const location = await Location.getCurrentPositionAsync({});
                const lat = location.coords.latitude;
                const lon = location.coords.longitude;

                const response = await axios.get(`https://discover.search.hereapi.com/v1/discover?at=${lat},${lon}&limit=5&q=rest&in=countryCode:IND&apiKey=traTGNOcOkuSQzqAWFmtd4ileKvdma2jWJuZ1153Twg`);

                if (response && response.data && response.data.items) {
                    setData(response.data.items);
                    
                }
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };

        fetchData();
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 50 }}
                className="space-y-6"
            >
                <View className="m-3 mt-24">
                    <View style={{ marginHorizontal: wp(4), marginBottom: hp(3) }}>
                        <Text style={{ fontSize: hp(3), fontWeight: 'bold', color: 'black', marginBottom: 20 }}>
                            Notification
                        </Text>
                        <View>
                        <Text style={{ fontSize: hp(3), fontWeight: 'bold', color: 'black', marginBottom: 20 }}>
                            Famous Places Near You
                        </Text>
                            {data.length === 0 ? (
                                <Loading size="large" style={{ marginTop: hp(5) }} />
                            ) : (
                                <View>
                                    {data.map((item, index, navigation) => (
                                        <RecipeCard key={item.id} item={item} index={index} navigation={navigation} />
                                        // <Text key={index}>{item.title}</Text>
                                    ))} 
                                </View>
                            )}
                        </View>
                    </View>
                </View>
            </ScrollView>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', position: 'absolute', width: '100%', padding: 30 }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ borderRadius: 50, backgroundColor: '#FFD700', padding: 10 }}>
                    <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="#fff" />
                </TouchableOpacity>
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
  