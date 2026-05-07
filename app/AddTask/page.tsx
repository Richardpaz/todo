import { Suspense } from "react";
import { Addtaskform } from "../components/Addtaskform";

export default function Page() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <Addtaskform />
    </Suspense>
  );
}