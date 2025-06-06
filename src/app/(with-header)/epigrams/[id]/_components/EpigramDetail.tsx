"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDeleteEpigram } from "@/lib/hooks/useEpigrams";
import { EpigramDetailResponse } from "@/lib/types/epigrams";
import { UserResponse } from "@/lib/types/users";
import { toast } from "react-toastify";
import BackgroundLines from "@/components/BackgroundLines";
import Button from "@/components/Button";
import Dropdown from "@/components/Dropdown";
import Modal from "@/components/Modal";
import DeleteItemModal from "@/components/DeleteItemModal";
import Image from "next/image";
import share from "@/assets/icons/share.svg";
import externalLink from "@/assets/icons/external-link.svg";
import tornPaper from "@/assets/images/torn-paper.svg";

type EpigramDetailProps = {
  epigramDetail: EpigramDetailResponse;
  user?: UserResponse;
};

export default function EpigramDetail({
  epigramDetail,
  user,
}: EpigramDetailProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const deleteEpigram = useDeleteEpigram();

  const isMineEpigram = user?.id === epigramDetail?.writerId;

  const handleDelete = () => {
    deleteEpigram.mutate(epigramDetail.id, {
      onSuccess: () => {
        setIsModalOpen(false);
        router.replace("/epigrams");
      },
    });
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      toast.success("링크가 복사되었습니다.");
    });
  };

  return (
    <>
      <section className="relative bg-blue-100 h-auto">
        <BackgroundLines />
        <div className="relative w-full max-w-[640px] mx-auto max-[1250px]:px-4 min-[1251px]:px-0 py-10 z-40">
          <div className="flex justify-between">
            <div>
              {epigramDetail.tags.map((tag) => (
                <button
                  className="text-blue-400 cursor-pointer"
                  key={tag.id}
                  onClick={() =>
                    router.push(`/search?limit=4&keyword=${tag.name}`)
                  }
                >
                  #{tag.name}&nbsp;
                </button>
              ))}
            </div>
            {isMineEpigram && (
              <Dropdown
                options={[
                  {
                    label: "수정하기",
                    onClick: () => {
                      router.push(`/epigrams/${epigramDetail.id}/edit`);
                    },
                  },
                  {
                    label: "삭제하기",
                    onClick: () => {
                      setIsModalOpen(true);
                    },
                  },
                ]}
              />
            )}
          </div>
          <h1 className="font-iropke text-black-700 font-medium text-2lg md:text-xl mt-4 md:mt-6">
            {epigramDetail?.content}
          </h1>
          <p className="font-iropke text-lg lg:text-2lg text-blue-400 mt-4 text-right">
            - {epigramDetail?.author} -
          </p>
          <div className="flex justify-center mt-8 gap-2 z-10">
            <Button
              isRoundedFull
              size="md"
              className="px-4"
              onClick={handleCopyLink}
            >
              <Image
                src={share}
                width={14}
                height={14}
                alt="좋아요 아이콘"
                className="mr-2"
              />
              링크 복사
            </Button>

            {epigramDetail?.referenceUrl && (
              <Button
                variant="reference"
                size="md"
                isRoundedFull
                href={epigramDetail?.referenceUrl}
                target="_blank"
              >
                {epigramDetail?.referenceTitle}
                <Image
                  src={externalLink}
                  width={24}
                  height={24}
                  alt="출처 이동"
                />
              </Button>
            )}
          </div>
        </div>
      </section>
      <div
        className="absolute w-full h-[15px] bg-repeat-x z-10"
        style={{
          backgroundImage: `url(${tornPaper.src})`,
          backgroundSize: "auto 100%",
          filter: "drop-shadow(0px 3px 3px rgba(0,0,0,0.08))",
        }}
      />

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <DeleteItemModal
            isComment={false}
            onCancel={() => setIsModalOpen(false)}
            onDelete={handleDelete}
          />
        </Modal>
      )}
    </>
  );
}
