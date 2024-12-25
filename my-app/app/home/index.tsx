import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function ListingApp() {
  interface Location {
    id: string;
    name: string;
    type: string;
    products?: Record<string, boolean>;
    location?: {
      latitude: number;
      longitude: number;
    };
  }

  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLocations('südkreuz');
  }, []);

  const fetchLocations = async (query: string) => {
    try {
      const response = await fetch(
        `https://v6.db.transport.rest/locations?poi=false&addresses=false&query=${query}`
      );
      const data = await response.json();
      setLocations(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleSearch = (text: string) => {
    if (text.length > 2) {
      fetchLocations(text);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-4">
        <Text className="text-4xl font-bold mb-6">Browse Stations</Text>
        
        <View className="relative mb-8">
          <View className="absolute z-10 top-3 left-4">
            <Feather name="search" size={20} color="#9ca3af" />
          </View>
          <TextInput 
            onChangeText={handleSearch}
            placeholder="Search stations..."
            className="w-full p-3 pl-12 bg-gray-50 rounded-lg"
          />
        </View>

        <View className="mb-8">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-2xl font-semibold text-gray-700">Available Stations</Text>
            <TouchableOpacity>
              <Text className="text-blue-600 font-medium">View All</Text>
            </TouchableOpacity>
          </View>

          {locations.map((location) => (
            <View key={location.id} className="bg-blue-600 rounded-xl p-4 mb-4">
              <View>
                <Text className="text-2xl font-bold text-white">{location.name}</Text>
                <Text className="text-lg text-white">Type: {location.type}</Text>
                {location.products && (
                  <Text className="text-white mt-2">
                    Available Services: {Object.entries(location.products)
                      .filter(([_, value]) => value)
                      .map(([key]) => key)
                      .join(', ')}
                  </Text>
                )}
              </View>

              <View className="flex-row justify-between items-center mt-4">
                <Text className="text-white">
                  {location.location && `${location.location.latitude}, ${location.location.longitude}`}
                </Text>
                <TouchableOpacity className="bg-gray-800 px-4 py-2 rounded-lg">
                  <Text className="text-white">View Details →</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2">
        <View className="flex-row justify-between items-center px-4">
          {['Home', 'Categories', 'Account', 'More'].map(item => (
            <TouchableOpacity key={item} className="items-center">
              <Text className={item === 'Home' ? 'text-blue-600' : 'text-gray-500'}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}