import React from 'react';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function SimpleCard(props) {
    return (
        <Card
            bg="info"
            text={'white'}
            style={{ maxWidth: '720px' }}
            className="mb-2"
        >
            {/* <Card.Header>{props['sessionDetails']['date']}</Card.Header> */}
            <Card.Body style={{
                backgroundColor: '#0069d9'
            }}>
                <Card.Title>{props['sessionDetails']['name']} </Card.Title>
                <Card.Text>
                    Minimum age limit: {props['sessionDetails']['min_age_limit']} 
                    <br></br>
                    Number of vaccines available: {props['sessionDetails']['available_capacity']}
                </Card.Text>
            </Card.Body>
        </Card>

    );
}



