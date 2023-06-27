/* eslint-disable @typescript-eslint/no-unused-vars */
//import { type NextPage } from "next";
//import Head from "next/head";
import Link from "next/link";
import { api } from "~/utils/api";
import { useState } from "react";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutateAsync, isLoading } = api.auth.insert.useMutation();

  const sendData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    void mutateAsync({ name: name, email: email, password: password });
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-b from-[#1111] to-[#15162c]">
      <div className="flex w-96 flex-col rounded-md bg-white/20 p-6 shadow-lg">
        <form onSubmit={sendData}>
          <h1 className="mb-2 text-center text-3xl text-white">Signup</h1>
          <div className="mb-1 flex flex-col text-right">
            <label className="text-bold mb-1 block text-black/40">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="placeholder:text-bgray-600 w-full rounded-md border px-2 py-1 text-base text-black placeholder:uppercase placeholder:italic focus:border-gray-500 focus:outline-none focus:ring-0 "
              placeholder="Jsmith"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>
          <div className="mb-1 flex flex-col text-left">
            <label className="text-bold mb-1 block text-black/40">Email</label>
            <input
              type="email"
              id="Email"
              className="placeholder:text-bgray-600 w-full rounded-md border px-2 py-1 text-base text-black placeholder:uppercase placeholder:italic focus:border-gray-500 focus:outline-none focus:ring-0 "
              placeholder="somthing@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <div className="mb-2 flex flex-col text-right">
            <label className="text-bold mb-1 block text-black/40">
              Password
            </label>
            <input
              type="password"
              id="Password"
              className="placeholder:text-bgray-600 w-full rounded-md border px-2 py-1 text-base text-black placeholder:uppercase placeholder:italic focus:border-gray-500 focus:outline-none focus:ring-0 "
              placeholder="########"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>

            <button className="font-2xl mx-auto mt-4 rounded-full bg-white/10 px-8 py-2.5 text-center text-white no-underline transition hover:bg-white/20">
              Submit
            </button>
          </div>
        </form>
        <p className="mt-8 flex flex-col items-center text-center text-2xl text-white">
          Have Discord or Already have an account!!!
          <Link href="/">
            <button className="font-2xl mx-auto mt-2 rounded-full bg-white/10 px-8 py-2.5 text-center text-white no-underline transition hover:bg-white/20">
              Sign In
            </button>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
