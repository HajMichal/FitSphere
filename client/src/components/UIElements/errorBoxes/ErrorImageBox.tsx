import { ErrorMainText } from "../../styled/Text";
import { SubmitButton } from "../buttons/SubmitButton";
import { useNavigate } from "react-router";

interface ErrorImageBoxProps {
  text: string;
  buttonText: string;
  svg: React.ReactNode;
  navigateTo?: string;
}
export function ErrorImageBox({
  text,
  buttonText,
  svg,
  navigateTo,
}: ErrorImageBoxProps) {
  const navigate = useNavigate();

  return (
    <div className="text-center mt-5 flex flex-col items-center gap-3">
      <ErrorMainText>{text}</ErrorMainText>
      {svg}
      {navigateTo && (
        <SubmitButton
          text={buttonText}
          onClick={() => navigate(navigateTo, { viewTransition: true })}
        />
      )}
    </div>
  );
}
