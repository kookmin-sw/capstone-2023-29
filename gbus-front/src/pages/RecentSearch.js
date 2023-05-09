import {React, useState} from 'react';
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from "react-redux";
import { returnBusNumRS } from '../Store';


function RecentSearch(){

  const dispatch = useDispatch()
  const state = useSelector((state)=>state)
  console.log(state.busNumRS)

    return(
        <>
        <Table >
      <thead>
        <tr>
          <th> busnum </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{state.busNumRS[0]}</td>
        </tr>
        <tr>
          <td>{state.busNumRS[1]}</td>
        </tr>
        <tr>
          <td>{state.busNumRS[2]}</td>
        </tr>
        </tbody>
    </Table>
    </>
    )
}

export default RecentSearch;