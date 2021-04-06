import React, { useEffect, useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import * as Location from 'expo-location';
import api from '../../services/api';
import styles from './styles';
import mapMarker from '../../assets/images/map-marker.png';

interface Orphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
};

const OrphanagesMap = () => {
  const navigation = useNavigation();

  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);
  const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);

  useFocusEffect(() => {
    api.get('orphanages').then(response => {
      setOrphanages(response.data);
    });
  });

  useEffect(() => {
    async function loadPosition() {
      const { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Oooops...', 'Precisamos de sua permissão para obter a localização.');
        return;
      }
      const location = await Location.getCurrentPositionAsync();
      const { latitude, longitude } = location.coords;
      setInitialPosition([latitude, longitude]);
    };
    loadPosition();
  }, []);

  function handleNavigateToOrphanageDetails(id: number) {
    navigation.navigate('OrphanageDetails', { id });
  }

  function handleNavigateToCreateOrphanage() {
    navigation.navigate('SelectMapPosition');
  }

  return (
    <View style={styles.container}>
      {initialPosition[1] !== 0 && (
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: initialPosition[0],
            longitude: initialPosition[1],
            latitudeDelta: 0.01,
            longitudeDelta: 0.01
          }}
        >
          {orphanages.map(orphanage => {
            return (
              <Marker
                key={orphanage.id}
                icon={mapMarker}
                calloutAnchor={{
                  x: 2.75,
                  y: 0.85
                }}
                coordinate={{
                  latitude: orphanage.latitude,
                  longitude: orphanage.longitude
                }}
              >
                <Callout tooltip onPress={() => handleNavigateToOrphanageDetails(orphanage.id)}>
                  <View style={styles.calloutContainer}>
                    <Text style={styles.calloutText}>{orphanage.name}</Text>
                  </View>
                </Callout>
              </Marker>
            );
          })}
        </MapView>
      )}

      <View style={styles.footer}>
        <Text style={styles.footerText}>{orphanages.length} orfanato(s) encontrado(s)</Text>
        <RectButton style={styles.createOrphanageButton} onPress={handleNavigateToCreateOrphanage}>
          <Feather name="plus" size={20} color="#fff" />
        </RectButton>
      </View>
    </View>
  );
};

export default OrphanagesMap;
