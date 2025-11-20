"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/binarize">Binarize</Link>
      <Link href="/process">Process</Link>
    </nav>
  );
}
