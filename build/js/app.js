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

        //Event Handler
        imagen.onclick = () => {
            
            //Detecta en que imagen diste click e indica su índice
            mostrarImagen(index);
            
        }

       galeria.appendChild(imagen)
    }

};

const mostrarImagen = (i) => {
   
    //Generar Ventana Modal
   const modal = document.createElement('DIV');
   modal.classList.add('modal')
   modal.onclick = cerrarModal
   
   //Agregar al HTML
   const body = document.querySelector('body');
   body.appendChild(modal);

   
}

const cerrarModal = () => {

    const modal = document.querySelector('.modal');

    modal?.remove();
    
}