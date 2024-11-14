import folderPaths from 'components/home/componentsHome/MoreServices/data/imagePaths';

const tramiteData = folderPaths.map((folder, index) => ({
  id: index.toString(),
  nombre: folder.nombre,
  descripcion: folder.descripcion,
  costo: folder.costo,
  requisitos: folder.requisitos,
  mainImageUrl: `${process.env.PUBLIC_URL}/img/tramites/${folder.path}/${folder.images[0]}`,
  allImages: folder.images.map(
    (image) => `${process.env.PUBLIC_URL}/img/tramites/${folder.path}/${image}`
  ),
}));

export default tramiteData;
