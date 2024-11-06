// Este archivo define `shippingAddress`, un arreglo de objetos que contiene una lista de direcciones de envío
// predefinidas con sus detalles completos, como el nombre del destinatario, dirección, ciudad, estado, código postal
// y número de teléfono. Este arreglo sirve como un conjunto de datos para la gestión de direcciones de envío
// dentro de la aplicación, facilitando la visualización, selección y modificación de direcciones por parte del usuario.
//
// En un flujo de ecommerce, `shippingAddress` puede utilizarse en componentes como formularios de pago o
// selección de dirección de envío, permitiendo que el usuario elija entre varias direcciones o verifique la
// información antes de completar una compra.
export const shippingAddress = [
  {
    id: 1,
    name: 'Antony Hopkins',
    street: '2392 Main Avenue',
    city: 'Pensaukee',
    state: 'New Jersey',
    zip: '02139',
    phone: '+(856) 929-229'
  },
  {
    id: 2,
    name: 'Robert Bruce',
    street: '3448 Ile De France St #242',
    city: 'Fort Wainwright',
    state: 'Alaska',
    zip: '99703',
    phone: '+(901) 637-734'
  }
];
