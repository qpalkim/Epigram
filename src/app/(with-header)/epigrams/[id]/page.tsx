import { notFound } from "next/navigation";
import { safeResponse } from "@/lib/network/safeResponse";
import { epigramDetailResponseSchema } from "@/lib/types/epigrams";
import axiosServerHelper from "@/lib/network/axiosServerHelper";
import EpigramContainer from "./_components/EpigramContainer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const parsedId = Number(id);
  if (isNaN(parsedId)) notFound();

  try {
    const response = await axiosServerHelper(`/epigrams/${parsedId}`);
    const epigramDetail = safeResponse(
      response.data,
      epigramDetailResponseSchema
    );

    return {
      title: `${epigramDetail.content.slice(0, 20)}... | Epigram`,
      description: `“${epigramDetail.content}” - ${epigramDetail.author}`,
      openGraph: {
        type: "article",
        title: `${epigramDetail.content.slice(0, 20)}... | Epigram`,
        description: `“${epigramDetail.content}” - ${epigramDetail.author}`,
        url: `https://epigram-sand.vercel.app/epigrams/${parsedId}`,
        images: [
          {
            url: "/thumbnail.jpg",
            width: 800,
            height: 600,
            alt: "Epigram 배너",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: `${epigramDetail.content.slice(0, 20)}... | Epigram`,
        description: `“${epigramDetail.content}” - ${epigramDetail.author}`,
        images: ["/thumbnail.jpg"],
      },
    };
  } catch {
    notFound();
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const parsedId = Number(id);
  if (isNaN(parsedId)) notFound();

  return <EpigramContainer id={parsedId} />;
}
