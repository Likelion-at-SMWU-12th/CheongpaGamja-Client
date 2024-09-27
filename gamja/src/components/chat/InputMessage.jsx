import React, { useState, useEffect } from "react";
import styled from "styled-components";
import BlankSendBtn from "../../images/BlankSendBlue.svg";
import SendBtn from "../../images/sendBtn.svg";
import BlankYellow from "../../images/BlankYellow.svg";
import sendYellow from "../../images/sendYellow.svg";
import { useLocation } from "react-router-dom";
import { matchPath } from "react-router";
import axios from "axios";

const InputMessage = ({ roomId, onMessageSent }) => {
  const location = useLocation().pathname;
  const [message, setMessage] = useState("");
  const [sendBtnSrc, setSendBtnSrc] = useState(BlankSendBtn);
  // console.log(roomId);
  const accessToken = localStorage.getItem("access");

  const postMessage = () => {
    const Server_IP = process.env.REACT_APP_Server_IP;
    axios
      .post(
        `${Server_IP}/chat/${roomId}/add-chat/`,
        {
          message: message,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        // console.log(response.data);
        onMessageSent(response.data);
        setMessage("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (matchPath("/chat/mentor/:roomId", location)) {
      setSendBtnSrc(message ? SendBtn : BlankSendBtn);
    } else if (matchPath("/chat/mentee/:roomId", location)) {
      setSendBtnSrc(message ? sendYellow : BlankYellow);
    }
  }, [location, message]);

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendBtn = () => {
    if (message.trim() !== "") {
      postMessage();
    }
  };

  return (
    <InputBox>
      <Input type="text" value={message} onChange={handleInputChange} />
      <SendButton onClick={handleSendBtn}>
        <img src={sendBtnSrc} alt="send" />
      </SendButton>
    </InputBox>
  );
};

export default InputMessage;

const InputBox = styled.footer`
  display: inline-flex;
  padding: 27px 35px;
  align-items: center;
  background: #f8f8f8;
  gap: 10px;
`;

const Input = styled.input`
  font-family: Pretendard;
  width: 440px;
  height: 51px;
  border: none;
  border-radius: 100px;
  background: #f6f6f6;
  box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.1) inset;
  outline: none;
  font-size: 13px;
  font-weight: 500;
  padding: 3px 10px 3px 20px;
`;

const SendButton = styled.button`
  /* position: absolute; */
  /* right: 53px; */
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;

  img {
    width: 50px;
    height: 50px;
  }
`;
