"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type LoginData = {
  loginButton: string;
  signupButton: string;
};

export default function AuthButtons() {
  const [data, setData] = useState<LoginData | null>(null);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/contentful/login");
      const json = await res.json();
      setData(json as LoginData);
    }

    fetchData();
  }, []);

  if (!data) return <p>Carregando...</p>;

  return (
    <div>
      <Link href="/login">
        <button>{data.loginButton}</button>
      </Link>
      <Link href="/signup">
        <button>{data.signupButton}</button>
      </Link>
    </div>
  );
}
