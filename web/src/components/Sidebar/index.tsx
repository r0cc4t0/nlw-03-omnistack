import React from 'react';
import { useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import './styles.css';
import mapMarkerImg from '../../assets/images/map-marker.svg';

const Sidebar = () => {
  const { goBack } = useHistory();

  return (
    <aside className="sidebar">
      <img src={mapMarkerImg} alt="Happy" />
      <footer>
        <button type="button" onClick={goBack}>
          <FiArrowLeft size={24} color="#fff" />
        </button>
      </footer>
    </aside>
  );
};

export default Sidebar;
