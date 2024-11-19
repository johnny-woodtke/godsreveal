import ClientButton from "@/components/client-button";
import ClientMessage from "@/components/client-message";
import { client } from "@/lib/eden";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { data: message } = await client.index.get();

  return (
    <div className="mx-auto flex w-full flex-col gap-4 sm:w-1/2 lg:w-1/4">
      <h1 className="text-2xl font-bold">Eden</h1>
      <p>Server message: {message ?? "No message from server!!"}</p>
      <ClientMessage />
      <ClientButton />
    </div>
  );
}
