import React, { useState } from "react";
import {Dropdown, Form, InputGroup, DropdownButton} from 'react-bootstrap/';



function SearchForm(){

    let [title, setTitle] = useState("버스정보")

    return(
        <InputGroup className="mb-3">
            <DropdownButton
            variant="outline-secondary"
            title={title}
            id="input-group-dropdown-1"
            >
            <Dropdown.Item onClick={()=>setTitle("버스정보")} href="#">버스정보</Dropdown.Item>
            <Dropdown.Item onClick={()=>setTitle("정류장")}href="#">정류장</Dropdown.Item>
            </DropdownButton>
            <Form.Control aria-label="Text input with dropdown button" />
      </InputGroup>
    )

}

export default SearchForm;