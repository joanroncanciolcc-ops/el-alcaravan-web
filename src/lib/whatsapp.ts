import { site } from '../data/site';

// WhatsApp es solo atención al cliente: información, consultas, horarios,
// ubicación y eventos. El restaurante no maneja pedidos ni domicilios.
export const DEFAULT_WHATSAPP_MESSAGE = 'Hola, quisiera más información sobre El Alcaraván.';

export function buildWhatsAppLink(message: string = DEFAULT_WHATSAPP_MESSAGE): string {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}