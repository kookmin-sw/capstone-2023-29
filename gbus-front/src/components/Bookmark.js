import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from 'react-bootstrap/Table';
import { removeBM, setBM } from "../Store";


function Bookmark(){

    let bookmark = useSelector((state)=>{return state.bookmark})
    let dispatch = useDispatch()

    return(
        <Table>
      <thead>
        <tr>
          <th>버스 번호</th>
          <th>정류장</th>
          <th>즐겨 찾기</th>
        </tr>
      </thead>
      <tbody>
        {bookmark.map((item, index) => (
            <tr key={index}>
            <td>{item.name}</td>
            <td>-</td>
            <td>
              <button onClick={()=>{
                dispatch(removeBM(index));
                dispatch(setBM(index));
                }}>
                즐찾해제</button>
              </td>
            </tr>
        ))}
        </tbody>
    </Table>
    )
}
export default Bookmark;