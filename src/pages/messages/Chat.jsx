import React from "react";
import MainLayout from "../../components/MainLayout";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Contacts from "./components/Contacts";
import Welcome from "./components/Welcome";
import ChatContainer from "./components/ChatContainer";
import { io } from "socket.io-client";

const Chat = () => {
  const socket = useRef();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("account")) {
      navigate("/");
    } else {
      const storedUser = JSON.parse(localStorage.getItem("account"));
      if (storedUser) {
        setIsLoading(true);
        setCurrentUser(storedUser);
      }
    }
  }, []);

  if (!currentUser) {
    setCurrentUser(JSON.parse(localStorage.getItem("account")));
  }

  useEffect(() => {
    if (currentUser) {
      socket.current = io(`${import.meta.env.VITE_API}`);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    const fetchData = async () => {
      if (currentUser) {
        const data = await axios.get(
          `${import.meta.env.VITE_API}/api/messages/allusers/${
            currentUser?._id
          }`
        );
        setContacts(data.data);
      }
    };

    fetchData();
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(`${import.meta.env.VITE_API}`);
      socket.current.emit("add-user", currentUser._id);
    }

    // };
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <MainLayout>
      <Container>
        <div className="container">
          <Contacts
            contacts={contacts}
            currentUser={currentUser}
            changeChat={handleChatChange}
          />
          {isLoading && currentChat === undefined ? (
            <Welcome currentUser={currentUser} />
          ) : (
            <ChatContainer
              currentChat={currentChat}
              currentUser={currentUser}
              socket={socket}
            />
          )}
        </div>
      </Container>
    </MainLayout>
  );
};

export default Chat;

const Container = styled.div`
  height: 100vh;
  width: 90vw;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  /* background-color: ; */
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;
