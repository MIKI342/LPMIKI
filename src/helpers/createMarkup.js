// Esta función `createMarkup` recibe un string `html` y devuelve un objeto con la propiedad `__html`.
// Esto es necesario en React cuando se quiere establecer HTML sin procesar en un componente usando `dangerouslySetInnerHTML`,
// como medida de precaución al incluir contenido HTML no controlado. 
//
// Uso:
// `dangerouslySetInnerHTML={createMarkup('<p>Texto con <strong>HTML</strong></p>')}`
// 
// Advertencia: Se debe usar con precaución, ya que puede introducir vulnerabilidades de XSS
// (Cross-Site Scripting) si se emplea con contenido HTML no seguro.

export default html => ({ __html: html });
