import FormLoginAdmin from "~components/auth/form-login-admin";

export default function LoginAdmin() {
  return (
    <main className="min-h-svh flex justify-center items-center w-full mx-auto">
      <section className="min-h-svh flex justify-center items-center p-4 w-full max-w-xl">
        <FormLoginAdmin />
      </section>
    </main>
  );
}
