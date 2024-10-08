//Nos avisa cuando el HTML está listo
document.addEventListener('DOMContentLoaded', () => {
   
    navegacionFija()
    crearGaleria()
    resaltarEnlance()
    scrollNav()

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

const resaltarEnlance = () => {

        document.addEventListener('scroll', () => {

           

        const sections = document.querySelectorAll('section');
        const enlaces = document.querySelectorAll('.navegacion-pr a');
        let actual = '';  

        //Detectar en que sección nos encontramos
        sections.forEach(section => {
            

            /*Detecta la distancia entre cada elemento hijo y su padre,
              en este caso, distancia hacia arriba entre section y body
            */

            const sectionTop = section.offsetTop;

            //Tomar la altura de un elemento
            const sectionHigh = section.clientHeight;
            
            //Detectar el section a traves de "if"
            if (window.scrollY >= (sectionTop - sectionHigh / 3) ) {
                
                actual = section.id;

            }

        });



        enlaces.forEach(enlace  => {
            if(enlace.getAttribute('href') === '#' + actual){
                enlace.classList.add('active');

            } else {
                enlace.classList.remove('active');
            }
        });
    })

   
            
}




const crearGaleria = () => {
    
    const CANTIDAD_IMAGENES = 16;
    const galeria = document.querySelector('.galeria-imagenes');

    for (let index = 1; index <= CANTIDAD_IMAGENES; index++) {
       const imagen = document.createElement('PICTURE')
       imagen.innerHTML = `
       <source srcset="build/img/gallery/thumb/${index}.avif" type="image/avif">
       <source srcset="build/img/gallery/thumb/${index}.webp" type="image/webp">
       <img loading="lazy" width="200" height="300" src="build/img/gallery/thumb/${index}.jpg" alt="imagen galeria">
   `;

       imagen.src = `src/img/gallery/thumb/${index}.jpg`;
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
    const imagen = document.createElement('PICTURE');
    imagen.innerHTML = `
    <source srcset="build/img/gallery/full/${i}.avif" type="image/avif">
    <source srcset="build/img/gallery/full/${i}.webp" type="image/webp">
    <img loading="lazy" width="200" height="300" src="build/img/gallery/thumb/${i}.jpg" alt="imagen galeria">
`;
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

const scrollNav = () => {
    const navLinks = document.querySelectorAll('.navegacion-pr a');
    
    navLinks.forEach(link => {
        link.addEventListener('click' ,(e) => {
           
            e.preventDefault();

            //Obtenemos el elemento html y su atributo 'href'
            sectionScroll = e.target.getAttribute('href');
            //Seleccionamos el elemento al cual le dimos click
            const section = document.querySelector(sectionScroll);

            //De esta manera indicamos que haga scroll hacia el elemento seleccionado
            section.scrollIntoView({behavior: 'smooth'})
        
        })
    });
}