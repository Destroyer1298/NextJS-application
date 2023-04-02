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
import {useAtom} from 'jotai'
import {favouritesAtom} from '@/store'
import { Row, Col, Card } from 'react-bootstrap'
import ArtworkCard from '@/components/ArtworkCard'

function Favourites(){
    const [favourites, setFavourites] = useAtom(favouritesAtom)
    if (!favourites) return null;
    if (favourites){
        return(
            <Row className="gy-4" >
                {
                    favourites.length > 0 ? favourites.map((favourites) => (
                        <Col lg={3} key={favourites}>
                            <ArtworkCard objectID={favourites} />
                        </Col>
                    )) :
                    <Card>
                        <Card.Body>
                            <Card.Title>
                                <h4><strong>Nothing Here</strong></h4>
                            </Card.Title>
                            <Card.Text>
                                <p>Try adding some new artwork to the list.</p>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                }
            </Row>
        )
    }
}

export default Favourites