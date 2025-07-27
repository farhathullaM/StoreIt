import Input from "../ui/Input";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import type { LoginType } from "./types/LoginType";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "./validationSchemas/loginSchema";
import { useEffect } from "react";

const LoginForm = () => {
  const navigate = useNavigate();
  const { user, loading, login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({
    resolver: yupResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = async (formData: LoginType) => {
    console.log(formData);
    login(formData);
  };

  useEffect(() => {
    if (user) navigate("/");
  }, [user]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex gap-2 flex-col w-full max-w-96"
    >
      <Input
        label="Email"
        inputName="email"
        register={register}
        required
        errors={errors}
        placeholder="Enter Email"
      />

      <Input
        label="Password"
        inputName="password"
        register={register}
        required
        errors={errors}
        placeholder="Enter Password"
        type="password"
      />

      <button
        disabled={loading}
        type="submit"
        className="text-white w-full my-5 max-sm:my-2 active:bg-[#435d94] bg-[#2563EB] hover:bg-[rgb(37,80,235)] py-2 px-4 rounded-md text-sm cursor-pointer select-none"
      >
        {loading ? "Loading..." : "Login"}
      </button>

      <div className="text-center flex gap-1">
        <p className="text-[#797979]">Don't have an account?</p>
        <Link to="/register" className="text-black underline">
          Register
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
