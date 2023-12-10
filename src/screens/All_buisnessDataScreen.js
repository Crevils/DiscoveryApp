import React from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Datas from '../components/datas';

export default function All_buisnessDataScreen(props) {
  const selectedSubCategory = props.route.params.selectedSubCategory
  const All_BuisnessData = props.route.params.All_BuisnessData
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      {/* datas */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        className="space-y-6"
      >
        {selectedSubCategory && (
          <View className="m-3 mt-24">
            <Datas All_BuisnessData={All_BuisnessData} selectedSubCategory={selectedSubCategory} />
          </View>
        )}
      </ScrollView>


      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', position: 'absolute', width: '100%', padding: 30 }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ borderRadius: 50, backgroundColor: '#FFD700', padding: 10 }}>
          <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
