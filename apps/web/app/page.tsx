import ClientMessage from "@/components/client-message";
import { client } from "@/lib/eden";
import ClientButton from "@/components/client-button";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { data } = await client.index.get();

  return (
    <div className="flex w-[50%] flex-col gap-4 mx-auto">
      <h1 className="text-2xl font-bold">Eden</h1>
      <p>Server message: {data ?? "No message"}</p>
      <ClientMessage />
      <ClientButton />
    </div>
  );
}
