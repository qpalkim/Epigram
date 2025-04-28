import type { Meta, StoryObj } from "@storybook/react";
import { Pretendard } from "@/font";
import Input from "@/components/Input";

const meta: Meta<typeof Input> = {
  title: "Input",
  component: Input,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className={Pretendard.className}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    label: "이메일",
    placeholder: "이메일",
  },
};

export const Error: Story = {
  args: {
    placeholder: "비밀번호 확인",
    error: "비밀번호가 일치하지 않습니다.",
  },
};

export const WhiteBackground: Story = {
  args: {
    label: "저자",
    placeholder: "저자 이름 입력",
    whiteBg: true,
    required: true,
  },
};
