import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';


export class News extends Component {
    static defaultProps = {
      country : 'in',
      pageSize : 8,
      category : 'general'
    }

    static propTypes = {
      country : PropTypes.string,
      category : PropTypes.string
    }

    constructor(){
        super();
        console.log("This is a Constructor from News Component");  //Runs Firts
        this.state = {
            articles: [],
            loading : false,
            page : 1
        }
    }

    async updateNews(){
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=8de92e1fb9b4472992bb1ae2c00cc11b&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      this.setState({loading:true});
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
          articles:parsedData.articles,
          totalArticles : parsedData.totalResults,
          loading : false
        })
    }
    
    async componentDidMount(){  //Executes after Render
       this.updateNews();
    }

    
     handlePrevClick = async()=>{
      console.log("Previous");
      this.setState({page : this.state.page-1});
      this.updateNews();
      
    }

     handleNextClick = async()=>{
      console.log("Next");

      this.setState({page : this.state.page+1});
      this.updateNews();
    }

    
    render() {  
      console.log("Render");//Runs 2nd
        return (
        <div className='container my-3'>
          <h1 className="text-center" style={{margin:"25px"}}>NEWS_MONKEY - TOP HEADLINES</h1>
            {this.state.loading && <Spinner/>}
            <div className="row">
            {! this.state.loading && this.state.articles.map((element)=>{
                return <div className="col-md-4"  key={element.url}>
                     <NewsItem title={ element.title ? element.title.slice(0,45):""} description={ element.description ? element.description.slice(0,88) : ""} imageUrl={element.urlToImage} newsUrl = {element.url} author = {element.author} date = {element.publishedAt} source={element.source.name}/>

                     {/* .slice() is used to limit number of characters here starting from 0 to 88 characters */}
                     </div>

            })}
          </div>
          <div className="container d-flex justify-content-between">
          <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; PREV</button>
          <button disabled={this.state.page+1 > Math.ceil(this.state.totalArticles/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>NEXT &rarr;</button>
          </div>

        </div>
        )
    }
  }

export default News;
