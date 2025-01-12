import {
  useRef,
  KeyboardEvent,
  ClipboardEvent,
  ChangeEvent,
  useState,
} from "react";
import { useRegistrationContext } from "../../context/RegistrationContext";

export function PinCodeInput() {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [pin, setPin] = useState<string[]>(Array(6).fill(""));
  const { code, setCode } = useRegistrationContext();

  const handleChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const nextInput = inputRefs.current[index + 1];
    // Only allow single digit
    if (value.length > 1) {
      e.target.value = value.slice(-1);
    }

    const newPin = [...code];
    newPin[index] = value.slice(-1);

    setCode(newPin);
    // Move to next input if value is entered
    if (value && nextInput) {
      nextInput.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    const prevInput = inputRefs.current[index - 1];
    const currentInput = inputRefs.current[index];
    const nextInput = inputRefs.current[index + 1];

    if (e.key === "ArrowRight" && nextInput) {
      e.preventDefault();
      nextInput.focus();
    }
    if (e.key === "ArrowLeft" && prevInput) {
      e.preventDefault();
      prevInput.focus();
    }
    if (e.key === "Backspace") {
      if (!currentInput?.value && prevInput) {
        e.preventDefault();

        const newPin = [...pin];
        newPin[index] = "";
        setPin(newPin);

        prevInput.value = "";
        prevInput.focus();
      }
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    const digits = pastedData.replace(/\D/g, "").split("").slice(0, 6);

    digits.forEach((digit, index) => {
      const input = inputRefs.current[index];
      if (input) {
        input.value = digit;
        if (index < 5 && digits[index + 1]) {
          inputRefs.current[index + 1]?.focus();
        }
      }
    });
  };

  return (
    <div className="flex items-center justify-center p-8">
      <div className="flex gap-2">
        {[...Array(6)].map((_, index) => (
          <input
            key={index}
            type="number"
            inputMode="numeric"
            maxLength={1}
            ref={(el) => (inputRefs.current[index] = el)}
            className="w-12 h-12 text-center border-2 rounded-md border-dark text-lg focus:border-primary focus:outline-none focus:border-brand"
            onChange={(e) => handleChange(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={index === 0 ? handlePaste : undefined}
            pattern="\d*"
          />
        ))}
      </div>
    </div>
  );
}
