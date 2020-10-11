import React, { useEffect, useState } from "react";
import { getNews } from "./events";

import { Header, Image, List, Segment, Divider } from "semantic-ui-react";

function News() {
  const [state, setState] = useState({
    news: [],
  });

  useEffect(() => {
    getNews().then((response) => {
      setState((prev) => ({
        ...prev,
        news: response.articles,
      }));
    });
  }, []);

  const articles = state.news.map((article) => (
    <Segment color="blue" style={{ boxShadow: "5px 5px black" }}>
      <List.Item as="a" href={article.url}>
        <Image src={article.urlToImage} size="small" floated="left" />
        <Header textAlign="center">{article.title}</Header>
        <Header textAlign="center" as="h5">
          {article.author}
        </Header>
        <p>
          {article.publishedAt.slice(0, 10)} {article.source.name}
        </p>
        {article.description}

        <Divider></Divider>
      </List.Item>
    </Segment>
  ));

  return (
    <div className="App">
      <Header textAlign="center" as="h1">
        Health News
      </Header>

      <List>{articles}</List>
    </div>
  );
}

export default News;
