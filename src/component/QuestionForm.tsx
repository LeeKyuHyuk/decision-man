import * as React from "react";
import { Typography, Space, Form, Input, message, Button } from "antd";
import styled from "styled-components";
import { Decision } from "../globalTypes";

declare global {
  interface Window {
    Kakao: any;
  }
}

const { Text } = Typography;

const FormItem = styled(Form.Item)`
  margin-bottom: 0px;
`;

const FormList = styled(Form.List)`
  margin-bottom: 0px;
`;

const DecisionInput = styled(Input)`
  width: 100%;
  max-width: 640px;
`;

function base64Encode(input: string): string {
  return btoa(encodeURIComponent(input));
}

function QuestionForm() {
  const [data, setData] = React.useState<Decision>(undefined);

  React.useEffect(() => {
    if (data) {
      window.Kakao.Link.createDefaultButton({
        objectType: "feed",
        container: "#sendKakao",
        content: {
          title: "결정맨 - " + data?.question,
          description:
            "📋 선택 항목 : " +
            data?.choice.join(", ") +
            "\n결과를 확인하시려면 '결과 보기' 버튼을 눌러주세요! 🤓",
          imageUrl: "https://kyuhyuk.kr/decision-man/images/changsuyug.jpg",
          link: {
            mobileWebUrl:
              "https://kyuhyuk.kr/decision-man/#result?id=" +
              base64Encode(JSON.stringify(data)),
            webUrl:
              "https://kyuhyuk.kr/decision-man/#result?id=" +
              base64Encode(JSON.stringify(data)),
          },
        },
        buttons: [
          {
            title: "결과 보기",
            link: {
              mobileWebUrl:
                "https://kyuhyuk.kr/decision-man/#result?id=" +
                base64Encode(JSON.stringify(data)),
              webUrl:
                "https://kyuhyuk.kr/decision-man/#result?id=" +
                base64Encode(JSON.stringify(data)),
            },
          },
        ],
        installTalk: true,
      });
      setTimeout(() => {
        document.getElementById("sendKakao").click();
        message.success("결정맨에게 물어봤어요!");
        setTimeout(() => {
          location.reload();
        }, 4500);
      }, 500);
    } else {
      window.Kakao.init("e147750af1b59d44c7d163e47c716a63");
    }
  }, [data]);

  function onFinish(values: any) {
    const choice: string[] = [values.defaultOption1, values.defaultOption2];
    if (values.additionOption) {
      for (let index = 0; index < values.additionOption.length; index++) {
        choice.push(values.additionOption[index].option);
      }
    }
    setData({
      date: Date.now(),
      question: values.question,
      choice,
    });
  }

  return (
    <Form
      name="decision"
      onFinish={onFinish}
      onFinishFailed={() => message.error("빈칸을 모두 채워주세요😀")}
    >
      <Space style={{ width: "100%", maxWidth: "640px" }} direction="vertical">
        <Text strong>무엇을 물어볼까요?</Text>
        <FormItem
          name="question"
          rules={[
            { required: true, message: "결정맨에게 물어볼것을 적어주세요." },
          ]}
        >
          <DecisionInput placeholder="예) 탕수육 먹을래? 깐풍육 먹을래?" />
        </FormItem>
        <Text strong>선택 항목을 입력해주세요.</Text>
        <FormItem
          name="defaultOption1"
          rules={[
            { required: true, message: "결정맨이 선택할 항목을 적어주세요." },
          ]}
        >
          <DecisionInput placeholder="예) 탕수육" />
        </FormItem>
        <FormItem
          name="defaultOption2"
          rules={[
            { required: true, message: "결정맨이 선택할 항목을 적어주세요." },
          ]}
        >
          <DecisionInput placeholder="예) 깐풍육" />
        </FormItem>
        <FormList name="additionOption">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, fieldKey, ...restField }) => (
                // <Space key={key} style={{ display: "flex" }} align="baseline">
                <div key={key} style={{ marginBottom: 8 }}>
                  <FormItem
                    {...restField}
                    name={[name, "option"]}
                    fieldKey={[fieldKey, "option"]}
                    rules={[
                      {
                        required: true,
                        message: "결정맨이 선택할 항목을 적어주세요.",
                      },
                    ]}
                  >
                    <DecisionInput placeholder="추가한 항목의 내용을 입력해주세요." />
                  </FormItem>
                </div>
                // </Space>
              ))}
              <FormItem>
                <Button onClick={() => add()} size="large" block>
                  선택 항목 추가
                </Button>
              </FormItem>
            </>
          )}
        </FormList>
        <FormItem>
          <Button
            id="sendKakao"
            type="primary"
            size="large"
            htmlType="submit"
            block
          >
            결정해줘!
          </Button>
        </FormItem>
      </Space>
      <div style={{ display: "none" }} id="hidden" />
    </Form>
  );
}

export default QuestionForm;
