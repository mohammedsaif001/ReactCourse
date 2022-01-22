import React, { Component } from 'react';


export class NewsItem extends Component {
    render() {
        let {title,description,imageUrl,newsUrl,author,date,source} = this.props;
        return <div className='my-3'>
            <div className="card" >
            <span class="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:'90%',zIndex:'1'}}>{source}</span>
                <img src={imageUrl?imageUrl:`https://bitsofco.de/content/images/2018/12/broken-1.png`} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}...</h5>
                    <p className="card-text">{description}.....</p>
                    <p className="card-text"><small className="text-muted">By {author?author:"UNKNOWN"} on {new Date(date).toGMTString()}</small></p>
                    <a rel="noreferrer" href="/newsDetail" className="btn btn-dark btn-sm" href={newsUrl} target="_blank">Read More</a>
                </div>
            </div>
        </div>;
    }
}

export default NewsItem;
