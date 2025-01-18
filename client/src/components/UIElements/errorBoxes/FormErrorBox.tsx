interface FormMessageBoxProp {
  message: string;
}
export function FormMessageBox({ message }: FormMessageBoxProp) {
  return (
    <div className="h-auto p-3 w-full border-error rounded-md border-2 bg-[#FFDCD1] mt-8">
      {message}
    </div>
  );
}
