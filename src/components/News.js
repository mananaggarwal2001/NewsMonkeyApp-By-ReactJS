import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
    render() {

        return (
            <div className='container'>
                <h2 className='mx-auto mb-5' style={{display:"block",width:"14em"}}>News Monkey- Top Headlines</h2>
                <div className="row">
                    <div className="col-md-4">
                        <NewsItem title="This is the great news" description="The news is being made from the great news and the made from the news app." imageurl="https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg"/>
                    </div>
                    <div className="col-md-4">
                        <NewsItem title="This is the great news" description="The news is being made from the great news and the made from the news app."  imageurl="https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg"/>
                    </div>
                    <div className="col-md-4">
                        <NewsItem title="This is the great news" description="The news is being made from the great news and the made from the news app." />
                    </div>
                </div>
            </div>
        )
    }
}

export default News