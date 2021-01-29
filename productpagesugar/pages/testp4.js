import Head from 'next/head'
import {useState} from 'react'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import Truncate from 'react-truncate';


export default function product1    ({data}){
    const [expand, setexpand] = useState(false)
    const [truncate, settruncate] = useState(false)
    const [productData, setProductData] = useState(data)
    const [imgData, setimgData] = useState(productData.resbody.variants[0].images)
    const [price,setprice] = useState(productData.resbody.variants[0].price)
    const [compare_at_price,setcompare_at_price] = useState(productData.resbody.variants[0].compare_at_price)
    const [offerText,setofferText] = useState(productData.resbody.variants[0].offers)

    const handleToggle = () => {
        setexpand(!expand)
    }
    
    const handletruncate = (truncated) => {
        if(truncate!==truncated){
            settruncate(truncated)
        }
    }

    return(
        <>
        <div>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
        </div>
        <div style={{"overflowX":"hidden"}}>
        <div class={`container-fluid mt-3 mb-3 ${styles.sticky}`}>
            <div class="row">
                <div class="col-1 col-sm-3 col-md-4  "></div>
                <div class="col-10 col-sm-7 col-md-4 col-lg-4">
                <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
                    <ol class="carousel-indicators">
                        <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active"></li>
                        <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"></li>
                        <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"></li>
                    </ol>
  
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src={imgData[0]} class="d-block w-100" alt="..."/>
    </div>
    <div class="carousel-item">
      <img src={imgData[1]} class="d-block w-100" alt="..."/>
    </div>
    <div class="carousel-item">
      <img src={imgData[2]} class="d-block w-100" alt="..."/>
    </div>
  </div>
  <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </a>
</div>
                </div>
                <div class="col-1 col-sm-2 col-md-4"></div>
            </div>
        </div> 

        <div class="container-fluid">
            <div class="row">
                <div class="col text-center">
                    <p className={styles.productTitle}>{productData.resbody.title}</p>
                </div>
            </div>
            <div class="row">
            <div class="col text-center">
                    <h5 class={`text-danger ${styles.linecut}`}>{compare_at_price && `Rs. ${compare_at_price}`}</h5>                
                </div>
                <div class="col text-center">
                    <p className={styles.productTitle}>Rs. {price}</p>                
                </div>
                <div class="col">
                {compare_at_price && 
                <h5 class="text-danger">({Math.floor(((compare_at_price-price)/compare_at_price)*100)} % Off)</h5>}
                </div>
            </div>
        </div>

        <div class="container-fluid mx-2">
            <div class="row">
                <div class="col">
                <h6 className={styles.headingMain}>AVAILABLE OFFERS</h6>
                </div>
            </div>
            <div>
    <Truncate lines={!expand && 3} 
            ellipsis={<span className={styles.readmore} onClick={handleToggle}><strong>+ more </strong></span>}
            onTruncate={handletruncate}
            >
                {offerText.map((ele)=>{
        return(
            <>
                {ele.productOfferText}
                <br/>
            </>
        )
    })} 
            </Truncate> 
            {!truncate && expand && (<span className={styles.readmore} onClick={handleToggle}><strong> - less</strong></span>)}

</div>
        </div>
        {/* <div class="container-fluid mx-1 mt-4 mb-4">
            <span class="px-1">
                Delivery Details
            </span>
            <span class="px-1">
                <input type="text" placeholder="Enter Pincode"/>
                </span>
                <span class="px-1">
                    CHECK
                </span>
        </div> */}

        <div className="container-fluid  px-2 mt-4 mb-4" style={{
            "fontSize":"12px",
            }}>
                <div style={{ border:"1px solid black"}} className="py-3 px-1">
            <span class="">
                <img src="/Cruelty_Free.png" width="23" alt="Cruelty Free img"/>
            </span>
            <span>
                <span class="mx-1 "  style={{"fontWeight":"bold"}}>Cruelty Free</span>
            </span>
            <span class="px-1">
                <img src="/Quality_First.png" width="23" alt="Quality First img"/>
            </span>
            <span class="mx-1" style={{"fontWeight":"bold"}}>
                <span>Quality First</span>
            </span>
            <span class="px-1">
                <img class src="/Easy_Returns.png" width="23" alt="Easy Returns img"/>
            </span>
            <span>
                <span style={{"fontWeight":"bold"}}>Easy Return policy</span>
            </span>
            </div>
        </div>
        <div class="container-fluid mx-2">
            <div class="row">
                <div class="col">
                <h6 className={styles.headingMain}>PRODUCT DESCRIPTION</h6>
                </div>
            </div>
            <Truncate lines={!expand && 5} 
            ellipsis={<span className={styles.readmore} onClick={handleToggle}><strong>...Read more</strong></span>}
            onTruncate={handletruncate}
            >
                <div dangerouslySetInnerHTML={{__html:[productData.resbody.body_html]}}></div>
            </Truncate> 
            {!truncate && expand && (<span className={styles.readmore} onClick={handleToggle}><strong>Show less</strong></span>)}
            </div>
        </div>
        {productData.resbody.youtube_id &&  
        <div class="container mt-3">
                <div class="">
                <iframe class="bye" width="100%" height="250px" src={`https://www.youtube.com/embed/${productData.resbody.youtube_id}`}frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>
        </div>}
        </>
        
    )
}

export async function getStaticProps(){

    var axios = require('axios');
    
    var config = {
      method: 'get',
      url: 'https://qa.api.sugarcosmetics.com/products/qa/getProductsv2?handle=smudge-me-not-liquid-lipstick-minis-set',
      headers: { }
    };
    
    let data = await axios(config)
    .then(function (response) {
    return response.data
    })
    .catch(function (error) {
      console.log(error);
    });

    return {
        props: {
            data
        }
    }
}
