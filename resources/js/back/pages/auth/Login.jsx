import { Link, useForm } from '@inertiajs/react';
import logo from "../../../front/assets/_logo_branco.png";

export default function Login() {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
    password: '',
  });

  function submit(e) {
    e.preventDefault();
    post('/login');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f4f8fc] via-white to-[#eef6ff] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <form
          onSubmit={submit}
          className="bg-white rounded-3xl shadow-[0_20px_60px_rgba(15,23,42,0.12)] border border-slate-200 overflow-hidden"
        >

          {/* Botão voltar */}
          <Link
            href={route("home")}
            className="absolute top-6 left-6 inline-flex items-center gap-2 bg-[#0d8fe8] text-white px-5 py-2.5 rounded-xl font-semibold shadow-[0_10px_25px_rgba(13,143,232,0.25)] hover:bg-[#0b7fd1] hover:-translate-y-[1px] transition-all duration-300">
            ← Voltar ao site
          </Link>

          {/* Header */}
          <div className="bg-[#0d8fe8] text-white px-8 py-10 relative">
  
          <div className="text-center">
            <img
              src={logo}
              alt="ISTEC Porto"
              className="mx-auto h-20 mb-4"
            />
            <h1 className="text-2xl font-bold">Área Administrativa</h1>
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
              {errors.email && (
                <p className="text-red-500 text-sm mt-2">{errors.email}</p>
              )}
            </div>

            <div>
              <input
                type="password"
                placeholder="Palavra-passe"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-[#0d8fe8]"
                value={data.password}
                onChange={(e) => setData("password", e.target.value)}
              />
            </div>

            {/* Forgot password */}
            <div className="text-right">
              <a
                href="#"
                className="text-sm text-[#0d8fe8] hover:underline"
              >
                Esqueceu-se da palavra-passe?
              </a>
            </div>

            <button
              disabled={processing}
              className="w-full bg-[#0d8fe8] text-white py-3 rounded-xl font-semibold hover:bg-[#0b7fd1] transition"
            >
              {processing ? "A entrar..." : "Entrar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}