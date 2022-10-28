import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import "./Products.css"
import { clearErrors, getProduct } from '../../actions/productAction'
import Loader from "../layout/loader/Loader"
import ProductCard from "../Home/ProductCard"
import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import Pagination from "react-js-pagination"
import Slider from "@material-ui/core/Slider"
import { useAlert } from "react-alert"
import { Slide, Typography } from '@material-ui/core'
import MetaData from "../layout/MetaData"


const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
];

const Products = () => {


    const dispatch = useDispatch();
    const alert = useAlert();
    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 25000])
    const [category, setCategory] = useState("");
    const [ratings, setRatings] = useState(0)
    const { products, loading, error, productsCount, filteredProductsCount, resultPerPage } = useSelector(state => state.products);
    const params = useParams();
    const keyword = params.keyword;
    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
    }
    const priceHandler = (e, newPrice) => {
        setPrice(newPrice);
    }
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProduct(keyword, currentPage, price, category, ratings));
    }, [dispatch, alert, error, keyword, currentPage, price, category, ratings])

    let count = filteredProductsCount;

    return (
        <Fragment>
            {
                loading ? <Loader /> :
                    <Fragment>

                        <MetaData title="PRODUCTS -- CRAB CART" />
                        <h2 className="productsHeading">
                            Products
                        </h2>

                        <div className="products">
                            {products &&
                                products.map((product) =>
                                    <ProductCard key={product._id} product={product} />
                                )}
                        </div>

                        <div className="filterBox">

                            <Typography>Price</Typography>
                            <Slider
                                value={price}
                                onChange={priceHandler}
                                valueLabelDisplay="auto"
                                aria-labelledby="range-slider"
                                min={0}
                                max={25000}
                            />

                            <Typography>Categories</Typography>

                            <ul className="categoryBox">
                                {categories.map((category) => (
                                    <li className="category-link"
                                        key={category}
                                        onClick={() => { setCategory(category) }}
                                    >{category}
                                    </li>
                                ))}
                            </ul>

                            <fieldset>
                                <Typography component="legend">
                                    Ratings Above
                                </Typography>
                                <Slider
                                    value={ratings}
                                    onChange={(e, newRating) => {
                                        setRatings(newRating);
                                    }}
                                    valueLabelDisplay="auto"
                                    aria-labelledby="continuous-slider"
                                    min={0}
                                    max={5}
                                />
                            </fieldset>

                        </div>

                        {resultPerPage < count && (
                            <div className="paginationBox">
                                <Pagination
                                    activePage={currentPage}
                                    itemsCountPerPage={resultPerPage}
                                    totalItemsCount={productsCount}
                                    onChange={setCurrentPageNo}
                                    nextPageText="Next"
                                    prevPageText="Prev"
                                    firstPagetext="1st"
                                    lastPageText="Last"
                                    itemClass="page-item"
                                    linkClass="page-link"
                                    activeClass="pageItemActive"
                                    activeLinkClass="pageLinkActive"
                                />
                            </div>
                        )}
                    </Fragment>
            }
        </Fragment>
    )
}

export default Products