import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ListGroup from 'react-bootstrap/ListGroup';
import { removeRS } from "../Store";

function RecentSearch(){

    let recentSearch = useSelector((state)=>{return state.recentSearch})
    let dispatch = useDispatch()

    return(
        <ListGroup>
         {recentSearch.map((search, index) => (
        <ListGroup.Item key={index}>{search} 
        <button onClick={()=>{dispatch(removeRS(index))}}>x</button>
        </ListGroup.Item>
         ))}
        </ListGroup>
    )
}
export default RecentSearch;
