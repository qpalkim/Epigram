import type { Meta, StoryObj } from "@storybook/react";
import { Pretendard } from "@/font";
import SelectOption from "@/components/SelectOption";

const meta: Meta<typeof SelectOption> = {
  title: "SelectOption",
  component: SelectOption,
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
type Story = StoryObj<typeof SelectOption>;

export const Default: Story = {
  args: {
    options: [
      { label: "필터", onClick: () => {} },
      { label: "감동", onClick: () => {} },
      { label: "기쁨", onClick: () => {} },
      { label: "고민", onClick: () => {} },
      { label: "슬픔", onClick: () => {} },
      { label: "분노", onClick: () => {} },
    ],
  },
};
