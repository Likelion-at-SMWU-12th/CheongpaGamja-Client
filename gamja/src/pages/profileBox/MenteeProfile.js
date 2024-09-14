import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MenteeImg from "../../images/MenteeImg.svg";
import xBtn from "../../images/xBtn.svg";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Server_IP = process.env.REACT_APP_Server_IP;

const MenteeProfile = () => {
  const { menteeId } = useParams();
  // console.log(menteeId);
  const navigate = useNavigate();
  const [Info, setInfo] = useState([]);
  // console.log(Info);
  const accessToken = localStorage.getItem("access");

  useEffect(() => {
    const getProfile = () => {
      axios
        .get(`${Server_IP}/profile/${menteeId}/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          // console.log(response.data);
          setInfo(response.data);
        })
        .catch((error) => {
          // console.log(menteeId);
          console.log(error);
        });
    };
    getProfile();
  }, [accessToken, menteeId]);

  const onCancel = () => {
    navigate(-1);
  };

  return (
    <>
      <Container>
        <MenteeBox>
          <Top>
            <NameBox>
              <Profile src={MenteeImg} />
              <Username>{Info.name}</Username>
            </NameBox>
            <CloseBtn src={xBtn} onClick={onCancel} />
          </Top>
          <ConcernBox>
            <Title>멘티의 한 줄 고민</Title>
            <Concern>
              {Info.concern?.content
                ? Info.concern.content
                : "아직 작성된 고민이 없어요"}
            </Concern>
          </ConcernBox>
          <HistoryBox>
            <Title>멘티의 멘토링 내역</Title>
            <History>
              <Column>
                {Info.mentoringRecord?.slice(0, 3)?.map((record, index) => (
                  <Record key={index}>
                    <Interest>{record.interest}</Interest>
                    <Count>
                      {record.count}
                      <span>회</span>
                    </Count>
                  </Record>
                ))}
              </Column>
              <Column>
                {Info.mentoringRecord?.slice(3, 6)?.map((record, index) => (
                  <Record key={index}>
                    <Interest>{record.interest}</Interest>
                    <Count>
                      {record.count}
                      <span>회</span>
                    </Count>
                  </Record>
                ))}
              </Column>
            </History>
            <DetailWrapper>
              <Details>
                {Info.myMentoring?.map((mentoring) => (
                  <DetailBox key={mentoring.id}>
                    <DetailCategoryBox>
                      {mentoring.interests?.map((interest, index) => (
                        <DetailCategory key={index}>
                          {interest.name}
                        </DetailCategory>
                      ))}
                    </DetailCategoryBox>
                    <DetailContent>{mentoring.title}</DetailContent>
                  </DetailBox>
                ))}
              </Details>
            </DetailWrapper>
          </HistoryBox>
        </MenteeBox>
      </Container>
    </>
  );
};

export default MenteeProfile;

const Container = styled.div`
  background: rgba(248, 248, 248, 0.85);
  margin: 0 auto;
  padding: 315px 86px;
`;
const MenteeBox = styled.div`
  width: 360px;
  border-radius: 20px;
  background: linear-gradient(180deg, #cdeff6 0%, #03aed2 100%);
  box-shadow: 0px 4px 15px 0px rgba(0, 0, 0, 0.1);
  padding: 26px 25px 53px 43px;
`;
const Top = styled.div`
  display: flex;
  justify-content: space-between;
`;

const NameBox = styled.div`
  display: flex;
  align-items: center;
  gap: 13px;
  margin-top: 14px;
`;

const Profile = styled.img`
  width: 65px;
  height: 65px;
  border-radius: 50%;
`;
const Username = styled.div`
  color: #494949;
  font-size: 30px;
  font-weight: 500;
`;

const CloseBtn = styled.img`
  width: 25px;
  height: 25px;
  flex-shrink: 0;
  cursor: pointer;
`;

const ConcernBox = styled.div`
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  gap: 7px;
`;
const Title = styled.div`
  color: #494949;
  font-size: 20px;
  font-weight: 700;
  margin-top: 37px;
`;
const Concern = styled.div`
  border-radius: 15px;
  background: #f8f8f8;
  padding: 15px 20px;
  color: #494949;
  font-size: 15px;
  font-weight: 500;
`;

const HistoryBox = styled.div`
  margin-right: 20px;
`;

const History = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 7px;
  gap: 11px;
  padding: 15px 23px;
  border-radius: 15px;
  background: #f8f8f8;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Record = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Interest = styled.div`
  padding: 4px 10px;
  border-radius: 9px;
  background: rgba(73, 73, 73, 0.2);
  color: #494949;
  font-size: 12px;
  font-weight: 500;
  margin-right: 43px;
`;

const Count = styled.div`
  color: #494949;
  text-align: right;
  font-size: 15px;
  font-weight: 500;
  > span {
    color: #a4a4a4;
    font-size: 8px;
    font-weight: 500;
    margin-left: 2px;
  }
`;

const DetailWrapper = styled.div`
  max-width: 339px;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  margin-top: 14px;
  border-radius: 15px;
`;

const Details = styled.div`
  display: flex;
  gap: 8px;
`;

const DetailBox = styled.div`
  display: inline-flex;
  flex-direction: column;
  background: #f8f8f8;
  border-radius: 15px;
  flex: 0 0 auto;
  width: 115px;
  height: 96.5px;
  padding: 10px;
`;

const DetailCategoryBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 3px;
`;

const DetailCategory = styled.div`
  background: rgba(73, 73, 73, 0.2);
  padding: 3px 10px;
  border-radius: 9px;
  color: #494949;
  font-size: 10px;
  font-weight: 500;
  text-align: center;
`;

const DetailContent = styled.div`
  margin-top: 15px;
  color: #494949;
  font-size: 13px;
  font-weight: 400;
  text-align: center;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  width: 100%;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
`;
