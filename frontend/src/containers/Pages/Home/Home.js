import React,{ useEffect, useState} from 'react'
import axios from "axios"
import HomeAbout from '../../../components/Pages/Home/HomeAbout/HomeAbout'
import HomeCover from '../../../components/Pages/Home/HomeCover/HomeCover'
import HomeMeniu from '../../../components/Pages/Home/HomeMeniu/HomeMeniu'
import UsersFeedbacks from '../../../components/Pages/Home/UsersFeedbacks/UserFeedbacks'
import classes from "./Home.module.css"
import PopularProducts from '../../../components/Pages/Home/PopularProducts/PopularProducts'
import LoadingScreen from "../../../components/LoadingScreen/LoadingScreen"


export const Home =()=>{
    const [feedbacks, setFeedbacks] = useState([])
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)

    const getData = async ()=>{
        setLoading(true)
        try{
            await axios.get("https://sushifresh-backend.herokuapp.com/feedbacks").then(response=>setFeedbacks(response.data.slice(-9)))
            await axios.get("https://sushifresh-backend.herokuapp.com/products").then(response=>setProducts(response.data))
        }catch (e){
            console.log(e)
        }
        setLoading(false)
    }
    useEffect(()=>{
        getData()
    },[])
    
    return (
        <div className={classes.homeContainer}>
            {loading ? <LoadingScreen loading={loading} /> : 
            <>
            <HomeCover/>
            <HomeMeniu/>
            <HomeAbout/>
            <PopularProducts products={products}/>
            <UsersFeedbacks 
                feedbacks={feedbacks}/>
            </>
            }
        </div>
    )
}
