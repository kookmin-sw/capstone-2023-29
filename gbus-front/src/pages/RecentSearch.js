import {React, useState} from 'react';
import Table from 'react-bootstrap/Table';

function RecentSearch(){
    return(
        <>
        <Table >
      <thead>
        <tr>
          <th> busnum </th>
          <th>Info</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>110</td>
          <td>안산시</td>
        </tr>
        <tr>
          <td>1100</td>
          <td>고양시</td>
        </tr>
        <tr>
          <td>1100</td>
          <td>남양주시</td>
        </tr>
        </tbody>
    </Table>
    <Table >
      <thead>
        <tr>
          <th>station</th>
          <th>Info</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>110</td>
          <td>안산시</td>
        </tr>
        <tr>
          <td>1100</td>
          <td>고양시</td>
        </tr>
        <tr>
          <td>1100</td>
          <td>남양주시</td>
        </tr>
        </tbody>
    </Table>
    </>
    )
}

export default RecentSearch;