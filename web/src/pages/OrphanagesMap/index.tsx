import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import Leaflet from 'leaflet';
import './styles.css';
import api from '../../services/api';
import mapMarkerImg from '../../assets/images/map-marker.svg';

const mapIcon = Leaflet.icon({
  iconUrl: mapMarkerImg,
  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [170, 2]
});

interface Orphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
};

const OrphanagesMap = () => {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);
  const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    api.get('orphanages').then(response => {
      setOrphanages(response.data);
    });
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      setInitialPosition([latitude, longitude]);
    });
  }, []);

  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImg} alt="Happy" />
          <h2>Escolha um orfanato no mapa.</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>

        <footer>
          <strong>Itaquaquecetuba</strong>
          <span>São Paulo</span>
        </footer>
      </aside>

      {initialPosition[0] !== 0 && initialPosition[1] !== 0 && (
        <MapContainer
          center={initialPosition}
          zoom={15}
          style={{ width: '100%', height: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {orphanages.map(orphanage => {
            return (
              <Marker
                icon={mapIcon}
                position={[orphanage.latitude, orphanage.longitude]}
                key={orphanage.id}
              >
                <Popup
                  closeButton={false}
                  minWidth={240}
                  maxWidth={240}
                  className="map-popup"
                >
                  {orphanage.name}
                  <Link to={`/orphanages/${orphanage.id}`}>
                    <FiArrowRight size={20} color="#fff" />
                  </Link>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      )}

      <Link to="/orphanages/create" className="create-orphanage">
        <FiPlus size={32} color="#fff" />
      </Link>
    </div>
  );
};

export default OrphanagesMap;
