import queryString from 'query-string';
import { useState } from 'react';

const API_BASE_URL = 'http://localhost:5001';


export async function getBusByName(busName) {
  try {
    const response = await fetch(`${API_BASE_URL}/v1/bus/${busName}`);
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message || 'An error occurred while fetching the bus data.');
    }
  } catch (error) {
    console.error('Error fetching bus data:', error.message);
    throw error;
  }
}

export async function getBusListByName(busName) {
  try {
    const response = await fetch(`${API_BASE_URL}/v1/search/bus?partial_number=${busName}`);
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message || 'An error occurred while fetching the bus data.');
    }
  } catch (error) {
    console.error('Error fetching bus data:', error.message);
    throw error;
  }
}

export async function getStationListByName(stationName) {
  try {
    const response = await fetch(`${API_BASE_URL}/v1/search/station?partial_name=${stationName}`);
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message || 'An error occurred while fetching the station data.');
    }
  } catch (error) {
    console.error('Error fetching station data:', error.message);
    throw error;
  }
}


export async function getBusStopByName(busName) {
  try {
    const response = await fetch(`${API_BASE_URL}/v1/bus/bus_stop/${busName}`);
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message || 'An error occurred while fetching the bus stop data.');
    }
  } catch (error) {
    console.error('Error fetching bus stop data:', error.message);
    throw error;
  }
}

export async function getBusListByBusStop(station_name) {
  try {
    const response = await fetch(`${API_BASE_URL}/v1/station/buses/${station_name}`);
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message || 'An error occurred while fetching the bus data.');
    }
  } catch (error) {
    console.error('Error fetching bus data:', error.message);
    throw error;
  }
}

export async function getBusStopByBusId(bus_id) {
  try {
    const response = await fetch(`${API_BASE_URL}/v1/bus/bus_stop_id/${bus_id}`);
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message || 'An error occurred while fetching the bus data.');
    }
  } catch (error) {
    console.error('Error fetching bus data:', error.message);
    throw error;
  }
}


export async function getBusListByStationId(station_id) {
  try {
    const response = await fetch(`${API_BASE_URL}/v1/station/bus_stop/${station_id}`);
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message || 'An error occurred while fetching the bus data.');
    }
  } catch (error) {
    console.error('Error fetching bus data:', error.message);
    throw error;
  }
}

export async function getBusArrivalList(station_id) {
  try {
    const response = await fetch(`${API_BASE_URL}/v1/bus_arrival_list?station_id=${station_id}`);
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message || 'An error occurred while fetching the bus data.');
    }
  } catch (error) {
    console.error('Error fetching bus data:', error.message);
    throw error;
  }
}



export async function postLogin(username, password) {
  try {
    console.log(username, password);
    const response = await fetch(`${API_BASE_URL}/v1/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message || 'An error occurred while fetching the bus data.');
    }
  } catch (error) {
    console.error('Error fetching bus data:', error.message);
    throw error;
  }
}


export async function postRegister(username, email, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/v1/user/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username,email, password}),
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message || 'An error occurred while register.');
    }
  } catch (error) {
    console.error('Error fetching register:', error.message);
    throw error;
  }
}

export async function requestFavorite(username, password) {
  try {
    console.log(username, password);
    const response = await fetch(`${API_BASE_URL}/v1/favorites`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message || 'An error occurred while fetching the bus data.');
    }
  } catch (error) {
    console.error('Error fetching bus data:', error.message);
    throw error;
  }
}


export async function fetchData(access_token){
  try {
    console.log(access_token);
    const response = await fetch(`${API_BASE_URL}/v1/favorites`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      const result = await response.json();
      console.log(result) 
    } else {
      console.log('Error:', response.statusText);
    }
  } catch (error) {
    console.log('Error:', error.message);
  }
};
