import React from "react";
import { useSelector } from "react-redux";
import ListGroup from 'react-bootstrap/ListGroup';


function Bookmark(){

    let bookmark = useSelector((state)=>{return state.bookmark})
    console.log(bookmark)

    return(
        <ListGroup>
            {bookmark.map((item) => (
                <ListGroup.Item key={item.id}>{item.keyword}</ListGroup.Item>
                ))}
        </ListGroup>
    )
}
export default Bookmark;