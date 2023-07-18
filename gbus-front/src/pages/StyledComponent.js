import styled from 'styled-components';
import Table from 'react-bootstrap/Table';
import { MdStar } from "react-icons/md";

export const FavoriteButton = styled.button`
  background-color: #E2615B;
  border: none;
  color: white;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 1em;
  :hover {
    background-color: #c4554a;
  }
`;


export const BusDirection = styled.div`
  font-size: 0.8em;
  color: grey;
`;

export const BusDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f2f2f2;
  border-radius: 10px;
  padding: 20px;
  margin-top: 20px;
`;

export const BackButton = styled.button`
  margin-top: 20px;
  background-color: #E2615B;
  border: none;
  color: white;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 1em;
  :hover {
    background-color: #c4554a;
  }
`;

export const BusTable = styled(Table)`
  margin-top: 20px;
`;

export const StyledRow = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee;
  padding: 10px 0;
`;

export const BusInfo = styled.div`
  flex-grow: 1;
  margin-left: 10px;
`;

export const BusName = styled.h4`
  margin: 0;
`;

export const BusNextStop = styled.p`
  font-size: 0.8em;
  color: gray;
  margin: 0;
`;

export const ArrivalInfo = styled.p`
  margin: 0;
`;

export const SeatsInfo = styled.p`
  margin: 0;
  color: gray;
`;

export const FavoriteStar = styled(MdStar)`
  font-size: 1.5em;
  cursor: pointer;
`;