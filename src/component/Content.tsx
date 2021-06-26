import * as React from "react";
import { Typography, Space } from "antd";
import QuestionForm from "./QuestionForm";

const { Text } = Typography;

function Content() {
  return (
    <Space direction="vertical">
      <img
        style={{ width: "100%" }}
        src="https://kyuhyuk.kr/decision-man/images/changsuyug.jpg"
        alt="도와줘요 결정맨!"
      />
      <Text>아래에 내용을 입력하면 당신의 선택을 도와드립니다.</Text>
      <Text type="secondary">
        결정맨의 잘못된 선택으로
        <br />
        문제가 생겼을 경우 책임지지 않습니다.
      </Text>
      <QuestionForm />
    </Space>
  );
}

export default Content;
