import LoginForm from "@/components/Register/LoginForm";
import Title from "@/components/Register/Title";

const Login = () => {
  return (
    <div className="flex flex-col justify-center min-h-[80vh] items-center gap-3 py-2 px-4 max-sm:px-2">
      <Title text="User Login" />
      <LoginForm />
    </div>
  );
};

export default Login;
