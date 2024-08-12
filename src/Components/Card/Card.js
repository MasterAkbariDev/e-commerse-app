import React from 'react'
import './Card.css'
import { Link } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Card = ({ id, image, title, price, }) => {

  const truncateTitle = (title, maxLength = 30) => {
    if (title.length > maxLength) {
      return title.slice(0, maxLength) + '...';
    }
    return title;
  };

  return (
    <Link to={`/Product/${id}`} className="card col-12 col-md-6 col-lg-4 col-xl-3 a">
      <LazyLoadImage effect='blur' src={image} className="card-img-top" alt={title} />
      <div className="card-body">
        <h5>{truncateTitle(title)}</h5>
        <div className='card-detail'>
          <b>${price}</b>
        </div>
      </div>
    </Link>
  )
}

export default Card