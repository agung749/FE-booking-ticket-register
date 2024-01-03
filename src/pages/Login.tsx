import React, { useEffect, useState } from "react";

interface UserProps {
  email: string
  phone: string
  password: string
}

interface UserRequest {
  email: string
  phone: string
  password: string
}

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [failMessage, setFailMessage] = useState<string>("");
  const [chooseLogin, setChooseLogin] = useState<boolean>(true);
  const [user, setUser] = useState<UserProps>(
    {
      email: "", // atuny0@sohu.com,
      phone: "", // +637916758914
      password: "" // 9uQFF1Lh
    }
  );

  useEffect(() => {
    fetch("https://dummyjson.com/users/1")
    .then((res) => res.json())
    .then((data) => setUser({email: data.email, phone: data.phone.split(" ").join(""), password: data.password}))
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    switch(name) {
      case "email":
        setEmail(value);
      break;
      case "phone":
        setPhone(value);
      break;
      case "password":
        setPassword(value);
      break;
    }
  } 

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    event.preventDefault();
    const timeOutMessage: number = 2000;
    try {
      const payload: UserRequest = {
        email,
        phone,
        password
      }

      if (chooseLogin) {
        if (!payload.email || !payload.password) {
          throw new Error(`${!payload.email ? "Email" : "Password"} tidak boleh kosong!`);
        }
  
        if (!payload.email.includes("@")) {
          throw new Error("Format email salah!");
        }
  
        if (payload.email !== user.email) {
          throw new Error("Email tidak sesuai!");
        }
  
        if (payload.password !== user.password) {
          throw new Error("Password tidak sesuai!");
        }
      } else {
        if (!payload.phone) {
          throw new Error("Nomor HP tidak boleh kosong!");
        }

        if (payload.phone !== user.phone) {
          throw new Error("Nomor HP tidak sesuai!");
        }
      }
      setSuccessMessage("Login berhasil");
      setTimeout(() => {
        setSuccessMessage("");
      }, timeOutMessage);
    } catch (error) {
      if (error instanceof Error) {
        setFailMessage(error.message);
        setTimeout(() => {
          setFailMessage("");
        }, timeOutMessage);
      }
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, timeOutMessage);
    }
  }
  
  return (
    <>
      <div className=" border p-2 border-neutral-700 w-1/5 m-auto mt-40">
        <h1 className="font-bold text-center mb-5">Login</h1>
        {successMessage && <h3 className="text-center bg-green-500 text-white mb-3">{successMessage}</h3>}
        {failMessage && <h3 className="text-center mb-3 bg-red-500 text-white">{failMessage}</h3>}
        <form onSubmit={handleSubmit}>
          {chooseLogin ? 
          <>
            <div className="flex justify-between mb-3">
              <label htmlFor="email">Email</label>
              <input type="text" id="email" name="email" value={email} className="border border-neutral-700 outline-none" onChange={handleChange} placeholder="atuny0@sohu.com"/>
            </div>
            <div className="flex justify-between mb-5">
              <label htmlFor="password">Password</label>
              <input type="text" id="password" name="password" value={password} className="border border-neutral-700 outline-none" onChange={handleChange} placeholder="9uQFF1Lh"/>
            </div>
            <button type="submit" className={`border border-neutral-700 w-full py-1 bg-neutral-500 mb-5 ${!email || !password || isLoading ? "cursor-not-allowed" : ""}`}disabled={!email || !password || isLoading}>{isLoading ? "Loading ..." : "Login"}</button>
          </> : 
          <>
            <div className="flex justify-between mb-3">
              <label htmlFor="phone">HP</label>
              <input type="text" id="phone" name="phone" value={phone} className="border border-neutral-700 outline-none" onChange={handleChange} placeholder="+637916758914"/>
            </div>
            <button type="submit" className={`border border-neutral-700 w-full py-1 bg-neutral-500 mb-5 ${!phone || isLoading ? "cursor-not-allowed" : ""}`}disabled={!phone || isLoading}>{isLoading ? "Loading ..." : "Login"}</button>
          </>}
        </form>
        <button onClick={() => setChooseLogin((prev) => !prev)} className="w-full underline">Login dengan {chooseLogin ? "Nomor HP" : "Email"} ?</button>
      </div>
    </>
  )
}
