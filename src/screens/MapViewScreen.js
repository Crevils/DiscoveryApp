import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function MapViewScreen({ route }) {
  const { item } = route.params;
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      {/* Back button */}
      <TouchableOpacity
        style={{
          position: 'absolute',
          top: 10,
          left: 10,
          backgroundColor: '#FFD700',
          borderRadius: 10,
          paddingVertical: 5,
          paddingHorizontal: 10,
        }}
        onPress={() => navigation.goBack()}
      >
        <ChevronLeftIcon size={20} color="#fff" />
      </TouchableOpacity>

      {/* Map */}
      <MapView
        style={{ flex: 1 }}
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
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', position: 'absolute', width: '100%', padding: 20 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ borderRadius: 50, backgroundColor: '#FFD700', padding: 10 }}>
                        <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="#fff" />
                    </TouchableOpacity>
                </View>
    </View>
  );
}
