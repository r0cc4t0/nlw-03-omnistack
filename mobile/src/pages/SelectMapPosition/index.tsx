import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import MapView, { Marker, MapEvent } from 'react-native-maps';
import styles from './styles';
import mapMarker from '../../assets/images/map-marker.png';

const SelectMapPosition = () => {
  const navigation = useNavigation();

  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });

  function handleSelectMapPosition(event: MapEvent) {
    setPosition(event.nativeEvent.coordinate);
  }

  function handleNextStep() {
    navigation.navigate('OrphanageData', { position });
  }

  return (
    <View style={styles.container}>
      <MapView
        initialRegion={{
          latitude: -27.2092052,
          longitude: -49.6401092,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01
        }}
        style={styles.mapStyle}
        onPress={handleSelectMapPosition}
      >
        {(position.latitude !== 0 || position.longitude !== 0) && (
          <Marker
            icon={mapMarker}
            coordinate={{ latitude: position.latitude, longitude: position.longitude }}
          />
        )}
      </MapView>

      {(position.latitude !== 0 || position.longitude !== 0) && (
        <RectButton style={styles.nextButton} onPress={handleNextStep}>
          <Text style={styles.nextButtonText}>Próximo</Text>
        </RectButton>
      )}
    </View>
  );
};

export default SelectMapPosition;
