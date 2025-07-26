import type { RegisterType } from "@/components/Register/types/RegisterType";
import { registerSchema } from "@/components/Register/validationSchemas/registerSchema";
import Input from "@/components/ui/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterType>({
    resolver: yupResolver(registerSchema),
    mode: "onChange",
  });

  const onSubmit = (data: any) => console.log(data);
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center gap-3 py-2 px-4 max-sm:px-2"
    >
      <h1 className="text-2xl font-semibold pt-4 py-3">User Registration</h1>

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
        className="text-white w-full my-2 bg-[#2563EB] py-2 px-4 rounded-md text-sm cursor-pointer select-none"
      >
        Register
      </button>
    </form>
  );
};

export default Register;
