import Image from "next/image";

export const metadata = {
  title: "Ortex Login Page",
  description: "Login page for Ortex.com",
  manifest: "/manifest.json", 
};

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8">
        <Image
          src="/icons/icon-512x512.png" 
          alt="Ortex logo"
          width={180}
          height={38}
          priority
        />
        <h1 className="text-xl">Bienvenido a Ortex</h1>
      </main>
    </div>
  );
}


