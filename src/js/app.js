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

    //Agregar imagen al modal
    const imagen = document.createElement('IMG')
    imagen.src = `src/img/gallery/full/${i}.jpg`;
    imagen.alt = 'Imagen Galeria'
   
    //Generar Ventana Modal
   const modal = document.createElement('DIV');
   modal.classList.add('modal')
   modal.onclick = cerrarModal
   modal.appendChild(imagen);
   
   //Agregar al HTML
   const body = document.querySelector('body');
   body.classList.add('overflow-hidden');
   body.appendChild(modal);

   
}

const cerrarModal = () => {

    const modal = document.querySelector('.modal');
    modal.classList.add('fade-out');

    setTimeout(() => {

        const body = document.querySelector('body');
        body.classList.remove('overflow-hidden');
        modal?.remove();

    }, 500);
    
    
}