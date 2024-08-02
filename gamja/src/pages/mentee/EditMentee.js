import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import TitleOval from "../../components/categoryAndMatching/TitleOval";
import BottonBtn from "../../components/categoryAndMatching/BottonBtn";
import TopBar from "../../components/common/TopBar";

const EditMentee = () => {
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(true);
  const [username, setUsername] = useState("");

  useEffect(() => {
    setDisabled(username.length === 0);
  }, [username]);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  return (
    <Container>
      <TopBar txt="마이페이지" marginLeft={"154px"} />
      <Wrapper>
        <StyledTitleOval $active={username.length > 0}>
          이름 변경
        </StyledTitleOval>
        <UsernameInput
          placeholder="새로운 이름을 정해주세요"
          value={username}
          onChange={handleUsernameChange}
        />
        <ChatBtn
          disabled={disabled}
          $active={!disabled}
          onClick={() => navigate("/chat/mentee/:username")}
        >
          회원정보 저장하기
        </ChatBtn>
      </Wrapper>
    </Container>
  );
};

export default EditMentee;

const Container = styled.div`
  background-color: #ebebeb;
  width: 600px;
  margin: 0 auto;
  height: 1230px;
`;

const Wrapper = styled.div`
  padding: 0 40px;
`;

const UsernameInput = styled.input`
  margin-top: 19px;
  color: #494949;
  font-family: Pretendard;
  font-size: 35px;
  font-weight: 700;
  border: none;
  background: none;
  outline: none;
  margin-bottom: 812px;

  &::placeholder {
    color: rgba(73, 73, 73, 0.2);
  }
`;

const ChatBtn = styled(BottonBtn)`
  margin-top: auto;
  background: ${({ $active }) =>
    $active ? "#494949" : "rgba(73, 73, 73, 0.20)"};
  cursor: ${({ $active }) => ($active ? "pointer" : "not-allowed")};
`;
const StyledTitleOval = styled(TitleOval)`
  background: ${({ $active }) =>
    $active ? "#7f7f7f" : "rgba(73, 73, 73, 0.10)"};
  border: ${({ $active }) => ($active ? "#7f7f7f" : "rgba(73, 73, 73, 0.10)")};
`;
