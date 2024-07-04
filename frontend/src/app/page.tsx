import Image from "next/image";
import Test from "./Test";
import RegisterForm from "./RegisterForm";
import Link from "next/link";
import New from "./New";
import TestTwo from "./TestTwo";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-around p-24">
      {/* <h1>Hello from Home</h1> */}
      <Test />
      {/* <TestTwo /> */}
      {/* <RegisterForm /> */}
      <New />
    </main>
  );
}
