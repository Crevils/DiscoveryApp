import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { MagnifyingGlassIcon, ChevronLeftIcon } from 'react-native-heroicons/outline';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from 'axios';

export default function SearchScreen({ navigation }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = (result) => {
    navigation.navigate('RecipeDetail', result);
  };
  const handleSearch = async () => {
    try {
      setLoading(true); // Set loading to true when starting the search
      const response = await axios.get(
        `https://autosuggest.search.hereapi.com/v1/autosuggest?at=42.36346,-71.05444&limit=5&q=${searchTerm}&apiKey=Uurus253yojc6Q1c91fCkLjfQL1aVkvxkPL9wYyF0MY`
      );
      if (response && response.data && response.data.items) {
        setSearchResults(response.data.items);
      }
    } catch (err) {
      console.log('error: ', err.message);
    } finally {
      setLoading(false); // Set loading to false when the search is completed
    }
  };

  return (
    <ScrollView style={{ display: 'flex', backgroundColor: 'white', padding: 16 }}>
      <View className="flex items-center justify-between">
        {/* Back button */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', position: 'absolute', width: '100%', padding: 20 }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ borderRadius: 50, backgroundColor: '#FFD700', padding: 10, top: 10, right: 10 }}>
            <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Search bar */}
        <View style={{ flexDirection: 'row', alignItems: 'center', borderRadius: 25, backgroundColor: 'black', padding: 6, marginVertical: 20, top: 10, position: 'relative', left: '40%', width: '78%' }}>
          <TextInput
            placeholder="Search any place"
            placeholderTextColor="gray"
            style={{ flex: 1, fontSize: hp(1.7), color: 'white', marginLeft: 10 }}
            value={searchTerm}
            onChangeText={(text) => setSearchTerm(text)}
          />
          <Pressable
            style={{ backgroundColor: 'transparent' }}
            onPress={() => {
              handleSearch();
            }}
          >
            <View style={{ backgroundColor: 'white', borderRadius: 15, padding: 10 }}>
              <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={3} color="gray" />
            </View>
          </Pressable>
        </View>

        {/* Display loading indicator */}
        {loading && (
          <View style={{ position: 'absolute', top: '50%', left: '50%', marginLeft: -20, marginTop: -20, zIndex: 1 }}>
            <ActivityIndicator size="large" color="black" />
          </View>
        )}

      </View>

      {/* Display search results */}
      <ScrollView>
        {searchResults.map((result, index) => (
          <Pressable
            key={index}
            onPress={() => navigate(result)}
            style={{ paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: 'lightgray' }}
          >
            <Text style={{ fontSize: hp(1.7), color: 'black' }}>{result.title}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </ScrollView>
  );
}
