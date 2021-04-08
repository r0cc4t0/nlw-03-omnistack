import React, { useEffect, useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { FiClock, FiInfo } from 'react-icons/fi';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import Leaflet from 'leaflet';
import { useParams } from 'react-router-dom';
import './styles.css';
import api from '../../services/api';
import Sidebar from '../../components/Sidebar';
import mapMarkerImg from '../../assets/images/map-marker.svg';

const happyMapIcon = Leaflet.icon({
  iconUrl: mapMarkerImg,
  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [0, -60]
});

interface OrphanageDetails {
  name: string;
  latitude: number;
  longitude: number;
  whatsapp: string;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
  images: Array<{
    id: number;
    url: string;
  }>;
};

interface OrphanageParams {
  id: string;
};

const Orphanage = () => {
  const params = useParams<OrphanageParams>();
  const [orphanage, setOrphanage] = useState<OrphanageDetails>();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    api.get(`orphanages/${params.id}`).then(response => {
      setOrphanage(response.data);
    });
  }, [params.id]);

  if (!orphanage) {
    return (
      <p>Carregando...</p>
    );
  }

  return (
    <div id="page-orphanage">
      <Sidebar />

      <main>
        <div className="orphanage-details">
          <img src={orphanage.images[activeImageIndex].url} alt={orphanage.name} />

          <div className="images">
            {orphanage.images.map((image, index) => {
              return (
                <button
                  key={image.id}
                  type="button"
                  className={activeImageIndex === index ? 'active' : ''}
                  onClick={() => {
                    setActiveImageIndex(index);
                  }}
                >
                  <img src={image.url} alt={orphanage.name} />
                </button>
              );
            })}
          </div>

          <div className="orphanage-details-content">
            <h1>{orphanage.name}</h1>
            <p>{orphanage.about}</p>
            <div className="map-container">
              <MapContainer
                center={[orphanage.latitude, orphanage.longitude]}
                zoom={15}
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker
                  interactive={false}
                  icon={happyMapIcon}
                  position={[orphanage.latitude, orphanage.longitude]}
                />
              </MapContainer>
              <footer>
                <a target="_blank" rel="noopener noreferrer"
                  href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`}
                >
                  Ver rotas no Google Maps
                </a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para a visita</h2>
            <p>{orphanage.instructions}</p>
            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15b6d6" />
                Segunda à Sexta<br />{orphanage.opening_hours}
              </div>
              {orphanage.open_on_weekends
                ? (
                  <div className="open-on-weekends">
                    <FiInfo size={32} color="#39cc83" />
                    Atendemos<br />fim de semana
                  </div>
                )
                : (
                  <div className="closed-on-weekends">
                    <FiInfo size={32} color="#ff669d" />
                    Não atendemos<br />fim de semana
                  </div>
                )
              }
            </div>
            <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#fff" />
              {orphanage.whatsapp}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Orphanage;
