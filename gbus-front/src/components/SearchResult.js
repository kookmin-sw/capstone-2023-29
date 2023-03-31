import React, { useState } from 'react'
import store from '../Store';


function SearchResult({data = [], storage})  {

  const [info, setInfo ] = useState(false)
  const[detail, setDetail] = useState(false)
  const [busname, setBusname] = useState("")
  const [busstop, setBusstop] = useState([])


    if(data.length <=0 ){
        return(
            <div className="empty-box">검색 결과가 없습니다</div>
        )
    }
    


    return( 
    <>     
        {!info &&  
        <>
        <ul 
        className = "result"
        >
          {data.map(({ id, name }) => (
            <li key={id}>
            {console.log("dd", id)}
            {console.log(name)}
              <img src="./img/busIcon.png" />
              <p onClick={ () => {
                // name === storage.productData[id].name && console.log("good")
                console.log(storage.productData[id-1].name)
                setBusname(storage.productData[id-1].name)
                setBusstop(storage.productData[id-1].busStop)
                setInfo(!info)
              }} >{name}</p>
            </li>
          ))}
        </ul>
        
        </>
        }


        {info ?  
        (
        <div className ="result">
          {console.log(busstop)}
          <div>
          <h2>{busname}</h2>
          </div>
          <div>
          {busstop.map((v, i) => (
            <ul key={i}>
              <img src="./img/busStop.png"/>
              <p onClick={()=>{
                console.log({v})
                setDetail(!detail)
              }}>{v}</p>

              {detail ? 
                (
                  <>
                  <div>안녕하세요</div>
                  </>
                ):(
                  <></>
                )
                }

            </ul>
          ))}

            </div>
          <button className="btn-close" onClick={()=>{setInfo(!info)}}/>
        </div>
        ) :(
           <></>
          )
        }
    
    
        </>
);
};

export default SearchResult;

