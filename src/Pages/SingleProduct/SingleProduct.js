import React, { useEffect, useState } from 'react'
import './SingleProduct.css'
import { useNavigate, useParams } from 'react-router'
import getFromAPI from '../../api/fetchAPI'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useLoader } from '../../context/Loading';
import Loader from '../../Components/Loader/Loader';
import { Cart, ChevronLeft } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

const SingleProduct = () => {

    const [data, setData] = useState({})
    const param = useParams()
    const navigate = useNavigate()
    const { loading, showLoader, hideLoader } = useLoader()

    useEffect(() => {
        showLoader()
        !param.id ? navigate('/') : getFromAPI(`https://fakestoreapi.com/products/${param.id}`).then((res) => {
            setData(res)
            hideLoader()
        })
    }, [param])

    return (
        loading ? <Loader /> : (
            <React.Fragment>
                <Link className='go-home' to={'/'}><ChevronLeft/>   Go Home</Link>
                <div className='col singleProduct-div'>
                    <div className='row'>
                        <div className='product-image-div col-12 col-md-6 col-lg-4'>
                            <LazyLoadImage effect='blur' className='product-image' src={data.image} alt={data.title} />
                        </div>
                        <div className='product-data-div col'>
                            <div>
                                <h4>{data?.title}</h4>
                                <p><b>Category:</b> {data.category?.toUpperCase()}</p>
                                <p><b>Price:</b> ${data?.price}</p>
                                <p><b>Rating:</b> {data.rating?.rate}</p>
                                <p>{data?.description}</p>
                            </div>
                            <button className='add-to-cart-button'><Cart /> Add to Cart</button>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    )
}

export default SingleProduct