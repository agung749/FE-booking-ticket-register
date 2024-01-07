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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
      .then((data) => setUser({ email: data.email, phone: data.phone.split(" ").join(""), password: data.password }))
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    switch (name) {
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
                <button type="submit" className={`flex w-full justify-center rounded-full bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${!phone || !email || !password || isLoading ? "cursor-not-allowed" : ""}`} disabled={!phone || !email || !password || isLoading}>{isLoading ? "Loading ..." : "Log in"}</button>
              </>
            </form>
            <p className="mt-5 text-center">Atau Log in dengan</p>
            <div className="mt-5 flex justify-center items-center">
              {/* This button will replace with OAuth */}
              <button type="button" className="w-23 bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold px-4 py-2">
                <div className="flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" className="w-6 h-6" viewBox="0 0 48 48">
                    <defs>
                      <path id="a" d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z" />
                    </defs>
                    <clipPath id="b">
                      <use xlinkHref="#a" overflow="visible" />
                    </clipPath>
                    <path clipPath="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z" />
                    <path clipPath="url(#b)" fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z" />
                    <path clipPath="url(#b)" fill="#34A853" d="M0 37l30-23 7.9 1L48 0v48H0z" />
                    <path clipPath="url(#b)" fill="#4285F4" d="M48 48L17 24l-4-3 35-10z" />
                  </svg>
                </div>
              </button>
            </div>
            <p className="mt-5 text-center">Belum Punya Akun?</p>
            <p className="mt-5 text-center"><a href="#" className="text-indigo-600 hover:text-indigo-500">Daftar</a> sekarang untuk pengalaman pemesanan yang lebih baik!</p>
          </div>
        </div>
      </div>
    </div>
  )
}