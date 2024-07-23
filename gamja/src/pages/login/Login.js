import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import MainContainer from "../../components/login/MainContainer";
import BottonBtn from "../../components/login/BottonBtn";
import LogoImage from "../../components/login/LogoImage";
import InputStyle from "../../components/login/InputStyle";
import InputLabel from "../../components/login/InputLabel";

const Login = () => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const navigate = useNavigate();

  const onChange = (e) => {
    if (e.target.id === "Id") {
      setId(e.target.value);
    } else {
      setPw(e.target.value);
    }
  };

  return (
    <MainContainer>
      <NewLogoImage />
      <InputDiv>
        <InputLabel htmlFor="Id">아이디</InputLabel>
        <InputStyle
          id="Id"
          placeholder="아이디를 입력해주세요"
          value={id}
          onChange={onChange}
        />
      </InputDiv>
      <InputDiv>
        <InputLabel htmlFor="Pw">비밀번호</InputLabel>
        <InputStyle
          id="Pw"
          placeholder="비밀번호를 입력해주세요"
          value={pw}
          onChange={onChange}
        />
      </InputDiv>
      <LoginBottonBtn>로그인</LoginBottonBtn>
      <FindIdPw>
        <button onClick={() => navigate("/login/findId")}>아이디 찾기</button>
        <div />
        <button onClick={() => navigate("/login/findPw")}>비밀번호 찾기</button>
      </FindIdPw>
      <JoinBottonBtn onClick={() => navigate("/join")}>
        <div className="normalDiv">보이지가 처음이에요</div>
        <div className="specialDiv">가입하기</div>
      </JoinBottonBtn>
    </MainContainer>
  );
};

export default Login;

const NewLogoImage = styled(LogoImage)`
  margin-top: 126px;
  margin-bottom: 121px;
`;

const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 17px;
  margin-bottom: 42px;
`;

const LoginBottonBtn = styled(BottonBtn)`
  margin-top: 26px;
  background-color: #494949;
`;

const FindIdPw = styled.div`
  display: flex;
  width: 338px;
  justify-content: space-between;
  align-items: center;
  margin-top: 25px;
  button {
    appearance: none;
    border: 0px;
    background-color: transparent;
    color: #494949;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    cursor: pointer;
  }
  div {
    width: 1px;
    height: 33px;
    background: #494949;
  }
`;

const JoinBottonBtn = styled(BottonBtn)`
  margin-top: 63px;
  gap: 17px;
  .normalDiv {
    color: var(---tertiary, #494949);
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  .specialDiv {
    appearance: none;
    border: 0px;
    background-color: transparent;
    color: #60b855;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
`;
