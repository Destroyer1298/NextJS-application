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
import {Card, Button} from 'react-bootstrap'
import {useAtom} from 'jotai'
import {favouritesAtom} from '@/store'
import {useState} from 'react'
import { addToFavourites, removeFromFavourites } from '@/lib/userData';
import { useEffect } from 'react'



function ArtworkCardDetail({ objectID }) {
    const {data, error} = SWR(objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}` : null)
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom)
    const [showAdded, setShowAdded] = useState(false)

    useEffect(()=>{
        setShowAdded(favouritesList?.includes(objectID))
        }, [favouritesList])
    
    async function favouritesClicked(){
        if (showAdded==true) {
            setFavouritesList(await removeFromFavourites(objectID))
            setShowAdded(false)
        }
        else{
            setFavouritesList(await addToFavourites(objectID))
            setShowAdded(true)
        }
    }
    return(
        error ? <Error statusCode={404} /> : !data ? null :
            <Card>
                {data.primaryImage && <Card.Img variant="top" src={data.primaryImage} />}    
                <Card.Body>
                    <Card.Title>{data.title ? data.title : 'N/A'}</Card.Title>
                    <Card.Text>
                        <b>Date: </b>{data.objectDate ? data.objectDate : 'N/A'}<br />
                        <b>Classification: </b>{data.classification ? data.classification : 'N/A'}<br />
                        <b>Medium: </b>{data.medium ? data.medium : 'N/A'}<br />
                        <br />
                        <b>Artist: </b>{data.artistDisplayName ? data.artistDisplayName : 'N/A'}
                        {data.artistDisplayName && <span> (<a href={data.artistWikidata_URL} style={{color: "#18bc9c"}} target="_blank" rel="noreferrer"> wiki </a>)</span>}<br />
                        <b>Credit Line: </b>{data.creditLine ? data.creditLine : 'N/A'}<br />
                        <b>Dimensions: </b>{data.dimensions ? data.dimensions : 'N/A'}<br /><br />
                        <Button variant={showAdded ? "primary" : "outline-primary"} onClick={(e) => favouritesClicked()}>{showAdded ? "+ Favourite (added)" : "+ Favourite"}</Button>
                    </Card.Text>                  
                </Card.Body>
            </Card>
    )
}

export default ArtworkCardDetail