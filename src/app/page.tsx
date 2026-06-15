"use client";

import dynamic from "next/dynamic";

const CryptoEdutyApp = dynamic(
  () => import("@/components/crypto/crypto-eduty-app"),
  { ssr: false }
);

export default function Home() {
  return <CryptoEdutyApp />;
}
