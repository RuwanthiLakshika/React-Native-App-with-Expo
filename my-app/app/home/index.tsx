import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { ClickCountContext } from '../ClickCountContext';

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

  const { clickCount, setClickCount } = useContext(ClickCountContext);
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

  const handleItemClick = () => {
    setClickCount(clickCount + 1);
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>Browse Stations</Text>
        
        <View style={styles.searchContainer}>
          <View style={styles.searchIcon}>
            <Feather name="search" size={20} color="#9ca3af" />
          </View>
          <TextInput 
            onChangeText={handleSearch}
            placeholder="Search stations..."
            style={styles.searchInput}
          />
        </View>

        <View>
          <View style={styles.header}>
            <Text style={styles.subtitle}>Available Stations</Text>
            <TouchableOpacity>
              <Text style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
          </View>

          {locations.map((location) => (
            <View key={location.id} style={styles.card}>
              <View>
                <Text style={styles.cardTitle}>{location.name}</Text>
                <Text style={styles.cardSubtitle}>Type: {location.type}</Text>
                {location.products && (
                  <Text style={styles.cardText}>
                    Available Services: {Object.entries(location.products)
                      .filter(([_, value]) => value)
                      .map(([key]) => key)
                      .join(', ')}
                  </Text>
                )}
              </View>

              <View style={styles.cardFooter}>
                <Text style={styles.cardText}>
                  {location.location && `${location.location.latitude}, ${location.location.longitude}`}
                </Text>
                <TouchableOpacity style={styles.detailsButton} onPress={handleItemClick}>
                  <Text style={styles.detailsButtonText}>Click Me</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Floating Button */}
      <TouchableOpacity style={styles.floatingButton}>
        <Text style={styles.floatingButtonText}>{clickCount}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollView: {
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  searchContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  searchIcon: {
    position: 'absolute',
    zIndex: 10,
    top: 10,
    left: 12,
  },
  searchInput: {
    width: '100%',
    padding: 12,
    paddingLeft: 40,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  viewAll: {
    color: '#1d4ed8',
    fontWeight: '500',
  },
  card: {
    backgroundColor: '#2563eb',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  cardSubtitle: {
    fontSize: 16,
    color: '#ffffff',
  },
  cardText: {
    color: '#ffffff',
    marginTop: 8,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  detailsButton: {
    backgroundColor: '#1f2937',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  detailsButtonText: {
    color: '#ffffff',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: '#f4f6f9',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  floatingButtonText: {
    color: '#090909',
    fontSize: 18,
    fontWeight: 'bold',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
