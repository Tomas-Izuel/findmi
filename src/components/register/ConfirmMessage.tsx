import { BadgeCheckIcon } from "lucide-react";

const ConfirmMessage = () => {
  return (
    <div className="text-center flex flex-col justify-center items-center gap-4">
      <h2>Verifica tu correo para continuar</h2>
      <BadgeCheckIcon size={64} className="text-green-500" />
      <p>
        Hemos enviado un correo de confirmación a tu dirección de correo
        electrónico. Por favor, verifica tu bandeja de entrada y sigue las
        instrucciones para completar el registro.
      </p>
    </div>
  );
};

export default ConfirmMessage;
