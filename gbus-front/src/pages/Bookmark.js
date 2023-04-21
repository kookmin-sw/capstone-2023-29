import {React, useState} from 'react';
import Table from 'react-bootstrap/Table';

function Bookmark(){
    return(
        <>
        <Table >
      <thead>
        <tr>
          <th>버스번호</th>
          <th>정류장</th>
          <th>즐겨찾기여부</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>110</td>
          <td>안산시</td>
          <td>즐찾</td>
        </tr>
        <tr>
          <td>1100</td>
          <td>고양시</td>
          <td>즐찾</td>
        </tr>
        <tr>
          <td>1100</td>
          <td>남양주시</td>
          <td>즐찾</td>
        </tr>
        </tbody>
    </Table>
        </>
    )
}

export default Bookmark;