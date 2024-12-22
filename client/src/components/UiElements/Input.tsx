import React, { forwardRef, InputHTMLAttributes } from "react";
import { ContentHeader, Header, ShortDescription } from "../styled/Text";
import { type Icon, Tag } from "@phosphor-icons/react";
import { CenterContent } from "../styled/Containers";

export interface TrainingInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  Icon: Icon;
  placeholder: string;
  label: string;
  error?: string;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  optional?: boolean;
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
      ...props
    },
    ref
  ) => {
    return (
      <CenterContent className="mt-5">
        <div className={`w-[85%] space-y-2", ${className}`}>
          <div className="flex gap-1 mb-2 items-end">
            <ContentHeader className={labelClassName}>{label}</ContentHeader>
            <ShortDescription>{optional && "(optional)"}</ShortDescription>
          </div>
          <div className="relative group">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Icon
                className="text-grey group-focus-within:text-brand"
                size={22}
              />
            </div>
            <input
              ref={ref}
              type="text"
              className={`
                block w-full rounded-md border border-grey py-2 pl-10 text-sm outline-none transition-colors 
                placeholder:text-grey
                focus:border-brand focus:ring-1 focus:ring-brand 
                ${error && "border-error focus:border-error focus:ring-error"}
                ${inputClassName}
                `}
              placeholder={placeholder}
              {...props}
            />
          </div>
          {error && <p className="text-sm text-error">{error}</p>}
        </div>
      </CenterContent>
    );
  }
);
