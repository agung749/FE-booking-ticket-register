import React, { useEffect, useState } from "react";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { CredentialResponse, GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
const timeOutMessage: number = 2000;

interface UserProps {
  email: string
  password: string
}

interface UserRequest {
  email: string
  password: string
}

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [failMessage, setFailMessage] = useState<string>("");
  const [user, setUser] = useState<UserProps>(
    {
      email: "", // atuny0@sohu.com
      password: "" // 9uQFF1Lh
    }
  );
  const navigate: NavigateFunction = useNavigate()

  useEffect(() => {
    fetch("https://dummyjson.com/users/1")
      .then((res) => res.json())
      .then((data) => setUser({ email: data.email, password: data.password }))
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    event.preventDefault();
    try {
      const payload: UserRequest = {
        email,
        password
      }
      if (!payload.email || !payload.password) {
        throw new Error(`${!payload.email ? "Email" : "Password"} tidak boleh kosong!`);
      }
      if (!payload.email.includes("@")) {
        throw new Error("Format email salah!");
      }
      if (payload.password.length < 8) {
        throw new Error("Password minimal 8 huruf!")
      }
      if (payload.email !== user.email) {
        throw new Error("Email tidak sesuai!");
      }
      if (payload.password !== user.password) {
        throw new Error("Password tidak sesuai!");
      }
      setSuccessMessage("Login berhasil");
      setTimeout(() => {
        setSuccessMessage("");
        navigate("/");
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

  const handleCredentialResponse = async (credentialResponse: CredentialResponse) => {
    try {
      const bearerToken: string = 'Bearer'
      const credentialToken = `${bearerToken} ${credentialResponse.credential}` as string
      if (!credentialToken.startsWith(bearerToken)) {
        throw new Error("Format token salah!")
      }
      setSuccessMessage("Login berhasil");
      setTimeout(() => {
        setSuccessMessage("");
        navigate("/");
      }, timeOutMessage);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message)
      }
    }
  }

  const handleCredentialResponseError = async () => {
    console.log("Login gagal!")
  }

  return (
    <div className="flex justify-center items-center h-screen" style={{ backgroundColor: "#B1C5FF" }}>
      <div className="flex justify-center items-center bg-white rounded-md p-4 w-9/12">
        <div className="w-1/2">
          <img src="https://i.ibb.co/Lg7hnNk/bg-login.png" alt="bg-login" className="w-full h-full object-cover" />
        </div>
        <div className="w-1/2">
          <div className="mt-10 md:pt-0 px-8 md:px-16 lg:px-2">
            {successMessage && <h3 className="text-center bg-green-500 text-white mb-3">{successMessage}</h3>}
            {failMessage && <h3 className="text-center mb-3 bg-red-500 text-white">{failMessage}</h3>}

            <form onSubmit={handleSubmit} className="mt-10 md:pt-0 px-8 md:px-16 lg:px-12">
              <>
                <div className="flex justify-between mb-3">
                  <input type="text" id="email" name="email" value={email} className="appearance-none border rounded-lg w-full py-2 px-3 mt-1  focus:outline-none focus:shadow-outline" onChange={handleChange} placeholder="Nomor Ponsel / Email" />
                </div>
                <div className="flex justify-between mb-5">
                  <input type="password" id="password" name="password" value={password} className="appearance-none border rounded-lg w-full py-2 px-3 mt-1 focus:outline-none focus:shadow-outline" onChange={handleChange} placeholder="Password" />
                </div>
                <div className="text-right text-red-400 hover:underline hover:text-red-900 mb-8">
                  <a href="#">Lupa Password?</a>
                </div>
                <button type="submit" className={`flex w-full justify-center rounded-full bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${!email || !password || isLoading ? "cursor-not-allowed" : ""}`} disabled={!email || !password || isLoading}>{isLoading ? "Loading ..." : "Log in"}</button>
              </>
            </form>
            <p className="mt-5 text-center">Atau Log in dengan</p>
            <div className="mt-5 flex justify-center items-center">
            <GoogleOAuthProvider clientId="2182170302-4qed8hhs52i94pq1bob86itln3vj01f3.apps.googleusercontent.com">
              <GoogleLogin onSuccess={handleCredentialResponse} onError={handleCredentialResponseError} shape="circle" type="standard" text="signin_with"/>
            </GoogleOAuthProvider>
            </div>
            <p className="mt-5 text-center">Belum Punya Akun?</p>
            <p className="mt-5 text-center"><Link to={'/register'} className="text-indigo-600 hover:text-indigo-500">Daftar</Link> sekarang untuk pengalaman pemesanan yang lebih baik!</p>
          </div>
        </div>
      </div>
    </div>
  )
}