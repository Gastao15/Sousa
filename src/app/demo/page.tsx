"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { strings } from "@/lib/i18n/strings";
import { startDemoSession } from "@/lib/utils/demoSession";

export default function DemoEntryPage() {
  const router = useRouter();
  const [name, setName] = useState("");

  function handleStart(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    startDemoSession(name);
    router.push("/demo/painel");
  }

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <h1 className="text-2xl font-bold text-brand-800">
        {strings.demoEntry.title}
      </h1>
      <p className="mt-1 text-sm text-brand-600">
        {strings.demoEntry.subtitle}
      </p>

      <form onSubmit={handleStart} className="mt-6 flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="demo-name" className="text-sm font-medium text-brand-700">
            {strings.demoEntry.nameLabel}
          </label>
          <input
            id="demo-name"
            name="demo-name"
            type="text"
            placeholder={strings.demoEntry.namePlaceholder}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-md border border-brand-200 bg-white px-3 py-2 text-sm"
          />
        </div>
        <button
          type="submit"
          className="rounded-md bg-brand-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-600"
        >
          {strings.demoEntry.startButton}
        </button>
      </form>

      <p className="mt-4 text-xs text-brand-500">{strings.demoEntry.note}</p>
    </div>
  );
}
