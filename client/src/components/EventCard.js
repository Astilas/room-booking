import React from 'react';
import { Row, Container } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

export default function EventCard(props) {
    return (
        <Row className="div-event">
          <Card bg="info" text="white" style={{ width: '30rem', height:'30rem' }}>
            <Card.Header>
              <h2>{props.title}</h2>
            </Card.Header>
            {/* <Card.Header>
              <h5>Description: {props.description}</h5>
            </Card.Header> */}
            <Card.Body className="card-body-css">
              <Card.Title>Le {props.date} à {props.begin_hour}</Card.Title>
              <Card.Text className="">
                {props.description}
              </Card.Text>
              <Card.Text className="">
                {props.end_hour}
              </Card.Text>
            </Card.Body>
            <Card.Footer>
            </Card.Footer>
          </Card>
        </Row>
      );
  }
  