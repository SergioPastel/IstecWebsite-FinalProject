import { Head, Link, useForm } from '@inertiajs/react';
import { Eye, EyeOff } from "lucide-react";
import { useState } from 'react';
import logo from "../../../front/assets/_logo_branco.png";
import FlashToasts from "../../components/ui/FlashToast";

export default function Login() {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
    password: '',
  });

  function submit(e) {
    e.preventDefault();
    post('/login');
  }
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f4f8fc] via-white to-[#eef6ff] flex items-center justify-center px-4">
      <FlashToasts />
      
      <Head title="Login - Área administrativa" />
      <div className="w-full max-w-md">
        <form
          onSubmit={submit}
          className="bg-white rounded-3xl shadow-[0_20px_60px_rgba(15,23,42,0.12)] border border-slate-200 overflow-hidden"
        >

          {/* Header */}
          <div className="bg-[#0d8fe8] text-white px-8 py-10 relative">
  
          <div className="text-center">
            <img
              src={logo}
              alt="ISTEC Porto"
              className="mx-auto h-20 mb-4"
            />
            <h1 className="text-2xl font-bold">Área administrativa</h1>
          </div>

        </div>

          {/* Form */}
          <div className="p-8 space-y-5">
            <div>
              <input
                type="email"
                placeholder="Email"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-[#0d8fe8]"
                value={data.email}
                onChange={(e) => setData("email", e.target.value)}
              />

            <div className="relative mt-3">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Palavra-passe"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-12 text-sm outline-none focus:border-[#0d8fe8]"
                value={data.password}
                onChange={(e) => setData("password", e.target.value)}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
               className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center text-slate-400 hover:text-[#0d8fe8]"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>

              {errors.email && (
                <p className="mt-2 text-sm text-red-500">
                  Email ou palavra-passe incorretos.
                </p>
              )}
            </div>

            {/* Forgot password */}
            <div className="text-right mb-3">
              <Link
                href={route("password.request")}
                className="text-sm text-[#0d8fe8] hover:underline"
              >
                Esqueceu-se da sua palavra-passe?
              </Link>
            </div>

           <button
              type="submit"
              disabled={processing}
              className="w-full bg-[#0d8fe8] text-white py-3 rounded-xl font-semibold hover:bg-[#0b7fd1] transition disabled:opacity-70"
            >
              {processing ? "A entrar..." : "Entrar"}
            </button>

            <div className="pt-5 border-t border-slate-200">
              <Link
                href={route("home")}
                className="mt-4 block text-center text-sm text-slate-600 hover:text-[#0d8fe8] transition"
              >
                ← Voltar ao site
              </Link>
            </div>
            </div>
            </div>
        </form>
      </div>
    </div>
  );
  
}