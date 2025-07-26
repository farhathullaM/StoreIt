import RegisterForm from "@/components/Register/RegisterForm";
import Title from "@/components/Register/Title";

const Register = () => {
  return (
    <div className="flex flex-col items-center gap-3 py-2 px-4 max-sm:px-2">
      <Title text="User Register" />
      <RegisterForm />
    </div>
  );
};

export default Register;
