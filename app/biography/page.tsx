"use client";

export const dynamic = "force-dynamic";

import { CategoryLayout } from "@/components/layout/CategoryLayout";
import { biography } from "@/constants";

export default function BiographyPage() {
  return <CategoryLayout {...biography} />;
}
