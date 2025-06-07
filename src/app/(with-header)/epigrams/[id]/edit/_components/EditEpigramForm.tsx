"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEpigramDetail, useUpdateEpigram } from "@/lib/hooks/useEpigrams";
import {
  UpdateEpigramRequest,
  updateEpigramRequestSchema,
} from "@/lib/types/epigrams";
import { toast } from "react-toastify";
import Input from "@/components/Input";
import Button from "@/components/Button";
import LoadingSpinner from "@/components/LoadingSpinner";
import Image from "next/image";
import close from "@/assets/icons/close.svg";

export default function EditEpigramForm() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);
  const { data: epigramData, isLoading } = useEpigramDetail(id);
  const { mutate } = useUpdateEpigram(id);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<UpdateEpigramRequest>({
    resolver: zodResolver(updateEpigramRequestSchema),
    mode: "onChange",
    defaultValues: {
      content: "",
      author: "",
      referenceTitle: "",
      referenceUrl: "",
      tags: [],
    },
  });

  useEffect(() => {
    if (epigramData) {
      reset({
        content: epigramData.content,
        author: epigramData.author,
        referenceTitle: epigramData.referenceTitle || "",
        referenceUrl: epigramData.referenceUrl || "",
        tags: epigramData.tags?.map((tag) => tag.name) || [],
      });
    }
  }, [epigramData, reset]);

  const tags = watch("tags");
  const [tagInput, setTagInput] = useState("");
  const [tagInputError, setTagInputError] = useState("");

  const updateTags = (newTags: string[]) => {
    setValue("tags", newTags, { shouldValidate: true });
  };

  const onSubmit = (data: UpdateEpigramRequest) => {
    data.referenceTitle = data.referenceTitle || undefined;
    data.referenceUrl = data.referenceUrl || undefined;

    mutate(data, {
      onSuccess: (updatedEpigram) => {
        toast.success("에피그램이 수정되었습니다!");
        router.push(`/epigrams/${updatedEpigram.id}`);
      },
      onError: () => {
        toast.error("수정에 실패했습니다.");
      },
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newTag = e.currentTarget.value.trim();

      if (!newTag) {
        setTagInputError("태그를 입력해 주세요.");
        return;
      }

      if (tags.includes(newTag)) {
        setTagInputError("중복된 태그입니다.");
        return;
      }

      if (newTag.length > 10) {
        setTagInputError("10자 이내로 입력해 주세요.");
        return;
      }

      if (tags.length >= 3) {
        setTagInputError("최대 3개까지 입력할 수 있습니다.");
        return;
      }

      updateTags([...tags, newTag]);
      setTagInput("");
      setTagInputError("");
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <form
      className="space-y-[40px]"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(onSubmit)();
      }}
    >
      <h2 className="text-black-600 font-semibold text-lg lg:text-xl mb-6 lg:mb-10">
        에피그램 수정
      </h2>

      <div>
        <label className="text-blue-900 flex items-center gap-1 text-md lg:text-2lg font-medium mb-4">
          내용
          <span className="pt-1.5 text-lg font-medium text-red-500">*</span>
        </label>
        <textarea
          {...register("content")}
          placeholder="500자 이내로 입력해 주세요."
          rows={5}
          className={`bg-blue-100 placeholder:text-blue-400 px-4 py-[10px] w-full text-md lg:text-lg rounded-xl border focus:outline-2 ${
            errors.content
              ? "border-error-100 focus:outline-error-100"
              : "border-blue-300 hover:border-blue-500 focus:outline-blue-500"
          }`}
        />
        {errors.content && (
          <p className="text-error-100 text-sm lg:text-md">
            {errors.content.message}
          </p>
        )}
      </div>

      <Input
        label="저자"
        required
        whiteBg
        placeholder="저자 이름 입력"
        {...register("author")}
        error={errors.author?.message}
      />

      <div>
        <Input
          label="출처"
          whiteBg
          placeholder="출처 제목 입력"
          {...register("referenceTitle")}
        />
        <Input
          whiteBg
          placeholder="URL (ex. https://www.website.com)"
          {...register("referenceUrl")}
        />
      </div>

      <div>
        <label className="text-blue-900 flex items-center gap-1 text-md lg:text-2lg font-medium">
          태그
          <span className="pt-1.5 text-lg font-medium text-red-500">*</span>
        </label>
        <Input
          whiteBg
          placeholder="입력하여 태그 작성 (최대 10자)"
          onKeyDown={handleKeyDown}
          onChange={(e) => {
            setTagInput(e.target.value);
            setTagInputError("");
          }}
          value={tagInput}
          error={tagInputError || errors.tags?.message}
        />

        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <div key={index} className="flex gap-2 items-center mt-4">
              <span className="text-md lg:text-lg bg-blue-200 rounded-xl px-2 py-1 text-black-300">
                {tag}

                <Image
                  src={close}
                  alt="태그 삭제 아이콘"
                  width={14}
                  height={14}
                  className="inline-block ml-1 cursor-pointer pb-0.5"
                  onClick={() => updateTags(tags.filter((_, i) => i !== index))}
                />
              </span>
            </div>
          ))}
        </div>
      </div>

      <Button
        type="submit"
        size="xl"
        disabled={!isValid}
        className="w-full mt-16 mb-8 lg:mb-30"
      >
        수정 완료
      </Button>
    </form>
  );
}
