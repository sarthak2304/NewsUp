import React from 'react'

const NewsItem= (props)=> {
        let { title, description, imageurl, newsURL, author, date, src } = props;
        return (
            <div>
                <div className="card mb-4 " style={{}}>
                    <img src={imageurl} className="card-img-top" alt="..." />
                    <div className="card-body" >
                        <h5 className="card-title">{title}... <span class="position-absolute top-0  translate-middle badge rounded-pill bg-success" style={{left:'50%', zIndex:'1'}} > {src} </span>  
                        <span class="badge rounded-pill bg-secondary">{/*src*/}</span></h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text"><small className="text-muted">By {!author ? "unkwonn" : author} on {new Date(date).toGMTString()}</small></p>
                        <a href={newsURL} target="_blank" className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
    }

export default NewsItem
