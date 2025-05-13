import { notFound } from "next/navigation";
import EpigramDetail from "./_components/EpigramDetail";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (isNaN(Number(id))) notFound();

  return <EpigramDetail id={Number(id)} />;
}
