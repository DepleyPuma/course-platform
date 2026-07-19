import { goBackToFirstLesson } from "@/actions";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import Link from "next/link";

async function HomePage() {
  const results = await goBackToFirstLesson();

  if (!results.success) return;

  const href = results.data;

  return (
    <div className="flex flex-col items-center justify-center px-6 py-24 md:py-32">
      <div className="mb-12">
        <Logo heigth={128} width={128} />
      </div>

      <h1 className="mb-8 text-center text-4xl font-bold text-black md:text-6xl">
        Szkolenie Online
        <br />
        OSP Marki
      </h1>

      <p className="mb-12 max-w-2xl text-center text-lg text-gray-600">
        Praktyczne umiejętności, które wniosą twoje umiejętności poziom wyżej
      </p>

      <Link href={href!}>
        <Button
          size="lg"
          className="cursor-pointer bg-(--second-color) px-8 py-6 text-lg font-semibold text-black hover:bg-(--second-color-hover)"
        >
          Zacznij teraz
        </Button>
      </Link>
    </div>
  );
}

export default HomePage;
