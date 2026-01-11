import { v2 as cloudinary } from "cloudinary";

// Configurar Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export { cloudinary };

// Generar URL optimizada para imágenes
export function getOptimizedImageUrl(
  publicId: string,
  options?: {
    width?: number;
    height?: number;
    crop?: "fill" | "fit" | "scale" | "thumb";
    gravity?: "auto" | "face" | "center";
  }
) {
  const { width, height, crop = "fill", gravity = "auto" } = options || {};

  const transformations: string[] = ["q_auto", "f_auto"];

  if (width) transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);
  if (width || height) {
    transformations.push(`c_${crop}`);
    transformations.push(`g_${gravity}`);
  }

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformations.join(
    ","
  )}/${publicId}`;
}

// Generar firma para upload seguro desde el cliente
// Incluye transformación a 16:9 optimizado para móvil
export function generateUploadSignature(folder: string = "profiles") {
  const timestamp = Math.round(new Date().getTime() / 1000);

  // Transformación: crop a 16:9, resize a 1080px de ancho (óptimo para móvil retina)
  // c_fill: rellena el área recortando si es necesario
  // g_auto: detecta automáticamente el punto de interés (cara, objeto principal)
  // ar_16:9: aspect ratio 16:9
  // w_1080: ancho máximo 1080px
  // q_auto: calidad automática
  // f_auto: formato automático (webp en navegadores compatibles)
  const transformation = "c_fill,g_auto,ar_16:9,w_1080,q_auto,f_auto";

  // Parámetros que se van a firmar (solo los que se enviarán a Cloudinary)
  const paramsToSign = {
    timestamp,
    folder,
    transformation,
  };

  const signature = cloudinary.utils.api_sign_request(
    paramsToSign,
    process.env.CLOUDINARY_API_SECRET!
  );

  return {
    signature,
    timestamp,
    folder,
    transformation,
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
  };
}

// Eliminar imagen de Cloudinary
export async function deleteImage(publicId: string) {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error("Error deleting image from Cloudinary:", error);
    throw error;
  }
}
