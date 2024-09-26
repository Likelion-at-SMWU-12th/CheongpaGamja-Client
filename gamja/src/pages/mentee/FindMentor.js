import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import TopBar from "../../components/common/TopBar";
import CategoryBar from "../../components/common/CategoryBar";
import MentorInfo from "../../components/mentee/MentorInfo";
import axios from "axios";

const Server_IP = process.env.REACT_APP_Server_IP;

const FindMentor = () => {
  const navigate = useNavigate();
  const [infoList, setInfoList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const accessToken = localStorage.getItem("access");

  useEffect(() => {
    const getMentorInfo = () => {
      axios
        .get(`${Server_IP}/mentors/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          // console.log(response.data);
          setInfoList(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getMentorInfo();
  }, [accessToken]);

  const filteredInfos = infoList.filter(
    (info) =>
      selectedCategory === "전체" ||
      info.mentoring_record.some(
        (interests) => interests.interest === selectedCategory
      )
  );

  return (
    <Container>
      <TopContainer>
        <TopBar txt={"멘토 찾기"} />
        <CategoryBar onSelectCategory={setSelectedCategory} />
      </TopContainer>
      <InfoBox>
        <MentorInfo infoList={filteredInfos} />
      </InfoBox>
      <BottomBar>
        <AutoMatch onClick={() => navigate("/category/mentee")}>
          자동 매칭하기
        </AutoMatch>
      </BottomBar>
    </Container>
  );
};

export default FindMentor;

const Container = styled.div`
  background-color: #ededed;
  width: 600px;
  margin: 0 auto;
  overflow-y: scroll;
  min-height: calc(150vh - 100px);
  &::-webkit-scrollbar {
    display: none;
  }
`;

const InfoBox = styled.div`
  padding: 0px 40px 150px;
  display: grid;
  grid-template-columns: repeat(2, auto);
  gap: 24px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const BottomBar = styled.div`
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

const TopContainer = styled.div`
  background: #f8f8f8;
  box-shadow: 0px 4px 2px 0px rgba(0, 0, 0, 0.05);
`;

const AutoMatch = styled.button`
  display: flex;
  width: 259px;
  height: 53px;
  justify-content: center;
  align-items: center;
  color: #fdde55;
  font-size: 20px;
  font-weight: 700;
  border-radius: 15px;
  background: #494949;
  border: none;
  cursor: pointer;
`;
