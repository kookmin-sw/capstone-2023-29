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
          <td>1000</td>
          <td>214000244</td>
        </tr>
        <tr>
          <td>1000-1</td>
          <td>234001511</td>
        </tr>
        <tr>
          <td>2000</td>
          <td>222000075</td>
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
          <td>미사역</td>
          <td>227000682</td>
        </tr>
        <tr>
          <td>미사역사일가공원.센텀펠리스.하남고</td>
          <td>227000266</td>
        </tr>
        <tr>
          <td>미사역사일가공원.동일하이빌.샌텀팰리스</td>
          <td>227000354</td>
        </tr>
        </tbody>
    </Table>
    </>
    )
}

export default RecentSearch;