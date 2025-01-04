import { CenterContent } from "../styled/Containers";

interface SubmitButton {
  text: string;
}
export function SubmitButton({ text }: SubmitButton) {
  return (
    <CenterContent>
      <button className="w-[75%] max-w-96 bg-brand rounded-2xl p-1 mt-10 text-center">
        <h1 className="tracking-widest text-white font-montserrat font-bold">
          {text}
        </h1>
      </button>
    </CenterContent>
  );
}
