import {React, useState} from 'react';
import Table from 'react-bootstrap/Table';

function Bookmark(){
    return(
        <>
        <Table style={{
          backgroundColor: '#E2615B', color: '#FFFFFF', marginTop: '-16px'
        }}>
      <thead>
        <tr>
          <th style={{textAlign: 'center'}}>버스번호</th>
          <th style={{textAlign: 'center'}}>정류장</th>
          <th style={{textAlign: 'center'}}><img src='/star_white.svg' alt='star' style={{maxBlockSize: '25px'}} /></th>
        </tr>
      </thead>
      <tbody style={{backgroundColor: '#ECECEC'}}>
        <tr>
         </tr>
        </tbody>
    </Table>
        </>
    )
}

export default Bookmark;