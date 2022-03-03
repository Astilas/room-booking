import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

export default function RoomCard({ name, availability }) {
    return (
        <Row className="center-div">
          <Card bg="info" text="white" style={{ width: '30rem', height: '30rem' }}>
            <Card.Header>
              <h2>{name}</h2>
            </Card.Header>
            <Card.Body className="card-body-css">
              <Card.Title>Room availability hours</Card.Title>
              <Row className="center-content">
                {availability.map((item) => {
                    return (
                      <Col lg={3} md={3} sm={2} xs={4} className="hour-border">
                        {item}
                      </Col>
                    )
                })}
              </Row>
            </Card.Body>
          </Card>
        </Row>
      );
  }
  