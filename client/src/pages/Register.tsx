import { useForm, SubmitHandler } from "react-hook-form";
import { trpc } from "../api/trpc";
import { ChangeEvent, forwardRef } from "react";
import { Input as CustomInput, SubmitButton } from "../components/UIElements";
import { usePhoneFormat } from "../hooks/phoneFormat";

type FormInputs = {
  name: string;
  surname: string;
  email: string;
  password: string;
  repeatPassword: string;
  age: number;
  phone?: string;
  city?: string;
  gymName?: string;
};

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input: React.FC<FormInputProps> = forwardRef(
  ({ label, id, error, ...props }, ref: React.Ref<HTMLInputElement>) => {
    return (
      <div className="space-y-2">
        <label htmlFor={id}>{label}</label>
        <input
          id={id}
          className={`border ${error ? "border-red-500" : "border-brand"}`}
          {...props}
          ref={ref}
        />
        {error && <p className="text-error text-sm">{error}</p>}
      </div>
    );
  }
);

function Register() {
  const { mutate } = trpc.auth.createAccount.useMutation();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<FormInputs>();
  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    // Here you would typically send the data to your backend
    console.log(data);
    mutate(data);
  };

  const formatPhoneNumber = usePhoneFormat();

  // Split registration to 2 or 3 steps
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-3 bg-background">
      <div className="flex">
        <CustomInput
          label="First Name"
          placeholder="John"
          error={errors.name?.message}
          {...register("name", { required: "First name is required" })}
        />
        <CustomInput
          label="Last Name"
          placeholder="Doe"
          error={errors.surname?.message}
          {...register("surname", { required: "Last name is required" })}
        />
      </div>
      <CustomInput
        label="E-mail"
        placeholder="example@mail.com"
        error={errors.email?.message}
        type="email"
        {...register("email", {
          required: "E-mail is required",
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: "Invalid email address",
          },
        })}
      />
      <div className="flex ">
        <CustomInput
          label="Password"
          placeholder=""
          type="password"
          error={errors.password?.message}
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long",
            },
          })}
        />
        <CustomInput
          label="Repeat password"
          placeholder=""
          type="password"
          error={errors.repeatPassword?.message}
          {...register("repeatPassword", {
            validate: (value) =>
              value === watch("password") || "Passwords do not match",
          })}
        />
      </div>
      <div className="flex">
        <CustomInput
          label="Phone number"
          placeholder="123-123-123"
          error={errors.phone?.message}
          {...register("phone", {
            pattern: {
              value: /^\d{3}-\d{3}-\d{3}$/,
              message: "Phone number must be in the format xxx-xxx-xxx",
            },
            onChange: (e: ChangeEvent<HTMLInputElement>) =>
              setValue("phone", formatPhoneNumber(e.target.value)),
          })}
        />
        <CustomInput
          label="Age"
          placeholder="25"
          type="number"
          {...register("age", {
            required: "Age is required",
            valueAsNumber: true,
          })}
        />
      </div>
      <div className="flex">
        <CustomInput
          label="City"
          placeholder="Warszawa"
          optional
          {...register("city")}
        />
        <CustomInput
          label="Gym name"
          placeholder="Fabryka Formy"
          optional
          {...register("gymName")}
        />
      </div>

      <SubmitButton text="SIGN UP" />
    </form>
  );
}

export default Register;
