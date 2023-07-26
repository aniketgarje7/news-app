'use client'
import Card from 'react-bootstrap/Card';
import Link from 'next/link';

function NewsCard({news,id}) {

  return (
    <Card >
      <Card.Img variant="top" src={news.urlToImage} width={500} height={400} alt={`image from ${news.source.name}`}/>
      <Card.Body>
        <Card.Title>{news.title}</Card.Title>
        <Card.Text>
          {news.description}
        </Card.Text>
        <Link variant="primary" href={`/${id+1}`} >Read More</Link>
      </Card.Body>
    </Card>
  );
}

export default NewsCard;