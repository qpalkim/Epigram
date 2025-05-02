import { Meta, StoryObj } from "@storybook/react";
import ProfileImage from "@/components/ProfileImage";

const meta: Meta<typeof ProfileImage> = {
  title: "ProfileImage",
  component: ProfileImage,
  tags: ["autodocs"],
  argTypes: {
    onClick: { action: "clicked" },
  },
};

export default meta;
type Story = StoryObj<typeof ProfileImage>;

export const Small: Story = {
  args: {
    size: "small",
    clickable: false,
  },
};

export const Medium: Story = {
  args: {
    size: "medium",
    clickable: false,
  },
};

export const Large: Story = {
  args: {
    src: null,
    size: "large",
    clickable: true,
  },
};
