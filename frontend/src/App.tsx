import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Pagination from './components/Pagination';

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/?page=${currentPage}`);
        const { data } = response;
        console.log(data);
        setApartments(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    navigate(`/?page=${page}`);
  };

  return (
    <div className="App">
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      {apartments.map((apartment) => (
        <div key={apartment.id}>
          <h2>{apartment.title}</h2>
          <p>{apartment.location}</p>
          <p>{apartment.price}</p>
          <div>
            {apartment.image_url.map((imageUrl, index) => (
              <img key={index} src={imageUrl} alt={`Image ${index}`} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
