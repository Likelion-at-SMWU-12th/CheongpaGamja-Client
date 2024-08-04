import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TopBar from "../../components/common/TopBar";
import MenuBar from "../../components/chat/MenuBar";
import RecentChat from "../../components/chat/RecentChat";
import SuggestMentee from "../../components/chat/SuggestMentee";
import AdZone from "../../components/chat/AdZone";
import axios from "axios";

const ChatListMentee = () => {
  const [selectedNav, setSelectedNav] = useState("recent");
  const [chatList, setChatList] = useState([]);
  const [suggestList, setSuggestList] = useState([]);
  const accessToken = localStorage.getItem("access");

  const getChatList = () => {
    axios
      .get("http://127.0.0.1:8000/chat/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log(response.data.recent_chats);
        setChatList(response.data.recent_chats);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getSuggestList = () => {
    axios
      .get("http://127.0.0.1:8000/chat/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log(response.data.mentee_suggestions);
        setSuggestList(response.data.mentee_suggestions);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getChatList();
    getSuggestList();
  }, []);

  const onClickNav = (nav) => {
    setSelectedNav(nav);
  };
  return (
    <>
      <Container>
        <TopBar txt={"채팅하기"} />
        <MenuBar
          txt={"멘티의 제안 목록"}
          selectedNav={selectedNav}
          onClickNav={onClickNav}
        />
        <ListBox>
          {selectedNav === "recent" && <RecentChat chatList={chatList} />}
          {selectedNav === "suggest" && (
            <SuggestMentee suggestList={suggestList} />
          )}
        </ListBox>
        <BottomBar>
          <AdZone />
        </BottomBar>
      </Container>
    </>
  );
};

export default ChatListMentee;

const Container = styled.div`
  background-color: #f8f8f8;
  width: 600px;
  margin: 0 auto;
  height: 1230px;
`;

const ListBox = styled.div`
  padding: 15px 0px;
`;

const BottomBar = styled.div`
  position: fixed;
  bottom: 0;
  width: 520px;
  height: 148px;
  background: #f8f8f8;
  justify-content: center;
  align-items: center;
  display: flex;
  padding: 38px 40px;
`;
