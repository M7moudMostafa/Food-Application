import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Link href="/about">About Us</Link>
        <br />
      <Link href="/blog">Blogs</Link>
    </main>
  );
}
