import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { LuLogIn } from "react-icons/lu";
import countryArray from "./contry";
import { useEffect, useState } from "react";
import { GetNewsContext } from "@/context/NewsContext";
import { UserAuth } from "@/context/AuthContext";
import { collection, getDocs, where, query } from "firebase/firestore";
import { db } from "../firebase";

function NavBar() {
  const category = ["business", "entertainment", "general", "health", "science", "sports", "technology"];

  const news = ["top-headlines", "everything", "favourite"];

  const newsContext = GetNewsContext();
  const handleNews = async (e) => {
    if (e === "favourite") {
      return;
    }
    await newsContext.setNews(e);
  };

  const handleCountry = async (e) => {
    await newsContext.setQuery("");
    await newsContext.setCountry(e);
  };

  const handleCategory = async (e) => {
    await newsContext.setQuery("");
    await newsContext.setCategory(e);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    await newsContext.setQuery(e.target[0].value);
  };

  useEffect(() => {
    newsContext.fetchdata();
  }, [newsContext.country, newsContext.category, newsContext.news, newsContext.query]);

  const { user, googleSignIn, logOut } = UserAuth();
  const [loading, setLoading] = useState(true);
  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLoading(false);
    };
    checkAuthentication();
  }, [user]);

  useEffect(() => {
    if (newsContext.category === "favourite") {
      // fetchArticle();
    }
  }, [newsContext.category]);

  const fetchArticle = async () => {
    try {
      const q = query(collection(db, "users"), where("owner", "==", uid));

      const querySnapshot = await getDocs(q);
      let data = [];
      querySnapshot.forEach((article) => {
        data.push({ ...article.data(), id: article.id });
      });

      newsContext.setArticles(data);
    } catch (error) {
      console.error("An error occured", error);
    }
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">News App</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" navbarScroll>
            <NavDropdown title="News" id="navbarScrollingDropdown" className="navDropdown" onSelect={handleNews}>
              {news.map((value, i) => (
                <NavDropdown.Item href="#action3" eventKey={value} key={i}>
                  {value.charAt(0).toUpperCase() + value.slice(1)}
                </NavDropdown.Item>
              ))}
            </NavDropdown>

            <NavDropdown title="Category" id="navbarScrollingDropdown" className="navDropdown" onSelect={handleCategory}>
              {category.map((value, i) => (
                <NavDropdown.Item href="#action3" key={i} eventKey={value}>
                  {value.charAt(0).toUpperCase() + value.slice(1)}
                </NavDropdown.Item>
              ))}
            </NavDropdown>

            <NavDropdown title="Country" id="navbarScrollingDropdown" className="navDropdown" onSelect={handleCountry}>
              {countryArray.map((value, i) => (
                <NavDropdown.Item href="#action3" key={i} eventKey={value.countryCode}>
                  {value.countryName.charAt(0).toUpperCase() + value.countryName.slice(1)}
                </NavDropdown.Item>
              ))}
            </NavDropdown>

            <Form className="d-flex" onSubmit={(e) => handleSearch(e)}>
              <Form.Control type="search" placeholder="Search" className="me-2" aria-label="Search" />
              <Button variant="outline-success" type="submit">
                Search
              </Button>
            </Form>
          </Nav>

          <Nav>
            {" "}
            {loading ? null : !user ? (
              <Nav.Link onClick={handleSignIn} className="p-2 cursor-pointer">
                <LuLogIn />
                Login
              </Nav.Link>
            ) : (
              <div>
                <div>Welcome, {user.displayName}</div>
                <div className="cursor-pointer" onClick={handleSignOut}>
                  Sign out
                </div>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
