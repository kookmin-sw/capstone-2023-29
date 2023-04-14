import {React, useState, useEffect} from "react";
import Table from 'react-bootstrap/Table';


function SearchResult({searchResultList},{title}){

    let [info,setInfo] = useState(false)
    let [result, setResult] =useState([])
    let [titleType, setTitleType] =useState(false)

    useEffect(()=>{
        setResult(JSON.parse(searchResultList))

    },[searchResultList])

    if (!result || result.length === 0) {
        return null;
    }

    if (title === "버스번호"){
        setTitleType(true)
    }

    return(
        <>
        {!info ?
        <>
        <div>
            <Table>
                <thead>
                    <tr>
                        <th>버스 번호</th>
                    </tr>
                </thead>
                {!titleType ?
                <>
                <tbody>
                   <tr>
                    <td>{result[0]}</td>
                    </tr> 
                    <tr>
                    <td>{result[1]}</td>
                    </tr>
                    <tr>
                    <td>{result[2]}</td>
                    </tr>
                    <tr>
                    <td>{result[3]}</td>
                    </tr>
                </tbody>
                </>
                :
                <>
                <tbody>
                    <tr>버스리스트</tr>
                </tbody>
                </>}
                
            </Table>
        </div>
    </>
    :
    <>
    <h1>버스정보</h1>
    <></>
    <button onClick={()=>(setInfo(!info))}>닫기</button>
    </>
    }
    </>
    )
}
export default SearchResult;