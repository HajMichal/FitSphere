import React from "react";
import { CenterContent } from "../styled/Containers";

export function SubmitButton() {
  return (
    <CenterContent>
      <div className="w-[75%] max-w-96 bg-brand rounded-2xl p-1 mt-10 text-center">
        <h1 className="tracking-widest text-white font-montserrat font-bold">
          SUBMIT
        </h1>
      </div>
    </CenterContent>
  );
}
