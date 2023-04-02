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
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '../store.js';
import { useRouter } from 'next/router';
import { ListGroup, Button } from 'react-bootstrap';
import styles from '../styles/History.module.css';
import {  Card } from "react-bootstrap"

export default function History() {
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    let parsedHistory = [];
    searchHistory.forEach(h => {
        let params = new URLSearchParams(h);
        let entries = params.entries();
        parsedHistory.push(Object.fromEntries(entries));
    });
    const router = useRouter();
    function historyClicked(e,index){
        router.push(`/artwork?${searchHistory[index]}`);
    }
    function removeHistoryClicked(e,index){
        e.stopPropagation();
        setSearchHistory(current => {
            let x = [...current];
            x.splice(index, 1)
            return x;
        });
    }
    if (parsedHistory.length==0) {
        return(
            <Card>
                <Card.Body><h4>Nothing Here</h4> 
                Try searching for some artwork
                </Card.Body>
            </Card>
        )
    }
    else if(parsedHistory.length>0){
        return (
            <ListGroup>
               {parsedHistory.map((historyItem, index) => (
                <ListGroup.Item className={styles.historyListItem} key={historyItem} onClick={(e)=>historyClicked(e,index)}>{Object.keys(historyItem).map(key => (<>{key}: <strong>{historyItem[key]}</strong>&nbsp;</>))}
                <Button className="float-end" variant="danger" size="sm" onClick={e => removeHistoryClicked(e, index)}>&times;</Button>
                </ListGroup.Item>
               ))}
            </ListGroup>
          );
    }
}