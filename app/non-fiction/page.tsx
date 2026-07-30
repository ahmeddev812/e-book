"use client";

export const dynamic = "force-dynamic";

import { CategoryLayout } from "@/components/layout/CategoryLayout";
import { nonFiction } from "@/constants";

export default function NonFictionPage() {
  return <CategoryLayout {...nonFiction} />;
}
