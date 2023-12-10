import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { CachedImage } from '../helpers/image';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ChevronLeftIcon, ClockIcon, FireIcon } from 'react-native-heroicons/outline';
import { HeartIcon, Square3Stack3DIcon, UsersIcon } from 'react-native-heroicons/solid';
import axios from 'axios';
import Loading from '../components/loading';
import YouTubeIframe from 'react-native-youtube-iframe';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { Platform } from 'react-native';
import * as Linking from 'expo-linking';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';

const ios = Platform.OS == 'ios';

export default function RecipeDetailScreen(props) {

    let item = props.route.params;
    const [isFavourite, setIsFavourite] = useState(false);
    const navigation = useNavigation();
    const [buisnessData, setBuisnessData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getBuisnessData(item.title);
    }, [])

    const getBuisnessData = async (id) => {
        try {
            const response = await axios.get(`https://discover.search.hereapi.com/v1/lookup?id=${item.id}&apiKey=Uurus253yojc6Q1c91fCkLjfQL1aVkvxkPL9wYyF0MY`);
            if (response && response.data) {
                setBuisnessData(response.data);
                setLoading(false);
            }
        } catch (err) {
            console.log('error: ', err.message);
        }
    }

    const handleOpenLink = url => {
        Linking.openURL(url);
    }


    return (
        <View style={{ flex: 1, backgroundColor: '#fff', position: 'relative' }}>
            <StatusBar style="light" />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 10 }}>
                {/* Map Preview (Banner) */}
                <View className="flex justify-center">
                    <MapView
                        style={{ height: hp(50) }} // Adjust the height as needed
                        initialRegion={{
                            latitude: item.position.lat,
                            longitude: item.position.lng,
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.01,
                        }}
                    >
                        <Marker
                            coordinate={{ latitude: item.position.lat, longitude: item.position.lng }}
                            title={item.title}
                            description={item.address.label}
                        />
                    </MapView>
                    <View className="flex justify-center items-center">
                        <TouchableOpacity
                            style={{
                                position: 'relative',
                                bottom: 50,
                                width: '30%',
                                alignItems: 'center',
                                backgroundColor: 'gray',
                                borderRadius: 10,
                                paddingVertical: 5,
                                paddingHorizontal: 10,
                            }}
                            onPress={() => navigation.navigate('MapViewScreen', { item })}
                        >
                            <Text style={{ color: '#fff' }}>View on Map</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Back button */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', position: 'absolute', width: '100%', padding: 20 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ borderRadius: 50, backgroundColor: '#FFD700', padding: 10 }}>
                        <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { }} style={{ borderRadius: 50, backgroundColor: '#FFD700', padding: 10 }}>
                        <HeartIcon size={hp(3.5)} strokeWidth={4.5} color="#fff" />
                    </TouchableOpacity>
                </View>

                {/* Dummy Content */}
                <Animated.View animation={FadeInDown} duration={500} style={{ paddingHorizontal: 20, justifyContent: 'space-between', paddingTop: 5 }}>
                    {/* Business name and location  */}
                    <View>
                        <View className="flex flex-row items-center pr-2 mb-1">
                            {item.categories && item.categories.length > 0 ? (
                                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                    {item.categories.map((category, index) => (
                                        <Animated.Text key={index} animation={FadeIn} className="bg-amber-400 mr-2 px-2 rounded-lg" style={{ fontSize: hp(2), color: '#666' }}>
                                            {category.name}
                                        </Animated.Text>
                                    ))}
                                </ScrollView>
                            ) : (
                                <Animated.Text animation={FadeIn} style={{ fontSize: hp(2.5), color: '#666' }}>No categories available</Animated.Text>
                            )}
                        </View>
                        <Animated.Text animation={FadeIn} style={{ fontSize: hp(3.5), fontWeight: 'bold', color: '#333' }}>{item.title}</Animated.Text>
                        <Animated.Text animation={FadeIn} className="pb-3" style={{ fontSize: hp(2), fontWeight: 'medium', color: '#666' }}>⭐ 4.3 (81 ratings)</Animated.Text>
                        <Animated.Text animation={FadeIn} style={{ fontSize: hp(2.1), fontWeight: 'medium', color: '#666' }}>{item.address.label}</Animated.Text>
                        <Animated.Text animation={FadeIn} style={{ fontSize: hp(2.3), fontWeight: 'medium', color: '#666' }}>{`${item.address.city}, ${item.address.state} ${item.address.postalCode}`}</Animated.Text>
                    </View>

                    {/* Rating And Reviews */}
                    <View style={{ marginBottom: 20 }}>
                        
                    </View>


                    <View className="border-b border-amber-500 mt-6 mb-2"></View>
                    {/* Business opening hours */}
                    <View style={{ marginBottom: 20 }}>
                        <Animated.Text animation={FadeIn} style={{ fontSize: hp(3), fontWeight: 'bold', color: '#333' }}>Opening Hours</Animated.Text>
                        {Array.isArray(item.openingHours) && item.openingHours.length > 0 ? (
                            item.openingHours.map((hours, index) => (
                                <Animated.Text key={index} animation={FadeIn} style={{ fontSize: hp(2.5), color: '#666' }}>{hours.text && hours.text.join(', ')}</Animated.Text>
                            ))
                        ) : (
                            <Animated.Text animation={FadeIn} style={{ fontSize: hp(2.5), color: '#666' }}>No opening hours available</Animated.Text>
                        )}
                    </View>

                    {/* Business contacts */}
                    <View style={{ marginBottom: 20 }}>
                        <Animated.Text animation={FadeIn} style={{ fontSize: hp(3), fontWeight: 'bold', color: '#333' }}>Contacts</Animated.Text>

                        {item.contacts && item.contacts.length > 0 ? (
                            <>
                                {item.contacts[0]?.phone && (
                                    <TouchableOpacity onPress={() => openUrl(`tel:${item.contacts[0]?.phone[0]?.value}`)}>
                                        <Animated.Text animation={FadeIn} style={{ fontSize: hp(2.5), color: '#666' }}>{`Phone: ${item.contacts[0]?.phone[0]?.value}`}</Animated.Text>
                                    </TouchableOpacity>
                                )}

                                {item.contacts[0]?.fax && item.contacts[0]?.fax.length > 0 && (
                                    <TouchableOpacity onPress={() => openUrl(`fax:${item.contacts[0]?.fax[0]?.value}`)}>
                                        <Animated.Text animation={FadeIn} style={{ fontSize: hp(2.5), color: '#666' }}>
                                            {`Fax: ${item.contacts[0]?.fax[0]?.value}`}
                                        </Animated.Text>
                                    </TouchableOpacity>
                                )}

                                {item.contacts[0]?.www && item.contacts[0]?.www.length > 0 && (
                                    <TouchableOpacity onPress={() => openUrl(item.contacts[0]?.www[0]?.value)}>
                                        <Animated.Text animation={FadeIn} style={{ fontSize: hp(2.5), color: '#00f' }}>
                                            {`Website: ${item.contacts[0]?.www[0]?.value}`}
                                        </Animated.Text>
                                    </TouchableOpacity>
                                )}

                                {item.contacts[0]?.email && item.contacts[0]?.email.length > 0 && (
                                    <TouchableOpacity onPress={() => openUrl(`mailto:${item.contacts[0]?.email[0]?.value}`)}>
                                        <Animated.Text animation={FadeIn} style={{ fontSize: hp(2.5), color: '#00f' }}>
                                            {`Email: ${item.contacts[0]?.email[0]?.value}`}
                                        </Animated.Text>
                                    </TouchableOpacity>
                                )}
                            </>
                        ) : (
                            <Animated.Text animation={FadeIn} style={{ fontSize: hp(2.5), color: '#666' }}>No contact information available</Animated.Text>
                        )}
                    </View>


                    {/* Add more sections as needed based on your data */}
                </Animated.View>
            </ScrollView>
        </View>
    );

}