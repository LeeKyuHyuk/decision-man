import * as React from "react";
import { useLocation } from "react-router-dom";
import { Button, Space } from "antd";
import Header from "./component/Header";
import styled from "styled-components";
import { Decision } from "./globalTypes";

const RetryButton = styled(Button)`
  width: 100%;
  max-width: 640px;
  margin-top: 100px;
  margin-bottom: 25px;
`;

const MessageBox = styled.section`
  font-family: "Helvetica Neue";
  font-weight: 400;
  text-align: left;
  max-width: 450px;
  margin: 50px auto;
`;

const MessageFromMe = styled.div`
  max-width: 255px;
  word-wrap: break-word;
  margin-bottom: 20px;
  line-height: 24px;
  position: relative;
  padding: 10px 20px;
  color: #fff;
  background: #0b93f6;
  border-radius: 25px;
  float: right;
  &:before {
    content: "";
    position: absolute;
    z-index: -1;
    bottom: -2px;
    right: -7px;
    height: 20px;
    border-right: 20px solid #0b93f6;
    border-bottom-left-radius: 16px 14px;
    -webkit-transform: translate(0, -2px);
  }
  &:after {
    content: "";
    position: absolute;
    z-index: 1;
    bottom: -2px;
    right: -56px;
    width: 26px;
    height: 20px;
    background: #fff;
    border-bottom-left-radius: 10px;
    -webkit-transform: translate(-30px, -2px);
  }
`;

const MessageFromThem = styled.div`
  max-width: 255px;
  word-wrap: break-word;
  margin-bottom: 20px;
  line-height: 24px;
  position: relative;
  padding: 10px 20px;
  background: #e5e5ea;
  border-radius: 25px;
  color: #000;
  float: left;
  &:before {
    content: "";
    position: absolute;
    z-index: 2;
    bottom: -2px;
    left: -7px;
    height: 20px;
    border-left: 20px solid #e5e5ea;
    border-bottom-right-radius: 16px 14px;
    -webkit-transform: translate(0, -2px);
  }
  &:after {
    content: "";
    position: absolute;
    z-index: 3;
    bottom: -2px;
    left: 4px;
    width: 26px;
    height: 20px;
    background: #fff;
    border-bottom-right-radius: 10px;
    -webkit-transform: translate(-30px, -2px);
  }
`;

const MeesageText = styled.p`
  margin: auto;
  font-size: 16px;
`;

const Clear = styled.div`
  clear: both;
`;

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function base64Decode(input: string): string {
  return decodeURIComponent(atob(input));
}

function Result() {
  const data: Decision = JSON.parse(base64Decode(useQuery().get("id")));

  return (
    <div style={{ textAlign: "center", padding: "10px 10%" }}>
      <Space style={{ width: "100%", maxWidth: "640px" }} direction="vertical">
        <Header />
        <MessageBox>
          <MessageFromMe>
            <MeesageText>정맨아 뭐해?</MeesageText>
          </MessageFromMe>
          <Clear />
          <MessageFromThem>
            <MeesageText>왜?</MeesageText>
          </MessageFromThem>
          <Clear />
          <MessageFromMe>
            <MeesageText id="question-message">{data.question}</MeesageText>
          </MessageFromMe>
          <Clear />
          <MessageFromThem>
            <MeesageText id="answer-message">
              {data.choice[data.date % data.choice.length]}
            </MeesageText>
          </MessageFromThem>
          <Clear />
          <MessageFromMe>
            <MeesageText id="from-me-3">
              ㅋㅋㅋ 역시 너밖에 없다! 고마워!
            </MeesageText>
          </MessageFromMe>
        </MessageBox>
        <RetryButton
          type="primary"
          size="large"
          danger
          href="https://kyuhyuk.kr/decision-man/"
        >
          다시하기
        </RetryButton>
      </Space>
    </div>
  );
}

export default Result;
