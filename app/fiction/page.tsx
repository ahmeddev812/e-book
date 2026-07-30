"use client";

export const dynamic = "force-dynamic";

import { CategoryLayout } from "@/components/layout/CategoryLayout";
import { fiction } from "@/constants";

export default function FictionPage() {
  return <CategoryLayout {...fiction} />;
}
