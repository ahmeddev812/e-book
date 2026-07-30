"use client";

export const dynamic = "force-dynamic";

import { CategoryLayout } from "@/components/layout/CategoryLayout";
import { poetry } from "@/constants";

export default function PoetryPage() {
  return <CategoryLayout {...poetry} />;
}
