import { toHaveAccessibleDescription } from '@testing-library/jest-dom/dist/matchers';
import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'

export class News extends Component {
    static defaultProps = {
        country: 'us',
        pageSize: '8',
        category: 'general'

    }

    static propTypes = {
        country: PropTypes.string,
        category: PropTypes.string
    }

    articles = []
    captalizefirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);

    }
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            page: 1,
            loading: false
        }
        document.title = `News-Monkey - ${this.captalizefirstLetter(this.props.category)}`
    }
    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fd5b69691fc948e9864e8c62c2751b06&pageSize=9`;
        let data = await fetch(url);
        this.setState({ loading: true });
        let parseddata = await data.json();
        console.log(parseddata);
        this.setState({ articles: parseddata.articles, loading: false });

    }

    handleNextClick = async () => {

        if (this.state.page + 1 > Math.ceil(this.state.totalresults / 9)) {
            return true;
        } else {

            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fd5b69691fc948e9864e8c62c2751b06&page=${this.state.page + 1}&pageSize=9`;
            let data = await fetch(url);
            this.setState({ loading: true });
            let parseddata = await data.json();
            this.setState({
                articles: parseddata.articles,
                page: this.state.page + 1,
                totalresults: parseddata.totalResults,
                disabled: false,
                loading: false
            });
            this.setState({ loading: false });
            return false;
        }
    }
    handlePreviousClick = async () => {
        console.log("handling the next click");
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fd5b69691fc948e9864e8c62c2751b06&page=${this.state.page - 1}&pageSize=9`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parseddata = await data.json();
        this.setState({
            articles: parseddata.articles,
            page: this.state.page - 1,
            totalresults: parseddata.totalResults,
            loading: false
        });
    }
    render() {
        return (
            <div className='container container-lg'>
                <h2 className='mx-auto mb-5 mt-4 text-center' style={{ display: "block", fontWeight: '700' }}>News Monkey Top HeadLines- {this.captalizefirstLetter(this.props.category)} Category </h2>
                <div className="row">
                    {!this.state.loading && this.state.articles.map((element) => {
                        return <div className="col-md-4">
                            <NewsItem title={element.title ? element.title.slice(0, 44) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageurl={element.urlToImage == null ? "https://cdn.dnaindia.com/sites/default/files/styles/half/public/2022/08/30/2534563-proper-diet.png" : element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                        </div>

                    })}

                    <div className="container d-flex justify-content-between">
                        <button disabled={this.state.page <= 1} className='btn btn-dark' onClick={this.handlePreviousClick}> &larr; Previous</button>
                        {this.state.loading && <Spinner />}
                        <button disabled={this.state.page >= Math.ceil(this.state.totalresults / 9) ? true : false} className='btn btn-dark' onClick={this.handleNextClick}>Next &rarr;</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default News