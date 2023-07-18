import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Table from 'react-bootstrap/Table';
import { getBusListByName, addFavoriteBus, getFavorites, deleteFavoriteBus, predict } from '../api.js';
import BusRoute from "./BusRoute.js";

function BusSearch() {
  const [inputValue, setInputValue] = useState('');
  const [busList, setBusList] = useState([]);
  const [selectedBus, setSelectedBus] = useState(null);
  const [favoriteBuses, setFavoriteBuses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = await getBusListByName(inputValue);
      setBusList(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching bus stop data:', error.message);
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const fetchFavorites = async () => {
    try {
      const data = await getFavorites(localStorage.getItem('token'));
      setFavoriteBuses(data);
    } catch (error) {
      console.error('Error fetching favorites:', error.message);
    }
  };

  const handleToggleFavorite = async (bus) => {
    try {
      if (favoriteBuses.includes(bus)) {
        await deleteFavoriteBus(bus);
      } else {
        await addFavoriteBus(bus);
      }
      fetchFavorites();
    } catch (error) {
      console.error('Error adding/removing favorite:', error.message);
    }
  };

  const handleBusSelection = async (bus) => {
    console.log(bus);
    setSelectedBus(bus);
  };

  return (
    <>
      {!selectedBus ? (
        <>
          <Form onSubmit={handleSubmit}>
            <InputGroup className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-default">
                Search
              </InputGroup.Text>
              <Form.Control
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                placeholder="버스번호"
                value={inputValue}
                onChange={handleInputChange}
              />
            </InputGroup>
          </Form>

          <Table style={{ backgroundColor: '#ECECEC', marginTop: '-16px' }}>
            <thead style={{ backgroundColor: '#E2615B' }}>
              <tr>
                <th style={{ color: '#FFFFFF', width: '40%' }}>버스번호</th>
                <th style={{ color: '#FFFFFF', width: '40%' }}>방면 (종점)</th>
                <th><img src="/star_white.svg" alt='non_selected_stat' style={{ maxWidth: '25px' }}></img></th>
              </tr>
            </thead>
            <tbody style={{ borderRadius: '25px', height: '100px' }}>
              {isLoading ? (
                <tr>
                  <td colSpan="3">Loading...</td>
                </tr>
              ) : busList.length > 0 ? (
                busList.map((bus) => (
                  <tr key={bus.bus_id}>
                    <td
                      onClick={() => {
                        handleBusSelection(bus);
                      }}
                    >
                      {bus.bus_name}
                    </td>
                    <td>{bus.station_name}</td>
                    <td>
                      <img
                        src={
                          favoriteBuses.includes(bus.bus_id)
                            ? "/star_yellow.svg"
                            : "/star_white.svg"
                        }
                        alt={
                          favoriteBuses.includes(bus.bus_id)
                            ? 'selected_star'
                            : 'non_selected_star'
                        }
                        style={{ maxWidth: '25px' }}
                        onClick={() => {
                          handleToggleFavorite(bus.bus_id);
                        }}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">검색 결과가 없습니다.</td>
                </tr>
              )}
            </tbody>
          </Table>
        </>
      ) : (
        <BusRoute
          bus={selectedBus}
          favoriteBuses={favoriteBuses}
          onToggleFavorite={handleToggleFavorite}
          onBack={() => setSelectedBus(null)}
        />
      )}
    </>
  );
}

export default BusSearch;