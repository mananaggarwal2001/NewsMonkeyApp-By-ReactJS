import React from 'react'

const NewsItem = (props) => {


    let { title, description, imageurl, newsUrl, author, date, source } = props;
    return (

        <div className="card my-5" >
            <img src={imageurl} className="card-img-top" alt="..." />
            <span class="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{ zIndex: '1', left: "50%", fontFamily: 'sans-serif', fontWeight: '900' }}>
                {source}</span>
            <div className="card-body">
                <h5 className="card-title">{title}...</h5>
                <p className="card-text">{description}...</p>
                <p class="card-text mt-4"><small class="text-muted">By {author ? author : "unknown"} on {new Date(date).toUTCString()}</small></p>
                <a href={newsUrl} target="_blank" rel='noopener noreferrer' className="btn btn-sm btn-dark">Read More</a>
            </div>
        </div>

    )
}


export default NewsItem