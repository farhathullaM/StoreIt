import type { LucideIcon } from "lucide-react";
import type {
  UseFormRegister,
  FieldValues,
  FieldErrors,
  Path,
} from "react-hook-form";

interface InputProps<T extends FieldValues> {
  label?: string;
  type?: string;
  inputName: Path<T>;
  register: UseFormRegister<T>;
  required: boolean;
  errors: FieldErrors<T>;
  placeholder: string;
  icon?: LucideIcon;
}

const Input = <T extends FieldValues>({
  label,
  type = "text",
  inputName,
  register,
  required,
  errors,
  placeholder,
  icon: Icon,
}: InputProps<T>) => {
  return (
    <div className="flex w-full flex-col gap-1">
      {label && (
        <div className="flex gap-1">
          <label className="text-sm font-medium text-text-primary">
            {label}
          </label>
          {required && <span className="text-red-500 text-sm font-semibold">*</span>}
        </div>
      )}
      <div className="border-2 border-[#000] rounded-md py-2 px-2">
        {Icon && <Icon className="w-4 h-4 text-gray-500" />}
        <input
          type={type}
          {...register(inputName)}
          placeholder={placeholder}
          className="outline-none placeholder:text-[#989898] text-sm w-full"
        />
      </div>
      {errors?.[inputName] && (
        <p className="text-xs text-red-500">
          {String(errors[inputName]?.message)}
        </p>
      )}
    </div>
  );
};

export default Input;
