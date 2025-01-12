import { ChangeEvent } from "react";
import {
  UseFormRegister,
  UseFormWatch,
  FieldErrors,
  UseFormSetValue,
} from "react-hook-form";
import { PinCodeInput } from "./PinCode";
import { type FormInputs } from "../../pages/Register";
import { Input } from "../UIElements";
import { usePhoneFormat } from "../../hooks/phoneFormat";

interface RegistrationStepsProps {
  step: number;
  register: UseFormRegister<FormInputs>;
  watch: UseFormWatch<FormInputs>;
  setValue: UseFormSetValue<FormInputs>;
  errors: FieldErrors<FormInputs>;
}
export function RegistrationSteps({
  step,
  register,
  watch,
  setValue,
  errors,
}: RegistrationStepsProps) {
  const formatPhoneNumber = usePhoneFormat();

  switch (step) {
    case 1:
      return (
        <>
          <div className="flex">
            <Input
              label="Imię"
              placeholder="John"
              error={errors.name?.message}
              {...register("name", { required: "Imię jest wymagane" })}
            />
            <Input
              label="Nazwisko"
              placeholder="Doe"
              error={errors.surname?.message}
              {...register("surname", { required: "Nazwisko jest wymagane" })}
            />
          </div>
          <Input
            label="E-mail"
            placeholder="example@mail.com"
            error={errors.email?.message}
            type="email"
            {...register("email", {
              required: "E-mail jest wymagany",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Invalid email address",
              },
            })}
          />
          <div className="flex ">
            <Input
              label="Hasło"
              placeholder=""
              type="password"
              error={errors.password?.message}
              {...register("password", {
                required: "Należy podać hasło",
                minLength: {
                  value: 8,
                  message: "Hasło musi mieć co najmniej 8 znaków długości",
                },
              })}
            />
            <Input
              label="Powtórz hasło"
              placeholder=""
              type="password"
              error={errors.repeatPassword?.message}
              {...register("repeatPassword", {
                validate: (value) =>
                  value === watch("password") || "Hasła nie są takie same",
              })}
            />
          </div>
        </>
      );
    case 2:
      return (
        <>
          <div className="flex">
            <Input
              label="Wiek"
              placeholder="25"
              type="number"
              {...register("age", {
                required: "Należy podać wiek",
                valueAsNumber: true,
              })}
            />
            <Input
              label="Miasto"
              placeholder="Warszawa"
              optional
              {...register("city")}
            />
          </div>
          <Input
            label="Numer telefonu"
            placeholder="xxx-xxx-xxx"
            autoComplete={"off"}
            optional
            error={errors.phone?.message}
            {...register("phone", {
              pattern: {
                value: /^\d{3}-\d{3}-\d{3}$/,
                message: "Format numeru telefonu musi być: xxx-xxx-xxx",
              },
              onChange: (e: ChangeEvent<HTMLInputElement>) =>
                setValue("phone", formatPhoneNumber(e.target.value)),
            })}
          />
          <Input
            label="Nazwa siłowni"
            placeholder="Fabryka Formy"
            optional
            {...register("gymName")}
          />
        </>
      );
    case 3:
      return <PinCodeInput />;
  }
}
