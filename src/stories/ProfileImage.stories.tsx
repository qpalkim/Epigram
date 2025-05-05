import { Meta, StoryObj } from "@storybook/react";
import ProfileImage from "@/components/ProfileImage";

const meta: Meta<typeof ProfileImage> = {
  title: "ProfileImage",
  component: ProfileImage,
  tags: ["autodocs"],
  argTypes: {
    src: { control: "text" },
    size: { control: "radio", options: ["sm", "md", "lg"] },
    onClick: { action: "clicked" },
  },
};

export default meta;
type Story = StoryObj<typeof ProfileImage>;

export const Small: Story = {
  args: {
    size: "sm",
    clickable: false,
  },
};

export const Medium: Story = {
  args: {
    size: "md",
    clickable: false,
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    clickable: true,
  },
};
