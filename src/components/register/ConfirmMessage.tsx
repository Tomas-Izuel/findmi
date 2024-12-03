"use client";

import { motion } from "framer-motion";
import Sending from "../common/Lotties/Sending";

export default function ConfirmationMessage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center text-secondary h-full flex flex-col justify-center items-center mt-32"
    >
      <h2 className="text-2xl font-bold mb-4">¡Registro Exitoso!</h2>
      <Sending className="w-full flex justify-center" />
      <p className="mb-4">
        Te enviamos un correo para confirmar tu dirección de email. Verificá tu
        bandeja de entrada y hacé click en el link para completar el registro.
      </p>
      <p className="text-sm text-gray-500">
        Si no recibis el correo en unos minutos, revisa tu carpeta de spam.
      </p>
    </motion.div>
  );
}
