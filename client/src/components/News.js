import PropTypes from "prop-types";
import React, { Component, useEffect, useState } from "react";
import useApplicationData from '../hooks/useApplicationData';
import { getNews } from "./events";


import {
  Button,
  Container,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Segment,
  Sidebar,
  Visibility,
  Divider,
} from "semantic-ui-react";







function PatientsList() {
  const [state, setState] = useState({
    news: []
  });
  
  useEffect(() => {
    
    getNews().then((response) => {
      setState((prev) => ({
        ...prev,
        news: response.articles
      }))  

     
     
    });
  }, []);
  

  
   const newsData = state.news
console.log(newsData)

const articles = state.news.map(article => (
  // console.log(article)
<List.Item as='a' href={article.url}>
    <Image src={article.urlToImage} size='small' floated='left' />
<Header textAlign='center'>{article.title}</Header>
<Header textAlign='center' as='h5'>{article.author}</Header>
<p>{article.publishedAt.slice(0,10)}   {article.source.name}</p> 
    {article.description}
    
    <Divider></Divider>
  </List.Item>


  ));

  return (
    <div className='App'>
      <Header textAlign='center' as='h1'>Health News</Header>

      {/* {state.loading && <h3>Loading...</h3>} */}

      <List>{articles}</List>
    </div>
  );
}

export default PatientsList;
