/**
 * Home Component
 * @description Displays a list of employees fetched from an API. Provides options to navigate to employee creation and individual employee details.
 * @returns {React.Component} The main landing page component which lists all employees.
 */

"use client";
import React from "react";
import EmployeeCard from "@/ui/components/EmployeeCard.component";
import Link from "next/link";
import { useGetEmployeeList } from "@/domain/hooks/useEmployee.hook";

export default function Home() {
  const { data, isLoading, isError } = useGetEmployeeList();

  if (isLoading) {
    return (
      <main className="flex h-screen items-center justify-center bg-gray-100">
        <div className="text-xl font-semibold text-gray-800 animate-pulse">
          Loading...
        </div>
      </main>
    );
  }

  if (!data && !isLoading && isError) {
    return (
      <main className="flex h-screen items-center justify-between bg-gray-100">
        <div className="text-xl font-semibold text-red-500 animate-pulse">
          An error occurred while fetching the employees
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-col h-full items-center gap-12 bg-gradient-to-r from-pink-100 via-purple-200 to-blue-200 p-8">
      <h1 className="text-3xl font-bold text-sky-800">
        Employee List {data && <span>({data.length})</span>}
      </h1>
      <Link className="button-gradient" href={`/employee/create`}>
        Create New Employee
      </Link>
      {data && (
        <ul className="flex flex-col gap-2 shrink">
          {data.map((employee) => (
            <li key={employee.id} className="mb-2 last:mb-0">
              <Link href={`/employee/${employee.id}`}>
                <EmployeeCard employee={employee} />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
