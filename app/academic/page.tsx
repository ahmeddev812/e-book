"use client";

export const dynamic = "force-dynamic";

import { CategoryLayout } from "@/components/layout/CategoryLayout";
import { academic } from "@/constants";

export default function AcademicPage() {
  return <CategoryLayout {...academic} />;
}
