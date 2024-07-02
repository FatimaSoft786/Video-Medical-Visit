import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-center min-h-screen w-full justify-center flex flex-col">
      <h2 className="text-center">Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  );
}
