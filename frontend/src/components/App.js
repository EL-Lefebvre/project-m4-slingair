import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import SeatSelect from "./SeatSelect";
import Confirmation from "./Confirmation";
import Profile from "./Profile";
import AllReservations from "./AllReservations";

import SearchReservation from "./SearchReservation";
import SingleReservation from "./FindReservation";
import GlobalStyles, { themeVars } from "./GlobalStyles";

const App = () => {
  const [userReservation, setUserReservation] = useState({});

  const updateUserReservation = (newData) => {
    setUserReservation({ ...userReservation, ...newData });
  };

  useEffect(() => {
const reservationId = window.localStorage.getItem("reservationId");
if(reservationId) {
  fetch(`/reservation/${reservationId}`)
  .then((res) => res.json())
  .then((json) => {
    setUserReservation(json.data);
  });
}
  }, [setUserReservation]);

  return (
    <BrowserRouter>
      <GlobalStyles />
      <Header userReservation={userReservation} update/>
      <Main>
        <Switch>
          <Route exact path="/">
            <SeatSelect updateUserReservation={updateUserReservation}  />
          </Route>
          <Route exact path="/update-reservations">
            <SeatSelect  updateUserReservation={updateUserReservation} update />
          </Route>
          <Route exact path="/confirmed">
            <Confirmation userReservation={userReservation} update />
          </Route>
          <Route exact path= "/profile">
            <Profile updateUserReservation={updateUserReservation} 
            userReservation={userReservation} />
          </Route>
          <Route exact path= "/admin">
            <AllReservations userReservation={userReservation}/>
          </Route>
          <Route exact path="/reservations/:id">
            <SingleReservation />
          </Route>
          <Route exact path= "/view-reservation">
            <SearchReservation userReservation={userReservation}/>
          </Route>
   
          
          <Route path="">404: Oops!</Route>
        </Switch>
        <Footer />
      </Main>
    </BrowserRouter>
  );
};

const Main = styled.div`
  background: ${themeVars.background};
  display: flex;
  flex-direction: column;
  height: calc(100vh - 110px);
`;

export default App;
