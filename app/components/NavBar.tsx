"use client";
import Image from "next/image";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav>
        <Image
          src="/logo.png"
          alt="Logo"
          width={48}
          height={48}
          style={{ objectFit: "contain" }}
        />        
        <Link href="/">Home</Link>
        <Link href="/binarize">Binarize</Link>
        <Link href="/process">Process</Link>
    </nav>
  );
}
