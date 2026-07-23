"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export function LikeButton({ kind, id, initialCount }: { kind: "blog" | "story"; id: string; initialCount: number }) {
  const [count, setCount] = useState(initialCount);
  const [liked, setLiked] = useState(false);
  const storageKey = `liked:${kind}:${id}`;

  useEffect(() => {
    // Soft, browser-only check so the same visitor can't spam the button.
    // Not account-based — clearing browser storage resets it, which is fine for this use case.
    if (typeof window !== "undefined" && window.localStorage.getItem(storageKey)) {
      setLiked(true);
    }
  }, [storageKey]);

  async function handleLike() {
    if (liked) return;
    setLiked(true);
    setCount((c) => c + 1);
    window.localStorage.setItem(storageKey, "1");

    const supabase = createClient();
    const rpcName = kind === "blog" ? "increment_blog_likes" : "increment_story_likes";
    const paramName = kind === "blog" ? "blog_id" : "story_id";
    const { data, error } = await supabase.rpc(rpcName, { [paramName]: id });
    if (!error && typeof data === "number") {
      setCount(data); // reconcile with the real server count
    }
  }

  return (
    <button
      onClick={handleLike}
      disabled={liked}
      aria-label={liked ? "Liked" : "Like this post"}
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${
        liked
          ? "border-moss-500 bg-moss-100 text-moss-700"
          : "border-canopy-200 text-canopy-700 hover:border-moss-500 hover:text-moss-700 dark:border-canopy-600 dark:text-paper"
      }`}
    >
      <Heart size={16} className={liked ? "fill-moss-600 text-moss-600" : ""} />
      {count}
    </button>
  );
}
