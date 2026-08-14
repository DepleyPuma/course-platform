import { getUserProgress } from "@/actions";
import { User } from "@/utils/types";
import React from "react";
import { ResetPasswordButton } from "@/components/admin/ResetPasswordButton";
import { ErrorTableRow } from "@/components/ui/error-table-row";
import { Crown, User as UserIcon } from "lucide-react";

type UsersSectionTypeProps = {
  users: User[];
};

export async function UsersSection({ users }: UsersSectionTypeProps) {
  const rows = await Promise.all(
    users.map(async (user) => {
      const progress = await getUserProgress(user.id);
      return { user, progress };
    }),
  );

  return (
    <div className="rounded-lg border border-gray-200 bg-white">
      <div className="border-b border-gray-200 p-6">
        <h2 className="text-xl font-bold">Postępy strażaków</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Imię i nazwisko
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Rola
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Ukończone
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Postęp
              </th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">
                Akcje
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {rows.map(({ user, progress }) => {
              if (!progress.success) {
                return (
                  <ErrorTableRow key={user.id} colSpan={5}>
                    Błąd podczas pobierania danych o użytkowniku{" "}
                    {user.firstname} {user.lastname}
                  </ErrorTableRow>
                );
              }

              const progressData = progress.data;
              const percent =
                progressData.totalLessons > 0
                  ? (progressData.completedLessons /
                      progressData.totalLessons) *
                    100
                  : 0;

              return (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900">
                        {user.firstname} {user.lastname}
                      </p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {user.role === "admin" ? (
                        <>
                          <Crown className="h-4 w-4 text-yellow-600" />
                          <span className="text-sm font-medium text-gray-900">
                            Admin
                          </span>
                        </>
                      ) : (
                        <>
                          <UserIcon className="h-4 w-4 text-gray-600" />
                          <span className="text-sm text-gray-700">User</span>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {progressData.completedLessons}/{progressData.totalLessons}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-2 max-w-[200px] flex-1 rounded-full bg-gray-200">
                        <div
                          className="h-2 rounded-full bg-[#BBCB2E] transition-all"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                      <span className="min-w-[45px] text-sm font-medium text-gray-600">
                        {percent.toFixed(0)}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <ResetPasswordButton email={user.email} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
