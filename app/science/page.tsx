"use client";

export const dynamic = "force-dynamic";

import { CategoryLayout } from "@/components/layout/CategoryLayout";
import { science } from "@/constants";

export default function SciencePage() {
  return <CategoryLayout {...science} />;
}
