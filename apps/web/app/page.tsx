import ClientMessage from "@/components/client-message";
import ClientButton from "@/components/client-button";
import { client } from "@/lib/eden";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { data: message } = await client.index.get();

  return (
    <div className="flex w-full sm:w-1/2 lg:w-1/4 flex-col gap-4 mx-auto">
      <h1 className="text-2xl font-bold">Eden</h1>
      <p>Server message: {message ?? "No message from server!!"}</p>
      <ClientMessage />
      <ClientButton />
    </div>
  );
}
