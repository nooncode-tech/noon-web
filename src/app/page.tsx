import Link from "next/link";
import { ChevronRight } from "lucide-react";


export default function Home() {
  return (
    <main className="flex min-h-screen px-24">

      {/* Hero Section */}
      <div className="min-h-[800px] h-screen w-full flex flex-col items-center justify-end">
        <div className="h-[70vh] w-full flex justify-top items-center flex-col">

          <h1 className="text-4xl font-bold Riosark text-white max-w-[900px]">We boost your vision with digital innovation</h1>

          <div className="relative mt-9">
            <Link
              href="/"
              className="principal-button flex gap-3 justify-center items-center"
            >
              <span>Anyways</span>
              <span className="flex border border-white-900 rounded-full p-1">
                <ChevronRight className="size-6 text-white" />
              </span>
            </Link>
          </div>

          {/* Semi-Arc */}

          <div className="relative w-full flex justify-center items-center mt-10" style={{ minHeight: '200px' }}>
            <div className="elipse-hero">

            </div>
          </div>


        </div>
      </div>
    </main>
  );
}
