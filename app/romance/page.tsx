"use client";

export const dynamic = "force-dynamic";

import { CategoryLayout } from "@/components/layout/CategoryLayout";
import { romance } from "@/constants";

export default function RomancePage() {
  return <CategoryLayout {...romance} />;
}
