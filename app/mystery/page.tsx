"use client";

export const dynamic = "force-dynamic";

import { CategoryLayout } from "@/components/layout/CategoryLayout";
import { mystery } from "@/constants";

export default function MysteryPage() {
  return <CategoryLayout {...mystery} />;
}
