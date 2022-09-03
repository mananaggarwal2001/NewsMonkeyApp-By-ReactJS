import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {
    const [articles, setarticles] = useState([]);
    const [loading, setloading] = useState(true);
    const [totalResults, setTotalResults] = useState(0);
    const [page, setPage] = useState(0);
    const captalizefirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);

    }

    const updateNews = async () => {
        props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&pageSize=${props.pageSize}`;
        let data = await fetch(url);
        console.log(data);
        props.setProgress(30);
        let parseddata = await data.json();
        console.log(parseddata);
        props.setProgress(70);
        console.log(parseddata.articles);
        setarticles(parseddata.articles);
        setloading(false);
        setTotalResults(parseddata.totalResults);
        setPage(1);
        props.setProgress(100);
    }
    useEffect(() => {

        return () => {
            document.title = `News-Monkey - ${captalizefirstLetter(props.category)}`;
            updateNews();
        }
    }, [])





    // const handleNextClick = async () => {

    //     if (page + 1 > Math.ceil(totalresults / 9)) {
    //         return true;
    //     } else {

    //         let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page + 1}&pageSize=9`;
    //         let data = await fetch(url);
    //         setState({ loading: true });
    //         let parseddata = await data.json();
    //         setState({
    //             articles: parseddata.articles,
    //             page: page + 1,
    //             totalresults: parseddata.totalResults,
    //             disabled: false,
    //             loading: false
    //         });
    //         setState({ loading: false });
    //         return false;
    //     }
    // }
    // const handlePreviousClick = async () => {
    //     console.log("handling the next click");
    //     let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page - 1}&pageSize=9`;
    //     setState({ loading: true });
    //     let data = await fetch(url);
    //     let parseddata = await data.json();
    //     setState({
    //         articles: parseddata.articles,
    //         page: page - 1,
    //         totalresults: parseddata.totalResults,
    //         loading: false
    //     });
    // }


    const fetchMoreData = async () => {
        setPage(
            page + 1
        );
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&pageSize=9&page=${page+1}&pageSize=${props.pageSize}`;
        setloading(true)
        let data = await fetch(url);
        let parseddata = await data.json();
        setarticles(articles.concat(parseddata.articles));
        setTotalResults(parseddata.totalResults);
        setloading(false);
    };

    return (
        <>
            <h2 className='mx-auto mb-5  text-center' style={{ display: "block", fontWeight: '700',marginTop:'70px' }}>News Monkey Top HeadLines- {captalizefirstLetter(props.category)} Category </h2>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
            >
                <div className="container">
                    <div className="row">
                        {articles.map((element) => {
                            return <div className="col-md-4">
                                <NewsItem title={element.title ? element.title.slice(0, 44) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageurl={element.urlToImage == null ? "https://cdn.dnaindia.com/sites/default/files/styles/half/public/2022/08/30/2534563-proper-diet.png" : element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>

                        })}

                        {/* <div className="container d-flex justify-content-between">
                        <button disabled={page <= 1} className='btn btn-dark' onClick={handlePreviousClick}> &larr; Previous</button>
                        <button disabled={page >= Math.ceil(totalresults / 9) ? true : false} className='btn btn-dark' onClick={handleNextClick}>Next &rarr;</button>
                    </div> */}
                    </div>
                </div>
            </InfiniteScroll>
        </>
    )

}

News.defaultProps = {
    country: 'us',
    pageSize: '8',
    category: 'general'

}

News.propTypes = {
    country: PropTypes.string,
    category: PropTypes.string
}

export default News