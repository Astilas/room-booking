import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

export default function RoomCard({ name, availability }) {
    return (
        <Row className="center-div">
          <Card bg="info" text="white" style={{ width: '30rem', height:'30rem', margin:'5px'}}>
            <Card.Header>
              <h2>{name}</h2>
            </Card.Header>
            <Card.Body className="card-body-css">
              <Card.Title>Room availability</Card.Title>
              {/* <Card.Text className=""> */}
              <Row>
                {availability.map((item) => {
                    return (
                      <Col lg={3} md={3} sm={2} xs={4} className="hour-border">
                        {item}
                      </Col>
                    )
                })}
              </Row>
              {/* </Card.Text> */}
            </Card.Body>
            <Card.Footer>

            </Card.Footer>
          </Card>
        </Row>
      );
  }
  