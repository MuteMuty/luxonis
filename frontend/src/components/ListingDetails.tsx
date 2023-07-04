import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './ListingDetails.css';

interface ListingDetailsProps {
    title: string;
    location: string;
    price: string;
    image_url: string[];
}

const ListingDetails: React.FC<ListingDetailsProps> = ({
    title,
    location,
    price,
    image_url,
}) => {
    const [currentImageIndex] = useState(0);

    return (
        <div className="listing-details">
            <div className="title-location-price">
                <h2>{title}</h2>
                <p>{location}</p>
                <p>{price}</p>
            </div>
            <div className="carousel-container">
                <Carousel showArrows={true} selectedItem={currentImageIndex}>
                    {image_url.map((imageUrl, index) => (
                        <div key={index}>
                            <img src={imageUrl} alt={`${index + 1}`} />
                        </div>
                    ))}
                </Carousel>
            </div>
        </div>
    );
};

export default ListingDetails;
