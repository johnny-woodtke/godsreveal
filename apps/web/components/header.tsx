import { ModeToggle } from "@/components/theme-provider";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-screen border-b bg-opacity-50 backdrop-blur-sm">
      <div className="mx-auto flex h-full max-w-screen-lg items-center justify-between p-4">
        <h1 className="text-3xl font-bold">God's Reveal</h1>
        <ModeToggle />
      </div>
    </header>
  );
}
