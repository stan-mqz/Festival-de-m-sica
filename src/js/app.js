//Nos avisa cuando el HTML está listo
document.addEventListener('DOMContentLoaded', () => {
   
    navegacionFija();
    resaltarNavegacion();
    crearGaleria();
});

const navegacionFija = () => {
     const header = document.querySelector('.header');
     const sobreFestival = document.querySelector('.sobre-festival');

     window.addEventListener('scroll', () => {
        /*Esto hace puedas detectar las coordenadas de tu scroll,
        es decir, calculará que tan lejos estás del final del contenedor
        seleccionado, por lo tanto, si estas arriba de él, seran coordenadas
        positivas, sino, serán negativas
        */
       const coordenadas = sobreFestival.getBoundingClientRect().bottom;

        if (coordenadas < 1) {

            header.classList.add('fixed')
            
        } else {

            header.classList.remove('fixed')
            
        }
        
     })
}

const resaltarNavegacion = () => {

    const lineUp = document.querySelector('#lineup');
    const galeria = document.querySelector('#galeria');
    const enlaces = document.querySelectorAll('a');

    window.addEventListener('scroll', () => {
        
    const coordenadasLineup = lineUp.getBoundingClientRect().bottom;
    const coordenadasGaleria = galeria.getBoundingClientRect().bottom;


        if (coordenadasLineup > 1) {

            enlaces[0].classList.add('highligth-menu');
            enlaces[1].classList.remove('highligth-menu');
            
            
        } else if (coordenadasGaleria > 1) {

            enlaces[0].classList.remove('highligth-menu');
            enlaces[1].classList.add('highligth-menu');
            enlaces[2].classList.remove('highligth-menu');
            
            
        } else {
            
            enlaces[1].classList.remove('highligth-menu');
            enlaces[2].classList.add('highligth-menu');
            
        }

    })
    
}

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
   
    //Botón cerrar modal
    const cerrarModalBtn = document.createElement('BUTTON');
    cerrarModalBtn.textContent = 'X';
    cerrarModalBtn.classList.add('btn-cerrar');
    cerrarModalBtn.onclick = cerrarModal;
    modal.appendChild(cerrarModalBtn);

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