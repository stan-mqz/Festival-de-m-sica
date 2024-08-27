//Nos avisa cuando el HTML está listo
document.addEventListener('DOMContentLoaded', () => {
    crearGaleria();
});

const crearGaleria = () => {
    
    const CANTIDAD_IMAGENES = 16;
    const galeria = document.querySelector('.galeria-imagenes');

    for (let index = 1; index <= CANTIDAD_IMAGENES; index++) {
       const imagen = document.createElement('IMG')
       imagen.src = `src/img/gallery/full/${index}.jpg`;
       imagen.alt = 'Imagen Galeria'
       console.log(imagen);
       
       galeria.appendChild(imagen)
    }

};