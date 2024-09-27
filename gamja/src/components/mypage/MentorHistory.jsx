import React from "react";
import styled from "styled-components";
import MenteeImg from "../../images/MenteeImg.svg";

const MentorHistory = ({ Info }) => {
  return (
    <>
      <Wrapper>
        <Left>
          {Info.mentoringRecord?.map((record, idx) => (
            <CategoryBox key={idx}>
              <Category>{record.interest}</Category>
              <CategoryCount>
                {record.count}
                <span>회</span>
              </CategoryCount>
            </CategoryBox>
          ))}
        </Left>
        <Right>
          {Info.myMentoring?.map((mentoring, index) => (
            <Container key={index}>
              <InfoBox>
                <PhotoBox>
                  <Profile src={MenteeImg} alt="profileImg" />
                </PhotoBox>
                <NameBox>
                  <Username>{mentoring.mentee_name}</Username>
                  <ContentCategoryBox>
                    {mentoring.interests?.map((interest, idx) => (
                      <ContentCategory key={idx}>
                        {interest.name}
                      </ContentCategory>
                    ))}
                  </ContentCategoryBox>
                </NameBox>
              </InfoBox>
              <ConcernBox>{mentoring.title}</ConcernBox>
            </Container>
          ))}
        </Right>
      </Wrapper>
    </>
  );
};

export default MentorHistory;

const Wrapper = styled.div`
  display: flex;
  gap: 3px;
`;

const Left = styled.div`
  margin-top: 5px;
  width: 85px;
  padding: 13px 10px;
  border-radius: 15px;
  background: #f8f8f8;
  box-shadow: 4px 0px 10px -5px rgba(0, 0, 0, 0.25);
`;

const CategoryBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0px;
`;

const Category = styled.div`
  padding: 3px 5px;
  border-radius: 10px;
  background: rgba(3, 174, 210, 0.2);
  color: #03aed2;
  text-align: center;
  font-size: 13px;
  font-weight: 500;
`;

const CategoryCount = styled.span`
  color: #494949;
  font-size: 15px;
  font-weight: 500;

  > span {
    color: #a4a4a4;
    font-size: 8px;
    font-weight: 500;
    margin-left: 2px;
  }
`;

const Right = styled.div`
  margin-top: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  border-radius: 15px;
  max-width: 418px;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Container = styled.div`
  flex: 0 0 auto;
  width: 152px;
  height: 95px;
  border-radius: 15px;
  background: #f8f8f8;
  padding: 17px 12px;
`;

const Profile = styled.img`
  width: 40px;
  height: 40px;
`;

const InfoBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const PhotoBox = styled.div``;
const NameBox = styled.div``;

const Username = styled.div`
  color: #494949;
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 2px;
`;

const ContentCategoryBox = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
`;

const ContentCategory = styled.div`
  border-radius: 10px;
  background: rgba(3, 174, 210, 0.2);
  color: #03aed2;
  text-align: center;
  font-size: 10px;
  font-weight: 500;
  padding: 3px 5px;
`;

const ConcernBox = styled.div`
  margin-top: 15px;
  max-height: 36px;
  overflow: hidden;
  color: #494949;
  font-size: 15px;
  font-weight: 400;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;
