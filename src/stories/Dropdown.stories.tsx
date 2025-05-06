import type { Meta, StoryObj } from "@storybook/react";
import { Pretendard } from "@/font";
import Dropdown from "@/components/Dropdown";

const meta: Meta<typeof Dropdown> = {
  title: "Dropdown",
  component: Dropdown,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className={`ml-40 ${Pretendard.className}`}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

export const Default: Story = {
  args: {
    options: [
      { label: "수정하기", onClick: () => {} },
      { label: "삭제하기", onClick: () => {} },
    ],
  },
};
