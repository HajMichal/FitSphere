import { Barbell } from "@phosphor-icons/react";

export function Loading() {
  return (
    <>
      <div className="absolute left-[50%] z-50 top-[10%]">
        <div className="relative left-[-50%] bg-brand p-8 flex flex-col items-center rounded-md">
          <Barbell size={75} weight="duotone" className="animate-spin" />
        </div>
      </div>
      <div className="absolute w-full h-full bg-dark opacity-70 z-30" />
    </>
  );
}
