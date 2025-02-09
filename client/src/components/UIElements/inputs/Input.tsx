import { type Icon } from "@phosphor-icons/react";
import { forwardRef, InputHTMLAttributes } from "react";
import { CenterContent } from "../../styled/Containers";
import { ContentHeader, ShortDescription } from "../../styled/Text";

interface TrainingInputProps extends InputHTMLAttributes<HTMLInputElement> {
  Icon?: Icon;
  placeholder: string;
  label: string;
  error?: string;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  optional?: boolean;
  type?: string;
}

export const Input = forwardRef<HTMLInputElement, TrainingInputProps>(
  (
    {
      Icon,
      label,
      className,
      inputClassName,
      labelClassName,
      error,
      placeholder,
      optional = false,
      type = "text",
      ...props
    },
    ref
  ) => {
    return (
      <CenterContent className={`mt-5 ${className}`}>
        <div className="w-[85%] space-y-2">
          <div className="flex gap-1 mb-2 items-end">
            <ContentHeader className={labelClassName}>{label}</ContentHeader>
            <ShortDescription>{optional && "(optional)"}</ShortDescription>
          </div>
          <div className="relative group">
            {Icon && (
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Icon
                  className="text-grey group-focus-within:text-brand"
                  size={22}
                />
              </div>
            )}
            <input
              ref={ref}
              type={type}
              className={`
                block w-full rounded-md border border-grey py-2 text-sm outline-none transition-colors 
                placeholder:text-grey placeholder:font-raleway
                focus:border-brand focus:ring-1 focus:ring-brand 
                ${Icon ? "pl-10" : "pl-3"}
                ${error && "border-error focus:border-error focus:ring-error"}
                ${inputClassName}
                `}
              placeholder={placeholder}
              autoComplete="off"
              {...props}
            />
          </div>
          {error && <p className="text-sm text-error">{error}</p>}
        </div>
      </CenterContent>
    );
  }
);
