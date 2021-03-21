import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { FiClock, FiInfo, FiArrowLeft } from 'react-icons/fi';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import { useHistory } from 'react-router-dom';
import L from 'leaflet';
import './styles.css';
import mapMarkerImg from '../../assets/images/map-marker.svg';

const happyMapIcon = L.icon({
  iconUrl: mapMarkerImg,
  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [0, -60]
});

const Orphanage = () => {
  const { goBack } = useHistory();

  return (
    <div id="page-orphanage">
      <aside>
        <img src={mapMarkerImg} alt="Happy" />
        <footer>
          <button type="button" onClick={goBack}>
            <FiArrowLeft size={24} color="#fff" />
          </button>
        </footer>
      </aside>
      <main>
        <div className="orphanage-details">
          <img
            src="https://www.gcd.com.br/wp-content/uploads/2020/08/safe-image.jpg"
            alt="Lar das Meninas"
          />
          <div className="images">
            <button type="button" className="active">
              <img
                src="https://www.gcd.com.br/wp-content/uploads/2020/08/safe-image.jpg"
                alt="Lar das Meninas"
              />
            </button>
            <button type="button">
              <img
                src="https://www.gcd.com.br/wp-content/uploads/2020/08/safe-image.jpg"
                alt="Lar das Meninas"
              />
            </button>
            <button type="button">
              <img
                src="https://www.gcd.com.br/wp-content/uploads/2020/08/safe-image.jpg"
                alt="Lar das Meninas"
              />
            </button>
            <button type="button">
              <img
                src="https://www.gcd.com.br/wp-content/uploads/2020/08/safe-image.jpg"
                alt="Lar das Meninas"
              />
            </button>
            <button type="button">
              <img
                src="https://www.gcd.com.br/wp-content/uploads/2020/08/safe-image.jpg"
                alt="Lar das Meninas"
              />
            </button>
          </div>
          <div className="orphanage-details-content">
            <h1>Lar da Meninas</h1>
            <p>Presta assistência a crianças de 6 a 15 anos que se encontrem em situação de risco e/ou vulnerabilidade.</p>
            <div className="map-container">
              <MapContainer
                center={[-27.2092052, -49.6401092]}
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
                  position={[-27.2092052, -49.6401092]}
                />
              </MapContainer>
            </div>
            <hr />
            <h2>Instruções para a visita</h2>
            <p>Venha como se sentir mais à vontade e traga muito amor para dar.</p>
            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15b6d6" />
                Segunda à Sexta <br />
                08:00 às 18:00
              </div>
              <div className="open-on-weekends">
                <FiInfo size={32} color="#39cc83" />
                Atendemos <br />
                fim de semana
              </div>
            </div>
            <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#fff" />
              Entrar em contato
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Orphanage;
