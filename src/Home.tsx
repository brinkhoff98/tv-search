import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { TvShow } from "../lib/models/tvShow";
import 'bootstrap/dist/css/bootstrap.min.css';
import { InputGroup, FormControl, Button, Card, Row, Col, Alert, Spinner } from 'react-bootstrap';

const Home: React.FC = () => {
  const [tvShows, setTvShows] = useState<TvShow[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      setSearchInput(location.state.searchTerm);
      setTvShows(location.state.tvShows);
    }
  }, [location.state]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleSearch = async () => {
    if (searchInput.length > 0) {
      setLoading(true);
      setError("");

      try {
        const response = await axios.get(
          "https://api.tvmaze.com/search/shows?q=" + searchInput
        );
        setTvShows(response.data);
      } catch (err) {
        setError("An error occurred. Please try again later.");
        console.error(err);
      }

      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleShowDetails = (id: number) => {
    navigate(`/show/${id}`, { state: { searchTerm: searchInput, tvShows } });
  };

  return (
    <Container className="p-3">
      <div className="text-center mb-5">
        <h1 className="mb-4">Search TV Show Information</h1>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Type here to search"
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            value={searchInput}
          />
          <Button variant="primary" onClick={handleSearch}>Search</Button>
        </InputGroup>
        {loading && <Spinner animation="border" variant="primary" />}
        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
      </div>
      <Row xs={1} md={2} lg={5} className="g-4">
        {tvShows.map((dataObj, index) => (
          <Col key={index}>
            <Card className="h-100 shadow-sm border-primary tv-show-card">
              <Card.Img variant="top" src={dataObj.show.image?.medium} alt={dataObj.show.name} />
              <Card.Body>
                <Card.Title>{dataObj.show.name}</Card.Title>
                <Card.Text><strong>Genres:</strong> {dataObj.show.genres.join(', ')}</Card.Text>
                <Card.Text><strong>Language:</strong> {dataObj.show.language}</Card.Text>
                <Card.Text><strong>Status:</strong> {dataObj.show.status}</Card.Text>
                <Card.Text><strong>Premiered:</strong> {dataObj.show.premiered}</Card.Text>
                <Card.Text><strong>Rating:</strong> {dataObj.show.rating.average ? dataObj.show.rating.average : 'No rating available.'}</Card.Text>
                <Card.Text><strong>Summary:</strong> {dataObj.show.summary ? dataObj.show.summary : 'No summary available.'}</Card.Text>
                {dataObj.show.officialSite ? (
                  <Button variant="primary" className="m-2" href={dataObj.show.officialSite} target="_blank" rel="noopener noreferrer">Official Site</Button>
                ) : (
                  <Card.Text className="text-muted">No official site available.</Card.Text>
                )}
                <Button variant="secondary" className="m-2" onClick={() => handleShowDetails(dataObj.show.id)}>More Details</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;
