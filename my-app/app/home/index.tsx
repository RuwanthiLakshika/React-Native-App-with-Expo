import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function ListingApp() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10');
      const data = await response.json();
      
      const detailedItems = await Promise.all(
        data.results.map(async (item: { url: string }) => {
          const detailResponse = await fetch(item.url);
          return detailResponse.json();
        })
      );

      setItems(detailedItems);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
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
        <Text className="text-4xl font-bold mb-6">Browse Items</Text>
        
        <View className="relative mb-8">
          <View className="absolute z-10 top-3 left-4">
            <Feather name="search" size={20} color="#9ca3af" />
          </View>
          <TextInput 
            placeholder="Search items..."
            className="w-full p-3 pl-12 bg-gray-50 rounded-lg"
          />
        </View>

        <View className="mb-8">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-2xl font-semibold text-gray-700">Featured</Text>
            <TouchableOpacity>
              <Text className="text-blue-600 font-medium">View All</Text>
            </TouchableOpacity>
          </View>

          {items.map(item => (
            <View key={item.id} className="bg-blue-600 rounded-xl p-4 mb-4">
              <View>
                <Text className="text-2xl font-bold text-white capitalize">{item.name}</Text>
                <Text className="text-lg text-white">Type: {item.types[0]?.type.name}</Text>
                <Text className="text-xl font-bold text-white">
                  #{item.id}
                </Text>
              </View>

              <Image
                source={{ uri: item.sprites.other['official-artwork'].front_default }}
                className="w-full h-48 rounded-lg my-4"
              />

              <View className="flex-row justify-between items-center">
                <View className="flex-row">
                  {item.stats.slice(0, 2).map((stat: { stat: { name: string }, base_stat: number }, index: number) => (
                    <Text key={index} className="text-white mr-4">
                      {stat.stat.name}: {stat.base_stat}
                    </Text>
                  ))}
                </View>
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
              <Text className={item === 'Home' ? 'text-blue-600' : 'text-gray-500'}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}