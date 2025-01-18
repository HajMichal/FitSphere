import { SubmitHandler, useForm } from "react-hook-form";
import { trpc } from "../api/trpc";
import {
  FormMessageBox,
  Input,
  Loading,
  SubmitButton,
} from "../components/UIElements";
import { useNavigate } from "react-router";
import { ROUTES } from "./routes";

export interface LoginInputs {
  login: string;
  password: string;
}
function Login() {
  const navigate = useNavigate();
  const { mutate, error, isPending } = trpc.auth.signIn.useMutation({
    onSuccess() {
      navigate(ROUTES.home);
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>();

  const onSubmit: SubmitHandler<LoginInputs> = (data) => {
    mutate(data);
  };
  return (
    <>
      {isPending && <Loading />}
      <form className="p-3 bg-background h-dvh ">
        {error && <FormMessageBox message={error.message} />}
        <Input
          label="Login"
          placeholder="Twój e-mail"
          error={errors.login?.message}
          {...register("login", { required: "Login jest wymagany" })}
        />
        <Input
          label="Hasło"
          type="password"
          placeholder=""
          error={errors.password?.message}
          {...register("password", {
            required: "Hasło jest wymagane",
            minLength: {
              value: 8,
              message: "Hasło musi mieć co najmniej 8 znaków długości",
            },
          })}
        />
        <SubmitButton onClick={handleSubmit(onSubmit)} text={"ZALOGUJ SIĘ"} />
      </form>
    </>
  );
}

export default Login;
