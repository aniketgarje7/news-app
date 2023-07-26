"use client";
import React from "react";
import { GetNewsContext } from "@/context/NewsContext";
import NavBar from "@/components/Navbar";
import { useParams } from "next/navigation";
import NewsCard from "@/components/DetailNewsCard";

const Article = () => {
  const newsContext = GetNewsContext();
  const router = useParams();
  const singleArticle = newsContext.articles && newsContext.articles.filter((_, i) => Number(router.article) === i + 1);
  return (
    <div>
      <div>
        <NavBar />
      </div>

      <div className="container">
        <div className="detailnewscard">{singleArticle && <NewsCard news={singleArticle[0]} />}</div>
      </div>
    </div>
  );
};

export default Article;
