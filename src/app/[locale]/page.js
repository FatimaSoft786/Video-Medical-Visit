"use client";
import getPath from "@/utils/path";
import { getUserSession } from "@/utils/session";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
export default function Index() {
  const params = useParams();
  const router = useRouter();
  const {user} =getUserSession();
  const path = getPath()
  useEffect(() => {
    if(!user){
      router.push(`/it/auth/signin`);
    }else{
      router.push(`/${path}/dashboard`)
    }
  }, []);
  return <></>;
}
