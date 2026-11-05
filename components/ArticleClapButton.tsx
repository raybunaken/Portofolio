"use client";

import React, { useState } from "react";
import { Heart } from "lucide-react";

interface ArticleClapButtonProps {
  articleId: string;
  initialClaps: number;
}

export default function ArticleClapButton({
  articleId,
  initialClaps,
}: ArticleClapButtonProps) {
  const [claps, setClaps] = useState(initialClaps);
  const [animating, setAnimating] = useState(false);

  const handleClick = async () => {
    setClaps((prev) => prev + 1);
    setAnimating(true);
    setTimeout(() => setAnimating(false), 500);

    try {
      await fetch(`/api/articles/${articleId}/clap`, { method: "POST" });
    } catch {
      // ignore
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-full border border-rose-200 text-xs font-bold transition-all cursor-pointer ${
        claps > initialClaps
          ? "bg-rose-50 text-rose-600 scale-105 border-rose-300"
          : "bg-white text-slate-700 hover:bg-rose-50 hover:text-rose-600"
      }`}
    >
      <Heart
        className={`w-4 h-4 text-rose-500 ${claps > 0 ? "fill-rose-500" : ""} ${
          animating ? "animate-ping" : ""
        }`}
      />
      <span>{claps} Claps</span>
    </button>
  );
}
