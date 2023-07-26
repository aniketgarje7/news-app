"use client";
import Card from "react-bootstrap/Card";
import Link from "next/link";
import ListGroup from "react-bootstrap/ListGroup";
import { BsFillHeartFill } from "react-icons/bs";
import { useState } from "react";
import { UserAuth } from "@/context/AuthContext";
import { collection, addDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

function NewsCard({ news }) {
  const [liked, setLiked] = useState(false);
  const { user } = UserAuth();
  const handleLike = () => {
    if (liked) {
      deleteArticle();
    } else {
      addArticle();
    }
  };

  const addArticle = async () => {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        owner: user.uid,
        content: JSON.stringify(news),
      });
    } catch (error) {
      console.error("An error occured", error);
    }
  };

  const deleteArticle = async (docId) => {
    try {
      await deleteDoc(doc(db, "users", docId));
    } catch (error) {
      console.error("An error occured", error);
    }
  };
  return (
    <Card>
      <BsFillHeartFill className="article-heart" onClick={handleLike} />
      <Card.Img variant="top" src={news.urlToImage} width={500} height={400} alt={`image from ${news.source.name}`} />
      <Card.Body>
        <Card.Title>{news.title}</Card.Title>
        <Card.Text>{news.content}</Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Author : {news.author}</ListGroup.Item>
        <ListGroup.Item>PublishedAt: {news.publishedAt}</ListGroup.Item>
        <ListGroup.Item>Source : {news.source.name}</ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <Link href={news.url} className="btn btn-info">
          Source
        </Link>
      </Card.Body>
    </Card>
  );
}

export default NewsCard;
