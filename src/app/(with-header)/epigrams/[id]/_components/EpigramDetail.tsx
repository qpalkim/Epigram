"use client";
import { useState } from "react";
import { notFound, useRouter } from "next/navigation";
import { useDeleteEpigram, useEpigramDetail } from "@/lib/hooks/useEpigrams";
import { useMyData } from "@/lib/hooks/useUsers";
import Image from "next/image";
import like from "@/assets/icons/like.svg";
import externalLink from "@/assets/icons/external-link.svg";
import tornPaper from "@/assets/images/torn-paper.svg";
import BackgroundLines from "@/components/BackgroundLines";
import Button from "@/components/Button";
import Dropdown from "@/components/Dropdown";
import LoadingSpinner from "@/components/LoadingSpinner";
import Modal from "@/components/Modal";
import DeleteItemModal from "@/components/DeleteItemModal";

export default function EpigramDetail({ id }: { id: number }) {
  const { data: epigramDetail, isLoading, isError } = useEpigramDetail(id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const deleteEpigram = useDeleteEpigram();
  const { data: user } = useMyData();

  const isMineEpigram = user?.id === epigramDetail?.writerId;

  const handleDelete = () => {
    deleteEpigram.mutate(id, {
      onSuccess: () => {
        setIsModalOpen(false);
        router.push("/epigrams");
      },
    });
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError) return notFound();

  return (
    <>
      <section className="relative bg-blue-100 h-auto">
        <BackgroundLines />
        <div className="relative w-full max-w-[640px] mx-auto max-[1250px]:px-4 min-[1251px]:px-0 py-10 z-40">
          <div className="flex justify-between">
            <div>
              {epigramDetail?.tags.map((tag) => (
                <span className="text-blue-400" key={tag.id}>
                  #{tag.name}&nbsp;
                </span>
              ))}
            </div>
            {isMineEpigram && (
              <Dropdown
                options={[
                  {
                    label: "수정하기",
                    onClick: () => {
                      router.push(`/epigrams/${id}/edit`);
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
            <Button isRoundedFull size="md" className="px-4" onClick={() => {}}>
              <Image
                src={like}
                width={20}
                height={20}
                alt="좋아요 아이콘"
                className="mr-1"
              />
              {epigramDetail?.likeCount}
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
                  width={20}
                  height={20}
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
