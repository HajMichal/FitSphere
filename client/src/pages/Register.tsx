import { useForm, SubmitHandler } from "react-hook-form";
import { trpc } from "../api/trpc";
import { useState } from "react";
import { SubmitButton } from "../components/UIElements";
import { RegistrationSteps } from "../components/registration/RegistrationSteps";
import { RegistrationContext } from "../context/RegistrationContext";
import { useNavigate } from "react-router";
import { ROUTES } from "./routes";

export interface RegisterInputs {
  name: string;
  surname: string;
  email: string;
  password: string;
  repeatPassword: string;
  age: number;
  phone?: string;
  city?: string;
  gymName?: string;
}

function Register() {
  const [registrationStep, setRegistrationStep] = useState<1 | 2 | 3>(1);
  const [code, setCode] = useState<string[]>(Array(6).fill(""));
  const navigate = useNavigate();

  const { mutate: createAccount } = trpc.auth.createAccount.useMutation({
    onSuccess(data) {
      localStorage.setItem("pendingId", data.body.pendingUserId);
    },
  });
  const { mutate: verify2FACode } = trpc.auth.verify2FACode.useMutation({
    onSuccess() {
      localStorage.removeItem("pendingId");
      navigate(ROUTES.login);
    },
  });
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<RegisterInputs>();

  const onSubmit: SubmitHandler<RegisterInputs> = (data) => {
    const pendingUserId = localStorage.getItem("pendingId");
    if (registrationStep === 1) setRegistrationStep(2);
    else if (registrationStep === 2) {
      createAccount(data);
      setRegistrationStep(3);
    } else if (registrationStep === 3 && pendingUserId) {
      verify2FACode({ code: code.join(""), email: data.email, pendingUserId });
    }
  };

  return (
    <form className="p-3 bg-background h-dvh">
      <RegistrationContext.Provider value={{ code, setCode }}>
        <RegistrationSteps
          step={registrationStep}
          register={register}
          errors={errors}
          setValue={setValue}
          watch={watch}
        />
      </RegistrationContext.Provider>
      <SubmitButton
        onClick={handleSubmit(onSubmit)}
        text={nameMap[registrationStep]}
      />
    </form>
  );
}

export default Register;
const nameMap = {
  1: "NASTĘPNY KROK",
  2: "STWÓRZ KONTO",
  3: "ZWERYFIKUJ EMAIL",
};
