"use client";

export const dynamic = "force-dynamic";

import { CategoryLayout } from "@/components/layout/CategoryLayout";
import { children } from "@/constants";

export default function ChildrenPage() {
  return <CategoryLayout {...children} />;
}
