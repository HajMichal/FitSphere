interface ErrorMessageBoxProp {
  message: string;
}
export function ErrorMessageBox({ message }: ErrorMessageBoxProp) {
  return (
    <div className="h-auto p-3 w-full border-error rounded-md border-2 bg-[#FFDCD1] mt-8">
      {message}
    </div>
  );
}
