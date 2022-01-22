import React, { Component } from 'react';
import NewsItem from './NewsItem';

export class News extends Component {
    

    constructor(){
        super();
        console.log("This is a Constructor from News Component");  //Runs Firts
        this.state = {
            articles: [],
            loading : false
        }
    }

    async componentDidMount(){  //Executes after Render
        console.log("Component Did Mount"); //Runs 3rd
        let url = `https://newsapi.org/v2/top-headlines?country=in&apikey=8de92e1fb9b4472992bb1ae2c00cc11b`;
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({articles:parsedData.articles})
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

        </div>
        )
    }
}

export default News;
