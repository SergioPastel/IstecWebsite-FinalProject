import { useState } from "react";
import { useForm } from "@inertiajs/react";
import { Eye, EyeOff } from "lucide-react";

export default function UserForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  function handleSubmit(e) {
    e.preventDefault();

    post(route("backoffice.users.store"), {
      preserveScroll: true,
      onSuccess: () => {
        reset();
        setShowPassword(false);
        setShowPasswordConfirmation(false);
      },
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      autoComplete="off"
      className="max-w-4xl p-6 mx-auto space-y-8 rounded-xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-brand-black">Nome</label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => setData("name", e.target.value)}
            autoComplete="off"
            className={`p-2 border rounded border-brand-border focus:ring-2 focus:ring-brand-secondary outline-none ${
              errors.name ? "border-red-500" : ""
            }`}
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name}</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold text-brand-black">Email</label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => setData("email", e.target.value)}
            autoComplete="new-email"
            className={`p-2 border rounded border-brand-border focus:ring-2 focus:ring-brand-secondary outline-none ${
              errors.email ? "border-red-500" : ""
            }`}
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email}</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold text-brand-black">Palavra-passe</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={data.password}
              onChange={(e) => setData("password", e.target.value)}
              autoComplete="new-password"
              className={`w-full p-2 pr-12 border rounded border-brand-border focus:ring-2 focus:ring-brand-secondary outline-none ${
                errors.password ? "border-red-500" : ""
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute inset-y-0 right-3 flex items-center text-slate-500 hover:text-slate-700"
              aria-label={showPassword ? "Ocultar palavra-passe" : "Mostrar palavra-passe"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && (
            <span className="text-red-500 text-sm">{errors.password}</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold text-brand-black">
            Confirmar palavra-passe
          </label>
          <div className="relative">
            <input
              type={showPasswordConfirmation ? "text" : "password"}
              value={data.password_confirmation}
              onChange={(e) => setData("password_confirmation", e.target.value)}
              autoComplete="new-password"
              className={`w-full p-2 pr-12 border rounded border-brand-border focus:ring-2 focus:ring-brand-secondary outline-none ${
                errors.password_confirmation ? "border-red-500" : ""
              }`}
            />
            <button
              type="button"
              onClick={() =>
                setShowPasswordConfirmation((prev) => !prev)
              }
              className="absolute inset-y-0 right-3 flex items-center text-slate-500 hover:text-slate-700"
              aria-label={
                showPasswordConfirmation
                  ? "Ocultar confirmação da palavra-passe"
                  : "Mostrar confirmação da palavra-passe"
              }
            >
              {showPasswordConfirmation ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password_confirmation && (
            <span className="text-red-500 text-sm">
              {errors.password_confirmation}
            </span>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={processing}
        className="w-full md:w-auto px-8 py-3 bg-brand-primary text-white font-bold rounded-lg hover:bg-brand-secondary transition-colors disabled:opacity-50"
      >
        {processing ? "A guardar..." : "Criar utilizador"}
      </button>
    </form>
  );
}