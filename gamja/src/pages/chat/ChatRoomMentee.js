import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import OutBtnImg from "../../images/OutBtn.svg";
import ChatTopBar from "../../components/chat/ChatTopBar";
import Receiver from "../../components/chat/Receiver";
import Sender from "../../components/chat/Sender";
import InputMessage from "../../components/chat/InputMessage";
import axios from "axios";

const Server_IP = process.env.REACT_APP_Server_IP;

const ChatRoomMentee = () => {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const [chatRoomData, setChatRoomData] = useState([]);
  const accessToken = localStorage.getItem("access");

  useEffect(() => {
    const getMessage = () => {
      axios
        .get(`${Server_IP}/chat/${roomId}/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          // console.log(response.data);
          setChatRoomData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getMessage();
  }, [accessToken, roomId]);

  const handleNewMessage = (newMessage) => {
    setChatRoomData((prevMessages) => ({
      ...prevMessages,
      chats: [...prevMessages.chats, newMessage],
    }));
  };

  return (
    <Container>
      <TopContainer>
        <ChatTopBar txt={"채팅하기"} />
        <FuncBar>
          <RoomName>{chatRoomData?.title}</RoomName>
          <ButtonContainer>
            <Icon
              src={OutBtnImg}
              alt="WriteReview"
              onClick={() => navigate(`/review/write/${roomId}`)}
            />
          </ButtonContainer>
        </FuncBar>
      </TopContainer>
      <MessageContainer>
        {chatRoomData?.chats?.map((chat, idx) =>
          chat.is_mentee ? (
            <Sender key={idx} message={chat.message} />
          ) : (
            <Receiver
              key={idx}
              message={chat.message}
              username={chatRoomData.mentor_name}
            />
          )
        )}
      </MessageContainer>
      <InputContainer>
        <InputMessage
          roomId={chatRoomData.id}
          onMessageSent={handleNewMessage}
        />
      </InputContainer>
    </Container>
  );
};

export default ChatRoomMentee;

const Container = styled.div`
  background-color: #ededed;
  width: 600px;
  margin: 0 auto;
  overflow-y: scroll;
  min-height: calc(150vh + 100px);
  &::-webkit-scrollbar {
    display: none;
  }
`;

const TopContainer = styled.div`
  background: #f8f8f8;
  box-shadow: 0px 4px 2px 0px rgba(0, 0, 0, 0.05);
  position: fixed;
  width: 600px;
`;

const FuncBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 40px;
`;

const RoomName = styled.div`
  width: 363px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #7f7f7f;
  font-size: 25px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  letter-spacing: -0.55px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 29px;
`;

const Icon = styled.img`
  width: 40px;
  height: 40px;
  cursor: pointer;
`;

const InputContainer = styled.div`
  position: fixed;
  bottom: 0;
  width: 600px;
  height: 107px;
  background: #f8f8f8;
  box-shadow: 0px -4px 4px 0px rgba(0, 0, 0, 0.05);
  justify-content: center;
  align-items: center;
  display: flex;
`;

const MessageContainer = styled.div`
  flex: 1;
  padding: 180px 40px 150px 29px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;
