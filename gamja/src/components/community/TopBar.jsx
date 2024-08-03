import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import BackBtn from "./BackBtn";

const TopBar = ({ txt, $marginLeft, search }) => {
  const navigate = useNavigate();
  return (
    <>
      <Header>
        <BackBtn onClick={() => navigate(-1)} />
        <Title $marginLeft={$marginLeft}>{txt}</Title>
        <Search id="searchBtn" onClick={search}>
          <img src="/img/searchBtn.svg" alt="search" />
        </Search>
      </Header>
    </>
  );
};

export default TopBar;

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 0px 35px;
  background: #f8f8f8;
`;
const Title = styled.div`
  color: #494949;
  font-size: 30px;
  font-weight: 700;
  line-height: normal;
  margin-left: ${(props) => props.$marginLeft || "165px"};
`;

const Search = styled.button`
  appearance: none;
  border: 0;
  background-color: #f8f8f8;
  margin-left: auto;
`;
