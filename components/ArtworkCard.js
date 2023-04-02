/*********************************************************************************
*  WEB422 – Assignment 6
*  I declare that this assignment is my own work in accordance with Seneca Academic Policy. 
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Akezhan Kaliyev Student ID: 1255988212 Date: 19.03.2023
*
*
********************************************************************************/ 
import SWR from 'swr'
import Error from 'next/error'
import Link from 'next/link'
import {Card, Button} from 'react-bootstrap'

function ArtworkCard({ objectID }) {
    const {data, error} = SWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`)
    return(
        error ? <Error statusCode={404} /> : !data ? null :
            <Card >
                <Card.Img variant="top" src={data.primaryImageSmall ? data.primaryImageSmall : 'https://via.placeholder.com/375x375.png?text=[+Not+Available+]'} />          
                <Card.Body>
                    <Card.Title>{data.title ? data.title : 'N/A'}</Card.Title>
                    <Card.Text style={{paddingBottom: '1.5em'}}>
                        <b>Date: </b>{data.objectDate ? data.objectDate : 'N/A'}<br />
                        <b>Classification: </b>{data.classification ? data.classification : 'N/A'}<br />
                        <b>Medium: </b>{data.medium ? data.medium : 'N/A'}
                    </Card.Text>
                    <Link href={`/artwork/${objectID}`} passHref>
                        <Button variant="outline-dark">
                            <b>ID: </b>{objectID}
                        </Button>
                    </Link>                   
                </Card.Body>
            </Card>
    )
}

export default ArtworkCard