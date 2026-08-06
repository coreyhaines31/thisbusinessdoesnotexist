"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

export function ShuffleButton({ slugs, current }: { slugs: string[]; current: string }) {
  const router = useRouter();
  const shuffle = useCallback(() => {
    const pool = slugs.filter((s) => s !== current);
    const next = pool[Math.floor(Math.random() * pool.length)];
    router.push(`/c/${next}`);
  }, [slugs, current, router]);

  return (
    <button
      onClick={shuffle}
      className="cursor-pointer rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-neutral-900 transition-transform hover:scale-105 active:scale-95"
    >
      ↻ Another one
    </button>
  );
}
