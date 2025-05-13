import { notFound } from "next/navigation";
import EpigramDetail from "./_components/EpigramDetail";

export default async function Page({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (isNaN(id)) notFound();

  return <EpigramDetail id={id} />;
}
