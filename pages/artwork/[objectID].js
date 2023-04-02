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
import { useRouter } from "next/router"
import { Row, Col } from "react-bootstrap"
import Error from 'next/error'
import ArtworkCardDetail from '@/components/ArtworkCardDetail'

export default function Artwork() {
    const router = useRouter()
    const { objectID } = router.query

    return (
        <>
            {
                objectID ?
                    <Row>
                        <Col>
                            <ArtworkCardDetail objectID={objectID} />
                        </Col>
                    </Row>
                    :
                    <Error statusCode={404} />
            }

        </>
    )
}