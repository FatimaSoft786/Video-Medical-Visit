"use client";
import JitsiMeetComponent from "@/app/components/JitsiMeetComponent";
import { useParams, useRouter } from "next/navigation";
import React from "react";

const page = () => {
  const params = useParams();
  const user = localStorage.getItem("user");
  const router = useRouter();

  if (!user) {
    useEffect(() => {
      router.push(`/${params.locale}/auth/signin`);
    }, []);
    return <></>;
  }
  return <JitsiMeetComponent roomId={params.id} />;
};

export default page;
