import { BarChart3 } from "lucide-react";
import { ProgressBar } from "@/components/settings/ProgressBar";

export const ProgressSection = ({
  userProgress,
}: {
  userProgress: { completedLessons: number; totalLessons: number } | null;
}) => {
  console.log(userProgress);

  if (!userProgress) return <div>Błąd podczas pobierania danych</div>;

  return (
    <section>
      <div className="mb-4 flex items-center gap-2">
        <BarChart3 className="h-5 w-5 text-gray-600" />
        <h2 className="text-xl font-bold">Twój postęp</h2>
      </div>

      <div className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-6 md:gap-5">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">Ukończone lekcje</p>
          <p className="text-sm font-bold text-black">
            {userProgress.completedLessons} / {userProgress.totalLessons}
          </p>
        </div>
        <div>
          <ProgressBar
            value={
              (userProgress.completedLessons / userProgress.totalLessons) * 100
            }
          />
        </div>
      </div>
    </section>
  );
};
