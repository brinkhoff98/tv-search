import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Container from "react-bootstrap/Container";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Row, Col, Button, Alert, Spinner } from 'react-bootstrap';
import { ShowDetails as ShowDetailsType } from "../lib/models/tvShow";

const ShowDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [showDetails, setShowDetails] = useState<ShowDetailsType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      setLoading(true);
      setError("");

      axios.get(`https://api.tvmaze.com/shows/${id}`)
        .then(response => {
          setShowDetails(response.data);
          setLoading(false);
        })
        .catch(error => {
          setError("An error occurred. Please try again later.");
          console.error(error);
          setLoading(false);
        });
    }
  }, [id]);

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <Container className="p-3">
      <Button variant="secondary" className="mb-3" onClick={handleBackToHome}>Back to Home</Button>
      {loading && <Spinner animation="border" variant="primary" className="mt-3" />}
      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
      {showDetails && (
        <Card className="shadow-sm border-primary mt-3">
          <Row className="g-0">
            <Col md={4}>
              <Card.Img src={showDetails.image?.original} alt={showDetails.name} className="img-fluid" />
            </Col>
            <Col md={8}>
              <Card.Body>
                <Card.Title>{showDetails.name}</Card.Title>
                <Card.Text><strong>Genres:</strong> {showDetails.genres.join(', ')}</Card.Text>
                <Card.Text><strong>Language:</strong> {showDetails.language}</Card.Text>
                <Card.Text><strong>Network:</strong> {showDetails.network?.name}</Card.Text>
                <Card.Text><strong>Runtime:</strong> {showDetails.runtime}</Card.Text>
                <Card.Text><strong>Status:</strong> {showDetails.status}</Card.Text>
                <Card.Text><strong>Premiered:</strong> {showDetails.premiered}</Card.Text>
                <Card.Text><strong>Rating:</strong> {showDetails.rating.average ? showDetails.rating.average : 'No rating available.'}</Card.Text>
                <Card.Text><strong>Summary:</strong> {showDetails.summary ? showDetails.summary: 'No summary available.'}</Card.Text>
                {showDetails.officialSite ? (
                  <Button variant="primary" href={showDetails.officialSite} target="_
                  blank" rel="noopener noreferrer">Official Site</Button>
                ) : (
                  <Card.Text className="text-muted">No official site available.</Card.Text>
                )}
              </Card.Body>
            </Col>
          </Row>
        </Card>
      )}
    </Container>
  );
};

export default ShowDetails;
