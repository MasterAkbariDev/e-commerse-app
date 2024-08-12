import React, { useEffect, useState } from 'react'
import './Products.css'
import getFromAPI from '../../api/fetchAPI'
import Card from '../../Components/Card/Card'
import { useLoader } from '../../context/Loading'
import Loader from '../../Components/Loader/Loader'

const Products = () => {

  const [categories, setCategories] = useState([])
  const [currentCategory, setCurrentCategory] = useState("all")
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [currentSortingMethod, setSortingMethod] = useState()
  const [searchString, setSearchString] = useState('')
  const { loading, showLoader, hideLoader } = useLoader();

  useEffect(() => {
    setFilteredProducts(products)
  }, [products])

  useEffect(() => {
    setSortingMethod('')
    showLoader()
    if (currentCategory === 'all') {
      getFromAPI('https://fakestoreapi.com/products').then(res => {
        setProducts(res)
        hideLoader()
      })
    } else {
      getFromAPI(`https://fakestoreapi.com/products/category/${currentCategory}`).then(res => {
        setProducts(res)
        hideLoader()
      })
    }
  }, [currentCategory])

  useEffect(() => {
    showLoader()
    getFromAPI('https://fakestoreapi.com/products').then(res => {
      setProducts(res)
      hideLoader()
    })
    getFromAPI('https://fakestoreapi.com/products/categories').then(res => {
      setCategories(res)
      hideLoader()
    })
  }, [])

  useEffect(() => {
    setFilteredProducts(prevProducts => {
      const sortedProducts = [...prevProducts].sort((a, b) => {
        if (a.price === b.price) {
          return 0;
        }

        if (currentSortingMethod === 'asc') {
          return a.price > b.price ? 1 : -1;
        } else if (currentSortingMethod === 'desc') {
          return a.price < b.price ? 1 : -1;
        }

        return 0;
      });

      return sortedProducts;
    });
  }, [currentSortingMethod]);

  useEffect(() => {
    searchString ? setFilteredProducts(products.filter(item => item.title.toLowerCase().includes(searchString.toLowerCase()))) : setFilteredProducts(products) 
  },[searchString])



  return (
    loading ? <Loader /> : (
      <div className='container-fluid Main'>
        <div className='row'>
          <div className='Sorting-div col-12 col-lg-3'>
            <b>Categories:</b>
            <ul className='Categories-ul'>
              <li>
                <input onChange={(e) => setCurrentCategory(e.target.id)} className="form-check-input" type="radio" name="categoryRadio" id="all" checked={currentCategory === "all"} />
                <label className="form-check-label" htmlFor="all">All</label>
              </li>
              {categories?.map((item, index) => {
                return (
                  <li key={index}>
                    <input onChange={(e) => setCurrentCategory(e.target.id)} className="form-check-input" type="radio" name="categoryRadio" id={item} checked={currentCategory === item} />
                    <label className="form-check-label" htmlFor={item}>{item}</label>
                  </li>
                )
              })}
            </ul>
            <b>Sorting:</b>
            <ul>
              <li>
                <input onChange={(e) => setSortingMethod(e.target.id)} className="form-check-input" type="radio" name="sortingMethod" id={'asc'} checked={currentSortingMethod === 'asc'} />
                <label className="form-check-label" htmlFor={'asc'}>Ascending</label>
              </li>
              <li>
                <input onChange={(e) => setSortingMethod(e.target.id)} className="form-check-input" type="radio" name="sortingMethod" id={'desc'} checked={currentSortingMethod === 'desc'} />
                <label className="form-check-label" htmlFor={'desc'}>Descending</label>
              </li>
            </ul>
            <b>Search:</b>
            <input className='form-control' onChange={(e) => setSearchString(e.target.value)} value={searchString} />
          </div>
          <div className='Items-div col'>
            {filteredProducts?.map((item) => {
              return <Card id={item.id} image={item.image} title={item.title} price={item.price} key={item.id} />
            })}
          </div>
        </div>
      </div>
    )
  )
}

export default Products