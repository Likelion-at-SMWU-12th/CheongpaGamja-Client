import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import TitleOval from "../../components/categoryAndMatching/TitleOval";
import CategoryOval from "../../components/chat/CategoryOval";
import BottonBtn from "../../components/categoryAndMatching/BottonBtn";
import TopBar from "../../components/common/TopBar";
import axios from "axios";

const Server_IP = process.env.REACT_APP_Server_IP;

const WriteConcern = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [concern, setConcern] = useState("");
  const accessToken = localStorage.getItem("access");

  const toggleCategory = (value) => {
    setCategory((prev) => {
      if (prev.includes(value)) {
        return prev.filter((cat) => cat !== value);
      } else if (prev.length < 2) {
        return [...prev, value];
      }
      return prev;
    });
  };

  useEffect(() => {
    setDisabled(category.length === 0 || concern.length === 0);
  }, [category, concern]);

  const handleConcernChange = (e) => {
    setConcern(e.target.value);
  };

  const handleSubmit = () => {
    const data = {
      content: concern,
      interests: category,
    };

    axios
      .post(`${Server_IP}/concerns/`, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        // console.log(response.data);
        alert("고민이 생성되었습니다");
        navigate(-1);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Container>
      <TopBar txt="마이페이지" marginLeft={"154px"} />
      <Wrapper>
        <StyledTitleOval $active={concern.length > 0}>
          한 줄 고민
        </StyledTitleOval>
        <ConcernInput
          placeholder="한 줄 고민을 적어주세요"
          value={concern}
          onChange={handleConcernChange}
        />
        <StyledCategoryOval $active={category.length > 0}>
          카테고리 설정
        </StyledCategoryOval>
        <ButtonGroup>
          {["가치관", "재테크", "사랑", "생활지식", "인간관계", "진로"].map(
            (item) => (
              <StyledButton
                key={item}
                onClick={() => toggleCategory(item)}
                $active={category.includes(item)}
              >
                {item}
              </StyledButton>
            )
          )}
        </ButtonGroup>
        <SideText>최대 2개의 카테고리를 선택해주세요.</SideText>
        <ChatBtn disabled={disabled} $active={!disabled} onClick={handleSubmit}>
          한 줄 고민 작성하기
        </ChatBtn>
      </Wrapper>
    </Container>
  );
};

export default WriteConcern;

const Container = styled.div`
  background-color: #ebebeb;
  width: 600px;
  margin: 0 auto;
  height: 1230px;
`;

const Wrapper = styled.div`
  padding: 0 40px;
`;

const ConcernInput = styled.input`
  margin-top: 19px;
  color: #494949;
  font-family: Pretendard;
  font-size: 35px;
  font-weight: 700;
  border: none;
  background: none;
  outline: none;
  width: 520px;
  &::placeholder {
    color: rgba(73, 73, 73, 0.2);
  }
`;

const SideText = styled.div`
  color: #7f7f7f;
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 400;
  line-height: normal;
  padding: 14px 0 462px;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 25px;
`;

const StyledButton = styled.button`
  appearance: none;
  border: 0;
  padding: 9px 25px;
  border-radius: 30px;
  border: ${({ $active }) =>
    $active ? "1px solid #FDDE55" : "1px solid rgba(73, 73, 73, 0.2)"};
  background: ${({ $active }) =>
    $active
      ? "linear-gradient(0deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.5) 100%), #FDDE55"
      : "rgba(73, 73, 73, 0.1)"};
  color: ${({ $active }) => ($active ? "#494949" : "#7f7f7f")};
  text-align: center;
  font-family: Pretendard;
  font-size: 30px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: ${({ $active }) =>
    $active ? "0 0 8px rgba(253, 222, 85, 0.8)" : "none"};
`;

const ChatBtn = styled(BottonBtn)`
  margin-top: auto;
  background: ${({ $active }) =>
    $active ? "#494949" : "rgba(73, 73, 73, 0.20)"};
  cursor: ${({ $active }) => ($active ? "pointer" : "not-allowed")};
`;

const StyledCategoryOval = styled(CategoryOval)`
  background: ${({ $active }) =>
    $active ? "#7f7f7f" : "rgba(73, 73, 73, 0.10)"};
  border: ${({ $active }) => ($active ? "#7f7f7f" : "rgba(73, 73, 73, 0.10)")};
`;

const StyledTitleOval = styled(TitleOval)`
  background: ${({ $active }) =>
    $active ? "#7f7f7f" : "rgba(73, 73, 73, 0.10)"};
  border: ${({ $active }) => ($active ? "#7f7f7f" : "rgba(73, 73, 73, 0.10)")};
`;
