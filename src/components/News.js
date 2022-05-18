import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';


const News = (props) => {

    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true) //maybe its true
    const [page, setpage] = useState(1)
    const [totalResults, settotalResults] = useState(0)
    
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    const updateNews = async () => {
        props.setProgress(10);
        console.log("CDM");
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true);
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json();
        console.log(parsedData);
        props.setProgress(70);
        setArticles(parsedData.articles);
        settotalResults(parsedData.totalResults);
        setLoading(false);
        props.setProgress(100);
    }
    
    useEffect(() => {
        document.title = `NewsUp- ${capitalizeFirstLetter(props.category)}`;
        updateNews();
    }, [])

    // const handlePrevClick = async () => {
    //     console.log("Previous");

    //     // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=0602bdece69b4568a321345cafd3cf72&page=${page - 1}&pageSize=${props.pageSize}`;
    //     // setState({loading:true});
    //     // let data = await fetch(url);
    //     // let parsedData = await data.json();
    //     // console.log(parsedData);

    //     // setState({
    //     //     page: page - 1,
    //     //     articles: parsedData.articles,
    //     //     loading: false
    //     // })

    //     setpage(page - 1);
    //     updateNews();
    // }

    // const handleNextClick = async () => {
    //     console.log("Next");
    //     // if (page + 1 > Math.ceil(totalResults/props.pageSize)) {
    //     // }
    //     // else{
    //     //     let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=0602bdece69b4568a321345cafd3cf72&page=${page + 1}&pageSize=${props.pageSize}`;
    //     //     setState({loading: true});
    //     //     let data = await fetch(url);
    //     //     let parsedData = await data.json();
    //     //     console.log(parsedData);

    //     //     setState({
    //     //         page: page + 1,
    //     //         articles: parsedData.articles,
    //     //         loading: false
    //     //     })
    //     // }


    //     setpage(page + 1);
    //     updateNews();

    

    const fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=0602bdece69b4568a321345cafd3cf72&page=${page+1}&pageSize=${props.pageSize}`;
        setpage(page + 1)
        // setLoading(true);
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        setArticles(articles.concat(parsedData.articles));
        settotalResults(parsedData.totalResults);
        // setLoading(false);
    };

    return (
        <div className="Conatiner my-3">

            <h2 className='Heading text-center' style={{marginTop:'70px'}}>Today's Top Headlines in {capitalizeFirstLetter(props.category)}</h2>
            {/* {loading && <Spinner/>} */}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}>

                <div className="row my-3 mx-3 mb-3 ">
                    {articles.map((element) => {
                        return <div className="col-md-3 ">
                            <NewsItem key={element.url} title={element.title ? element.title.slice(0, 80) : ""} description={element.description ? element.description?.slice(0, 150) : ""} imageurl={element.urlToImage} newsURL={element.url} author={element.author}
                                date={element.publishedAt} src={element.source.name} />
                        </div>
                    })}
                </div>

            </InfiniteScroll>
            {/* <div className="container d-flex justify-content-between">
                    <button disabled={page <= 1} type="button" className="btn btn-primary" onClick={handlePrevClick}> &larr; Previous </button>
                    <button sisabled={page + 1 > Math.ceil(totalResults / props.pageSize)} type="button" className="btn btn-primary" onClick={handleNextClick}>Next &rarr;</button>
                </div> */}
        </div>
    )
}

News.defaultProps = {
    country: 'in',
    category: 'general',
    pageSize: 8
}

News.propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
    pageSize: PropTypes.number
}

export default News
