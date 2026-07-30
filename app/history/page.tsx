"use client";

export const dynamic = "force-dynamic";

import { CategoryLayout } from "@/components/layout/CategoryLayout";
import { history } from "@/constants";

export default function HistoryPage() {
  return <CategoryLayout {...history} />;
}
