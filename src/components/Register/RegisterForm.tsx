import Input from "../ui/Input";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { yupResolver } from "@hookform/resolvers/yup";
import type { RegisterType } from "./types/RegisterType";
import { registerUser } from "@/services/authentication_api";
import { registerSchema } from "./validationSchemas/registerSchema";

const RegisterForm = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterType>({
    resolver: yupResolver(registerSchema),
    mode: "onChange",
  });

  const onSubmit = async (formData: RegisterType) => {
    const res = await registerUser(formData);
    if (res === 201) navigate("/login");
  };

  if (user) navigate("/");
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex gap-2 flex-col w-full max-w-96"
    >
      <Input
        label="First Name"
        inputName="firstName"
        register={register}
        required
        errors={errors}
        placeholder="Enter First Name"
      />

      <Input
        label="Last Name"
        inputName="lastName"
        register={register}
        required={false}
        errors={errors}
        placeholder="Enter Last Name"
      />

      <Input
        label="Phone Number"
        inputName="phone"
        register={register}
        required={false}
        errors={errors}
        placeholder="XXXX XXX XXX"
      />

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

      <Input
        label="Confirm Password"
        inputName="confirmPassword"
        register={register}
        required
        errors={errors}
        placeholder="Confirm Password"
      />

      <button
        type="submit"
        className="text-white w-full my-5 max-sm:my-2 bg-[#2563EB] py-2 px-4 rounded-md text-sm cursor-pointer select-none"
      >
        Register
      </button>

      <div className="text-center flex gap-1 justify-center">
        <p className="text-[#797979]">Already have an account?</p>
        <Link to="/login" className="text-black underline">
          Login
        </Link>
      </div>
    </form>
  );
};

export default RegisterForm;
