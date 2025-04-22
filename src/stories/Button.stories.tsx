import type { Meta, StoryObj } from "@storybook/react";
import { Pretendard } from "@/font";
import Image from "next/image";
import Button from "@/components/Button";
import plus from "@/assets/icons/plus.svg";
import plusWhite from "@/assets/icons/plus-white.svg";
import chevronUpWhite from "@/assets/icons/chevron-up-white.svg";
import like from "@/assets/icons/like.svg";
import externalLink from "@/assets/icons/external-link.svg";

const meta: Meta<typeof Button> = {
  title: "Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "radio",
      options: ["primary", "outline", "secondary", "tertiary", "reference"],
    },
    disabled: { control: "boolean" },
    onClick: { action: "clicked" },
  },
  decorators: [
    (Story) => (
      <div className={Pretendard.className}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: "시작하기",
    variant: "primary",
    size: "xl",
    className: "w-[286px]",
  },
};

export const Wide: Story = {
  args: {
    children: "가입하기",
    variant: "primary",
    size: "xl",
    className: "w-[640px]",
  },
};

export const Outline: Story = {
  render: (args) => (
    <Button {...args}>
      <Image
        src={plus}
        alt="더보기 아이콘"
        width={20}
        height={20}
        className="mr-2"
      />
      에피그램 더보기
    </Button>
  ),
  args: {
    variant: "outline",
    disabled: false,
    isRoundedFull: true,
    size: "lg",
    className: "w-[238px]",
  },
};

export const Secondary: Story = {
  render: (args) => (
    <Button {...args}>
      <Image
        src={plusWhite}
        alt="더하기 아이콘"
        width={24}
        height={24}
        className="mr-1"
      />
      에피그램 만들기
    </Button>
  ),
  args: {
    variant: "secondary",
    disabled: false,
    isRoundedFull: true,
    size: "xl",
    className: "w-[145px] lg:w-[194px] text-md",
  },
};

export const SecondaryIcon: Story = {
  render: (args) => (
    <Button {...args}>
      <Image src={chevronUpWhite} alt="더하기 아이콘" width={24} height={24} />
    </Button>
  ),
  args: {
    variant: "secondary",
    disabled: false,
    isRoundedFull: true,
    size: "xl",
    className: "w-[48px] lg:w-[64px] p-0",
  },
};

export const PrimaryIcon: Story = {
  render: (args) => (
    <Button {...args}>
      <Image
        src={like}
        alt="좋아요 아이콘"
        className="mr-1 w-[20px] h-[20px] lg:w-[36px] lg:h-[36px]"
      />
      123
    </Button>
  ),
  args: {
    variant: "primary",
    disabled: false,
    isRoundedFull: true,
    size: "md",
  },
};

export const ReferenceIcon: Story = {
  render: (args) => (
    <Button {...args}>
      왕도로 가는길
      <Image
        src={externalLink}
        alt="링크 아이콘"
        className="ml-[5px] w-[20px] h-[20px] lg:w-[36px] lg:h-[36px]"
      />
    </Button>
  ),
  args: {
    variant: "reference",
    disabled: false,
    isRoundedFull: true,
    size: "md",
  },
};

export const Tertiary: Story = {
  args: {
    children: "#나아가야할때",
    variant: "tertiary",
    size: "lg",
  },
};

export const PrimarySmall: Story = {
  args: {
    children: "저장",
    variant: "primary",
    size: "sm",
  },
};
