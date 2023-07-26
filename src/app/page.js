"use client";

import React from "react";
import { useEffect, useState } from "react";
import NavBar from "../components/Navbar";
import NewsCard from "../components/NewsCard";
import { GetNewsContext } from "@/context/NewsContext";
import Loader from "@/components/Loader";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { BsFillGridFill } from "react-icons/bs";

const Home = () => {

  const newsData = GetNewsContext();
  const [grid, setGrid] = useState(false);
  useEffect(() => {
    newsData.fetchdata();
  }, []);

  return (
    <div>
      <div>
        <NavBar />
      </div>
      {!newsData.error && <div className="container toggle-grid">{grid ? <AiOutlineUnorderedList onClick={() => setGrid(!grid)} /> : <BsFillGridFill onClick={() => setGrid(!grid)} />}</div>}
      <div className="container">
        {newsData.articles ? (
          <div className="row">
            {newsData.articles &&
              newsData.articles.map((news, key) => (
                <div className={grid ? "col-lg-4 g-5" : "col-lg-6 g-5"} key={key}>
                  <NewsCard news={news} id={key} />
                </div>
              ))}
          </div>
        ) : (
          <Loader />
        )}
        <div className="error_message">{newsData.error && newsData.error.message}</div>
      </div>
    </div>
  );
};

export default Home;
