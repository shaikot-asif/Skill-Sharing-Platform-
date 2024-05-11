import React from "react";
import styled from "styled-components";
import Robot from "../../../assets/robot.gif";
const Welcome = ({ currentUser }) => {
  return (
    <Container>
      <img src={Robot} alt="robot" />
      <h1>
        Welcome <span>{currentUser.name}</span>{" "}
      </h1>
      <p>Select a chat to Start messaging</p>
    </Container>
  );
};

export default Welcome;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;
