import React, { useEffect, useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import MapView, { Marker, MapEvent } from 'react-native-maps';
import * as Location from 'expo-location';
import styles from './styles';
import mapMarker from '../../assets/images/map-marker.png';

const SelectMapPosition = () => {
  const navigation = useNavigation();

  const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);
  const [selectedPosition, setSelectedPosition] = useState({ latitude: 0, longitude: 0 });

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
    }
    loadPosition();
  }, []);

  function handleSelectMapPosition(event: MapEvent) {
    setSelectedPosition(event.nativeEvent.coordinate);
  }

  function handleNextStep() {
    navigation.navigate('OrphanageData', { selectedPosition });
  }

  return (
    <View style={styles.container}>
      {initialPosition[1] !== 0 && (
        <MapView
          initialRegion={{
            latitude: initialPosition[0],
            longitude: initialPosition[1],
            latitudeDelta: 0.01,
            longitudeDelta: 0.01
          }}
          style={styles.mapStyle}
          onPress={handleSelectMapPosition}
        >
          {selectedPosition.longitude !== 0 && (
            <Marker
              icon={mapMarker}
              coordinate={{ latitude: selectedPosition.latitude, longitude: selectedPosition.longitude }}
            />
          )}
        </MapView>
      )}

      {selectedPosition.longitude !== 0 && (
        <RectButton style={styles.nextButton} onPress={handleNextStep}>
          <Text style={styles.nextButtonText}>Próximo</Text>
        </RectButton>
      )}
    </View>
  );
};

export default SelectMapPosition;
