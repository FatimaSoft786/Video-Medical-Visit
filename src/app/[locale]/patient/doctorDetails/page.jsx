"use client";
import getPath from "@/utils/path";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function page() {
  const route = useRouter();
  const path = getPath();
  useEffect(() => {
    route.push(`/${path}/patient/dashboard`);
  }, []);
  return null;
}

export default page;
