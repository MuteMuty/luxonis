import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
      }
    };

    fetchData();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    navigate(`/?page=${page}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className="App">
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      {apartments.map((apartment) => (
        <div>
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <ListingDetails
              title={apartment.title}
              location={apartment.location}
              price={apartment.price}
              image_url={apartment.image_url}
            />
          )}
        </div>
      ))}
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
};

export default App;
