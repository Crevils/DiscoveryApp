import { View, Text, ScrollView, Image, TextInput, Pressable, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { BellIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import * as Location from 'expo-location';

import Categories from '../components/categories';
import FamousPlaces from '../components/famousPlaces';
import { categories } from '../constants';
import axios from 'axios';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/loading';
import Config from 'react-native-config';


const apiKey = Config.API_KEY;
export default function HomeScreen() {


  const [activeCategory, setActiveCategory] = useState('Eat-and-drink');
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  const [All_BuisnessData, setAll_BuisnessData] = useState([]);
  const [famousPlacesData, setfamousPlacesData] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [lat, setLat] = useState([])
  const [lot, setLot] = useState([])

  const navigation = useNavigation();
  useEffect(() => {
    (async () => {
      // Request location permission
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === 'granted' && selectedSubCategory) {
        // Get current location
        const location = await Location.getCurrentPositionAsync({});
        console.log(location.coords);
        setLat(location.coords.latitude)
        setLot(location.coords.longitude)
        getAll_buisnessData(selectedSubCategory.strCategory);
        
        // Handle the retrieved location
      }
      if (selectedSubCategory) {
        try {
          // Fetch datas based on the selected subcategory
          const response = await axios.get(`https://discover.search.hereapi.com/v1/discover?at=${lat},${lot}&limit=20&q=${selectedSubCategory.strCategory}&in=countryCode:IND&apiKey=traTGNOcOkuSQzqAWFmtd4ileKvdma2jWJuZ1153Twg`);

          if (response && response.data) {
            if (response.data === 0) {
              <Loading size="large" style={{ marginTop: hp(5) }} />
            } else {
              // Set the fetched data
              setAll_BuisnessData(response.data.items);
              // Navigate to 'All_buisnessDataScreen'
              navigation.navigate('All_buisnessDataScreen', { All_BuisnessData: response.data.items, selectedSubCategory });
            }

          }
        } catch (err) {
          console.log('error: ', err.message);
        }
      }
    })();
  }, [selectedSubCategory]);

  const handleChangeCategory = (category) => {
    getAll_buisnessData(category);
    setActiveCategory(category);
    setAll_BuisnessData([]);
    setSelectedSubCategory(null); // Reset selected subcategory when changing the category
  };

  const handleSelectSubCategory = async (subCat) => {
    if (subCat !== selectedSubCategory) {
      setSelectedSubCategory(subCat);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://autosuggest.search.hereapi.com/v1/autosuggest?at=${lat},${lot}&q=${searchTerm}&apiKey=traTGNOcOkuSQzqAWFmtd4ileKvdma2jWJuZ1153Twg`
      );
      if (response && response.data && response.data.items) {
        setSearchResults(response.data.items);
      }
    } catch (err) {
      console.log('error: ', err.message);
    }
  };

  const getAll_buisnessData = async (category = "Eat-and-drink") => {
    try {
      const response = await axios.get(`https://discover.search.hereapi.com/v1/discover?at=${lat},${lot}&limit=20&q=${category}&in=countryCode:IND&apiKey=traTGNOcOkuSQzqAWFmtd4ileKvdma2jWJuZ1153Twg`);

      if (response && response.data) {
        setAll_BuisnessData(response.data.items);
      }

      const fampousPlaceResponse = await axios.get(`https://discover.search.hereapi.com/v1/discover?at=12.5185124,76.8779611&limit=5&q=rest&in=countryCode:IND&apiKey=traTGNOcOkuSQzqAWFmtd4ileKvdma2jWJuZ1153Twg`);
    // const response = await axios.get(`https://discover.search.hereapi.com/v1/discover?at=${lat},${lot}&limit=5&q=rest&in=countryCode:IND&apiKey=traTGNOcOkuSQzqAWFmtd4ileKvdma2jWJuZ1153Twg`);
      if (fampousPlaceResponse && fampousPlaceResponse.data) {
        setfamousPlacesData(fampousPlaceResponse.data.items)
      }
    } catch (err) {
      console.log('error: ', err.message);
    }
  }

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        className="space-y-6 pt-14"
      >
        {/* avatar and bell icon */}
        <View className="mx-4 flex-row justify-between items-center mb-2">
          <View className="flex-row justify-center items-center gap-4">
            <Image source={require('../../assets/images/avatar.png')} style={{ height: hp(5), width: hp(5.5) }} />
            <Text style={{ fontSize: hp(1.7) }} className="text-neutral-600">Hello, Kislay!</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('NotificationScreen')}>
            <BellIcon size={hp(4)} color="gray" />
          </TouchableOpacity>
        </View>

        {/* greetings and punchline */}
        <View className="mx-4 space-y-2 mb-2">
          <View>
            <Text style={{ fontSize: hp(3.8) }} className="font-semibold text-neutral-600"
            ><Text className="text-amber-400">Discover</Text> local
            </Text>
            <Text style={{ fontSize: hp(3.8) }} className="font-semibold text-neutral-600">businesses restaurants, and points of interest</Text>
          </View>
        </View>

        {/* search bar */}
        <View className="mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]">
          <TextInput
            placeholder='Search any place'
            placeholderTextColor={'gray'}
            style={{ fontSize: hp(1.7) }}
            className="flex-1 text-base mb-1 pl-3 tracking-wider"
            value={searchTerm}
            onChangeText={(text) => setSearchTerm(text)}
          />
          <Pressable
            style={{ backgroundColor: 'transparent' }}
            onPress={() => {
              handleSearch();
            }}
          >
            <View className="bg-white rounded-full p-3">
              <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={3} color="gray" />
            </View>
          </Pressable>
        </View>

        {/* categories */}
        <View>
          {categories.length > 0 && <Categories categories={categories} activeCategory={activeCategory} handleChangeCategory={handleChangeCategory} />}
        </View>
        <Text style={{ fontSize: hp(3), fontWeight: 'bold', color: 'black', marginHorizontal: 20 }}>
          Select Category
        </Text>


        <View >
          {categories
            .find((category) => category.strCategory === activeCategory) // Find the active category
            ?.strSubCategory.map((subCat, index) => (
              <Animated.View
                key={index}
                entering={FadeInDown.delay(index * 100).duration(600).springify().damping(12)}
              >
                <Pressable
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: subCat === selectedSubCategory ? '#FFC107' : 'lightgray',
                    borderRadius: 20,
                    padding: 10,
                    margin: 15,
                  }}
                  onPress={() => handleSelectSubCategory(subCat)}
                >
                  <View style={{ flex: 1, marginRight: 10, backgroundColor: subCat === selectedSubCategory ? '#FFC107' : 'lightgray', }} className="w-full flex justify-center items-center">
                    <Text style={{ fontSize: hp(1.8), fontWeight: 'bold', marginBottom: 5 }}>
                      {subCat.strCategoryName}
                    </Text>
                  </View>
                </Pressable>
              </Animated.View>
            ))}
        </View>

        {/* <View className="m-3 mt-24">
          <View style={{ marginHorizontal: wp(4), marginBottom: hp(3) }}>
            <View>
              <Text style={{ fontSize: hp(3), fontWeight: 'bold', color: 'black', marginBottom: 20 }}>
                Famous Places Near You
              </Text>
              < FamousPlaces famousPlacesData={famousPlacesData} />
            </View>
          </View>
        </View> */}

      </ScrollView>
    </View>
  )
}