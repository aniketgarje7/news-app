"use client";

import React, { useState } from "react";
import { createContext, useContext } from "react";

const Context = createContext();
const apiKey = "096eee51d34f4f339aa1c112d711f1dc";
const NewsContext = ({ children }) => {
  const initialNewsFields = {
    articles: null,
    news: "top-headlines",
    category: null,
    country: "in",
    singleArticle: null,
  };

  const [articles, setArticles] = useState(initialNewsFields.articles);
  const [singleArticle, setSingleArticle] = useState(initialNewsFields.singleArticle);
  const [news, setNews] = useState(initialNewsFields.news);
  const [category, setCategory] = useState(initialNewsFields.category);
  const [country, setCountry] = useState(initialNewsFields.country);
  const [query, setQuery] = useState("");

  const [error, setError] = useState(null);

  const fetchdata = async () => {
    setError(null);
    let url = `https://newsapi.org/v2/${news}?`;
    country !== null ? (url += `country=${country}&`) : url;
    category !== null ? (url += `category=${category}&`) : url;
    query !== "" ? (url = `https://newsapi.org/v2/${news}?q=${query}&`) : url;
    const res = await fetch(`${url}apiKey=${apiKey}`);
    const data = res.json();
    data
      .then((data) => {
        if (data.status === "ok") {
          setArticles(data.articles);
        } else {
          setArticles([]);
          setError(data);
        }
      })
      .catch((e) => {
        setError(e);
      });
  };
  const NewsData = {
    articles: articles,
    news: news,
    category: category,
    country: country,
    query: query,
    singleArticle: singleArticle,
    setArticles: setArticles,
    setCategory: setCategory,
    setCountry: setCountry,
    setNews: setNews,
    setSingleArticle: setSingleArticle,
    error: error,
    fetchdata: fetchdata,
    setQuery: setQuery,
  };
  return <Context.Provider value={NewsData}>{children}</Context.Provider>;
};

export const GetNewsContext = () => {
  return useContext(Context);
};
export default NewsContext;
