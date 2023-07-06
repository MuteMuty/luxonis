import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IconContext } from "react-icons";
import { FiSun, FiMoon } from 'react-icons/fi';
import axios from 'axios';
import Pagination from './components/Pagination';
import ListingDetails from './components/ListingDetails';
import LoadingSpinner from './components/LoadingSpinner';
import './App.css';

interface Apartment {
  id: number;
  title: string;
  location: string;
  price: string;
  image_url: string[];
}

const App: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const currentPage = parseInt(queryParams.get('page') || '1');
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [totalPages] = useState(50);
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/?page=${currentPage}`);
        const { data } = response;
        console.log(data);
        setApartments(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(true);
        console.error('Error fetching data:', error);
        setTimeout(() => {
          fetchData(); // Retry fetching data after 10 seconds, backend not working yet
        }, 10000);
      }
    };

    fetchData();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    navigate(`/?page=${page}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className={`App ${theme}`}>
      <button className="theme-toggle" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        {theme === 'light' ? <IconContext.Provider value={{ color: "#222" }}>
          <div>
            <FiMoon />
          </div>
        </IconContext.Provider> : <IconContext.Provider value={{ color: "#f8f8f8" }}>
          <div>
            <FiSun />
          </div>
        </IconContext.Provider>}
      </button>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      {isLoading ? (
        <LoadingSpinner />
      ) : (apartments.map((apartment, index) => (
        <div key={apartment.id}>
          <ListingDetails
            title={apartment.title}
            location={apartment.location}
            price={apartment.price}
            image_url={apartment.image_url}
          />
          {index !== apartments.length - 1 && <div className="divider"></div>}
        </div>
      )))}
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
};

export default App;
