import { useForm, Link } from '@inertiajs/react';
import { Eye, EyeOff } from "lucide-react";
import { useState } from 'react';
import logo from "../../../front/assets/_logo_branco.png";

export default function ResetPassword({ token, email }) {
  const { data, setData, post, processing, errors } = useForm({
    token: token || '',
    email: email || '',
    password: '',
    password_confirmation: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  function submit(e) {
    e.preventDefault();
    post('/reset-password');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f4f8fc] via-white to-[#eef6ff] flex items-center justify-center px-4">    
      <div className="w-full max-w-md">
        <form
          onSubmit={submit}
          className="bg-white rounded-3xl shadow-[0_20px_60px_rgba(15,23,42,0.12)] border border-slate-200 overflow-hidden"
        >
          {/* Header */}
          <div className="bg-[#0d8fe8] text-white px-8 py-10 text-center">
            <img
              src={logo}
              alt="ISTEC Porto"
              className="mx-auto h-20 mb-4"
            />
            <h1 className="text-2xl font-bold">Definir Nova Palavra-passe</h1>
            <p className="text-sm opacity-90 mt-2">
              Introduza a sua nova palavra-passe
            </p>
          </div>

          {/* Form */}
          <div className="p-8 space-y-5">            
              <>
                {/* Email */}
                <div>
                  <input
                    type="email"
                    value={data.email}
                    readOnly
                    className="w-full rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm text-slate-500"
                  />
                </div>

                {/* Password */}
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Nova palavra-passe"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-[#0d8fe8] pr-12"
                    value={data.password}
                    onChange={(e) => setData("password", e.target.value)}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-[#0d8fe8]"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>

                  {errors.password && (
                    <p className="text-red-500 text-sm mt-2">{errors.password}</p>
                  )}
                </div>

                {/* Confirm */}
                <div className="relative">
                  <input
                    type={showConfirm ? "text" : "password"}
                    placeholder="Confirmar palavra-passe"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-[#0d8fe8] pr-12"
                    value={data.password_confirmation}
                    onChange={(e) => setData("password_confirmation", e.target.value)}
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-[#0d8fe8]"
                  >
                    {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {/* Submit */}
                <button
                  disabled={processing}
                  className="w-full bg-[#0d8fe8] text-white py-3 rounded-xl font-semibold hover:bg-[#0b7fd1] transition"
                >
                  {processing ? "A guardar..." : "Alterar palavra-passe"}
                </button>
              </>
          </div>
        </form>
      </div>
    </div>
  );
}