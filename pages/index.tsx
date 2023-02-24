import Head from "next/head";

import ProductList from "@/components/ProductList";
import Button from "@/components/Button";
import { useState } from "react";

import styles from "../styles/Home.module.css";

/* ----------------- TYPE DECLARATION ----------------- */
export type HandleCateChange = {
  handleCateChange: (value: string) => void;
};

export type Category = {
  category: string;
};
/* ----------------- TYPE DECLARATION ----------------- */

/* ================== MAIN COMPONENT ================== */
export default function Home() {
  const [category, setCategory] = useState("");

  function handleCateChange(category: string) {
    setCategory(category);
  }

  return (
    <>
      <Head>
        <title>Pet Food App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.appStyle}>
        <h1>{category}</h1>
        <Button handleCateChange={handleCateChange} />
        <ProductList category={category} />
      </main>
    </>
  );
}
