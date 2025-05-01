import type { Meta, StoryObj } from "@storybook/react";
import { IropkeBatang } from "@/font";
import EpigramItem from "@/components/EpigramItem";

const meta: Meta<typeof EpigramItem> = {
  title: "EpigramItem",
  component: EpigramItem,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className={IropkeBatang.className}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof EpigramItem>;

export const Default: Story = {
  args: {
    content: "오랫동안 꿈을 그리는 사람은 마침내 그 꿈을 닮아 간다.",
    author: "앙드레 말로",
    tags: [
      { id: 1, name: "나아가야할때" },
      { id: 2, name: "꿈을이루고싶을때" },
    ],
  },
};

export const FeedPage: Story = {
  args: {
    content:
      "이 세상에는 위대한 진실이 하나 있어. 무언가를 온 마음을 다해 원한다면, 반드시 그렇게 된다는 거야. 무언가를 바라는 마음은 곧 우주의 마음으로부터 비롯된 것이기 때문이지",
    author: "파울로 코엘료",
    tags: [
      { id: 1, name: "나아가야할때" },
      { id: 2, name: "꿈을이루고싶을때" },
    ],
    isFeedPage: true,
  },
};
