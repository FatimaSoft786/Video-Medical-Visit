"use client";
import { useParams } from "next/navigation";

const getPath = () => {
  const params = useParams();
  return params.locale;
};

export default getPath;
