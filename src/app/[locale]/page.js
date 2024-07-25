"use client";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
export default function Index() {
  const params = useParams();
  const router = useRouter();
  useEffect(() => {
    router.push(`/it/auth/signin`);
  }, []);
  return <></>;
}
