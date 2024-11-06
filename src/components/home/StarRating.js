

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const StarRating = () => {
    // Generar un número aleatorio de estrellas llenas entre 1 y 5
    const totalStars = 5;
    const filledStars = Math.floor(Math.random() * totalStars) + 1;

    return (
        <div>
            {[...Array(totalStars)].map((star, index) => (
                <FontAwesomeIcon
                    key={index}
                    icon={faStar}
                    color={index < filledStars ? '#ffc107' : '#e4e5e9'}
                />
            ))}
        </div>
    );
};

export default StarRating;
