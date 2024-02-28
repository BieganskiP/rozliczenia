import LoginForm from "@/components/forms/LoginForm";

export default function Home() {
  return (
    <div className="w-full flex flex-col justify-center items-center mt-28">
      <h1 className="text-lg font-bold mb-2">CL - Dolnyśląsk</h1>
      <LoginForm />
    </div>
  );
}
