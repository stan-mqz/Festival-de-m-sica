//Extraer e importar las dependencias
import {src, dest, watch, series } from "gulp"
import * as dartSass from "sass"
import gulpSass from 'gulp-sass'

//Crear una función que le dice a gulp que utilice las funciones de sass
const sass = gulpSass(dartSass)

export function js(done) {

    src("src/js/app.js")
        .pipe(dest("build/js"))
    
    done()
}

//Funcion que compila el sass
export function css(done){

    src("src/scss/app.scss", {sourcemaps: true}) //Encontrar la ruta
        .pipe( sass().on("error", sass.logError) ) //Llama la funcion "sass" para compilar e imprime errores 
        .pipe(dest("build/css", {sourcemaps: true}))//Donde almacenar este archivo

    done()
}

//Funcion que se ejecuta y observa el archivo sass
export function dev() {
    watch("src/scss/**/*.scss", css ) 
    watch("src/js/**/*.js", js ) 
    //Archivo que vas a obtener y funcion que ejecuta el código
}

export default series(js,css,dev)