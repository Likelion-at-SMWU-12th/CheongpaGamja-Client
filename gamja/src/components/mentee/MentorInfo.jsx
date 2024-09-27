import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import RateBox from "./RateBox";
import MentorImg from "../../images/MentorImg.svg";
import FollowYellow from "../../images/FollowYellow.svg";
import FollowGray from "../../images/FollowGray.svg";
import axios from "axios";

const Server_IP = process.env.REACT_APP_Server_IP;

const MentorInfo = ({ infoList }) => {
  const [mentors, setMentors] = useState(infoList);
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("access");

  useEffect(() => {
    setMentors(infoList);
  }, [infoList]);

  const postLike = (mentor) => {
    axios
      .post(
        `${Server_IP}/mentors/${mentor.mentor_id}/likes/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        // console.log(response.data);
        alert(response.data);
        setMentors((prevMentors) =>
          prevMentors.map((m) =>
            m.mentor_id === mentor.mentor_id
              ? { ...m, is_subscribed: !m.is_subscribed }
              : m
          )
        );
      })
      .catch((error) => {
        console.log(error);
        // console.log(mentor.mentor_id);
        alert("멘토 관심 설정에 실패하였습니다.");
      });
  };

  return (
    <>
      {mentors.map((mentor) => (
        <InfoBox key={mentor.mentor_id}>
          <ProfileBox>
            <Left>
              <Profile
                src={MentorImg}
                alt="profileImg"
                onClick={() => navigate(`/profile/mentor/${mentor.user}`)}
              />
              <Name onClick={() => navigate(`/profile/mentor/${mentor.user}`)}>
                {mentor.mentor_name}
              </Name>
            </Left>
            <SubscribeButton
              src={mentor.is_subscribed ? FollowYellow : FollowGray}
              alt={mentor.is_subscribed ? "Following" : "Follow"}
              onClick={() => postLike(mentor)}
            />
          </ProfileBox>
          <MiddleBox>
            {mentor.mentoring_record.map((cat, idx) => (
              <CategoryBox key={idx}>
                <Category>{cat.interest}</Category>
                <CategoryCount>
                  {cat.count}
                  <span>회</span>
                </CategoryCount>
              </CategoryBox>
            ))}
          </MiddleBox>
          <RateBox rating={mentor.rating} />
          <BtnBox>
            <GoRead
              onClick={() =>
                navigate(`/community/mentor/${mentor.mentor_id}/`, {
                  state: {
                    mentor_id: mentor.mentor_id,
                    mentor_name: mentor.mentor_name,
                  },
                })
              }
            >
              칼럼 읽기
            </GoRead>
            <GoChat
              onClick={() =>
                navigate(`/chat-create/mentee/${mentor.mentor_id}`)
              }
            >
              채팅하기
            </GoChat>
          </BtnBox>
        </InfoBox>
      ))}
    </>
  );
};

export default MentorInfo;

const InfoBox = styled.div`
  margin-top: 28px;
  border-radius: 15px;
  background: #f8f8f8;
  display: flex;
  width: 219px;
  padding: 18px 14px;
  flex-direction: column;
  gap: 8px;
`;

const ProfileBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Left = styled.div`
  display: flex;
  align-items: center;
`;
const Profile = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  margin-right: 6px;
`;

const Name = styled.div`
  color: #494949;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  margin-right: 87px;
`;

const SubscribeButton = styled.img`
  cursor: pointer;
  width: 12px;
  height: 15.429px;
`;

const MiddleBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
`;

const CategoryBox = styled.div`
  display: flex;
  align-items: center;
  gap: 2.5px;
  justify-content: space-between;
`;

const Category = styled.div`
  padding: 3px 8px;
  border-radius: 9px;
  background: rgba(253, 222, 85, 0.2);
  color: #494949;
  font-size: 10px;
  font-weight: 500;
`;

const CategoryCount = styled.span`
  color: #494949;
  font-size: 15px;
  font-weight: 500;
  margin-right: auto;

  > span {
    color: #a4a4a4;
    font-size: 8px;
    font-weight: 500;
  }
`;

const BtnBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-top: 12px;
`;

const GoRead = styled.button`
  padding: 8px 25px;
  border-radius: 8px;
  cursor: pointer;
  color: #494949;
  border: none;
  font-family: "Pretendard";
  font-size: 15px;
  font-weight: 600;
  background: linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.5) 0%,
      rgba(255, 255, 255, 0.5) 100%
    ),
    #fdde55;
`;

const GoChat = styled.button`
  padding: 8px 25px;
  border-radius: 8px;
  cursor: pointer;
  color: #494949;
  border: none;
  font-family: "Pretendard";
  font-size: 15px;
  font-weight: 600;
  background: #fdde55;
`;
