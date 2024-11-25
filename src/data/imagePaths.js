// Rutas de las carpetas para las imágenes, con todas las imágenes disponibles en cada subcarpeta y detalles adicionales
const folderPaths = [
  {
    path: 'actasFoliadas/actaNacimiento',
    nombre: 'Actas de nacimiento',
    descripcion: 'Reverso, 1 página',
    costo: 130,
    requisitos: [
      'CURP',
      'CADENA (Código de verificación)'
    ],
    images: ['img1.png']
  },
  {
    path: 'actasFoliadas/defuncion',
    nombre: 'Acta de Defunción',
    descripcion: 'Documento que certifica la defunción de una persona',
    costo: 50,
    requisitos: ['CURP'],
    images: ['img1.png']
  },
  {
    path: 'actasFoliadas/divorcio',
    nombre: 'Acta de Divorcio',
    descripcion: 'Certificado legal del divorcio de una pareja',
    costo: 75,
    requisitos: ['CURP'],
    images: ['img1.png']
  },
  {
    path: 'actasFoliadas/matrimonio',
    nombre: 'Acta de Matrimonio',
    descripcion: 'Documento oficial que certifica el matrimonio',
    costo: 100,
    requisitos: ['CURP'],
    images: ['img1.png']
  },
  {
    path: 'afiliacionImss',
    nombre: 'Afiliación IMSS',
    descripcion: 'Consulta de tu afiliación en el IMSS',
    costo: 30,
    requisitos: ['Número de Seguridad Social (NSS)'],
    images: ['img1.png', 'img2.png', 'img3.png']
  },
  {
    path: 'afiliacionIsste',
    nombre: 'Afiliación ISSSTE',
    descripcion: 'Consulta de tu afiliación en el ISSSTE',
    costo: 30,
    requisitos: ['Número de Seguridad Social (NSS)'],
    images: ['img1.png', 'img2.png', 'img3.png']
  },
  {
    path: 'antecedentesPenales',
    nombre: 'Antecedentes No Penales',
    descripcion: 'Certificado de antecedentes no penales',
    costo: 40,
    requisitos: ['INE por ambos lados'],
    images: ['img1.png', 'img2.png', 'img3.png']
  },
  {
    path: 'cartaInfonavit',
    nombre: 'Carta de Retención Infonavit',
    descripcion: 'Documento para retención de crédito Infonavit',
    costo: 50,
    requisitos: ['Número de crédito'],
    images: ['img1.png', 'img2.png', 'img3.png']
  },
  {
    path: 'cfe',
    nombre: 'Recibo CFE',
    descripcion: 'Consulta y descarga de recibo de luz CFE',
    costo: 10,
    requisitos: ['Nombre del titular', 'Número de cuenta'],
    images: ['img1.png', 'img2.png', 'img3.png']
  },
  {
    path: 'cuentaInfonavit',
    nombre: 'Estado de Cuenta Infonavit',
    descripcion: 'Consulta del estado de cuenta Infonavit',
    costo: 130,
    requisitos: ['Número de crédito'],
    images: ['img1.png', 'img2.png', 'img3.png']
  },
  {
    path: 'nss',
    nombre: 'Número de Seguro Social (NSS)',
    descripcion: 'Asignación de número de seguro social',
    costo: 25,
    requisitos: ['CURP'],
    images: ['img1.png', 'img2.png', 'img3.png']
  }
];

export default folderPaths;
