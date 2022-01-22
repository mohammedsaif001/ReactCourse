import React, { Component } from 'react';
import NewsItem from './NewsItem';

export class News extends Component {
    

    constructor(){
        super();
        console.log("This is a Constructor from News Component");  //Runs Firts
        this.state = {
            articles: [],
            loading : false,
            page : 1
        }
    }

    async componentDidMount(){  //Executes after Render
        console.log("Component Did Mount"); //Runs 3rd
        let url = `https://newsapi.org/v2/top-headlines?country=in&apikey=8de92e1fb9b4472992bb1ae2c00cc11b&page=1&pageSize=20`;
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
          articles:parsedData.articles,
          totalArticles : parsedData.totalResults
        })
    }
    
     handlePrevClick = async()=>{
      console.log("Previous");
      let url = `https://newsapi.org/v2/top-headlines?country=in&apikey=8de92e1fb9b4472992bb1ae2c00cc11b&page=${this.state.page-1}&pageSize=20`;
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        
      this.setState({
        page : this.state.page-1,
        articles:parsedData.articles
      })
    }

     handleNextClick = async()=>{
      console.log("Next");

      if( this.state.page+1 > Math.ceil(this.state.totalArticles/20)){

      }
      else{
        let url = `https://newsapi.org/v2/top-headlines?country=in&apikey=8de92e1fb9b4472992bb1ae2c00cc11b&page=${this.state.page+1}&pageSize=20`;
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        
      this.setState({
        page : this.state.page+1,
        articles : parsedData.articles
      })
      }
      
    }

    
    render() {  
      console.log("Render");//Runs 2nd
        return (
        <div className='container my-3'>
            <h2>NEWS_MONKEY - TOP HEADLINES</h2>
            <div className="row">
            {this.state.articles.map((element)=>{
                return <div className="col-md-4"  key={element.url}>
                     <NewsItem title={ element.title ? element.title.slice(0,45):""} description={ element.description ? element.description.slice(0,88) : ""} imageUrl={element.urlToImage} newsUrl = {element.url}/>

                     {/* .slice() is used to limit number of characters here starting from 0 to 88 characters */}
                     </div>

            })}
          </div>
          <div className="container d-flex justify-content-between">
          <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; PREV</button>
          <button type="button" className="btn btn-dark" onClick={this.handleNextClick}>NEXT &rarr;</button>
          </div>

        </div>
        )
    }
  }

export default News;
