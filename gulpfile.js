//Extraer e importar las dependencias
import path from 'path'
import fs from 'fs'
import {src, dest, watch, series } from "gulp"
import * as dartSass from "sass"
import gulpSass from 'gulp-sass'

//Crear una función que le dice a gulp que utilice las funciones de sass
const sass = gulpSass(dartSass)


import terser from "gulp-terser"
import sharp from 'sharp'
import { glob } from 'glob'

export function js(done) {

    src("src/js/app.js")

        .pipe(terser())
        .pipe(dest("build/js"))
    
    done()
}

//Funcion que compila el sass
export function css(done){

    src("src/scss/app.scss", {sourcemaps: true}) //Encontrar la ruta
        .pipe( sass({
            outputStyle: 'compressed'
        }).on("error", sass.logError) ) //Llama la funcion "sass" para compilar e imprime errores 
        .pipe(dest("build/css", {sourcemaps: true}))//Donde almacenar este archivo

    done()
}



export async function crop(done) {
    const inputFolder = 'src/img/gallery/full'
    const outputFolder = 'src/img/gallery/thumb';
    const width = 250;
    const height = 180;
    if (!fs.existsSync(outputFolder)) {
        fs.mkdirSync(outputFolder, { recursive: true })
    }
    const images = fs.readdirSync(inputFolder).filter(file => {
        return /\.(jpg)$/i.test(path.extname(file));
    });
    try {
        images.forEach(file => {
            const inputFile = path.join(inputFolder, file)
            const outputFile = path.join(outputFolder, file)
            sharp(inputFile) 
                .resize(width, height, {
                    position: 'centre'
                })
                .toFile(outputFile)
        });

        done()
    } catch (error) {
        console.log(error)
    }
}


export async function imagenes(done) {
    const srcDir = './src/img';
    const buildDir = './build/img';
    const images =  await glob('./src/img/**/*{jpg,png}')

    images.forEach(file => {
        const relativePath = path.relative(srcDir, path.dirname(file));
        const outputSubDir = path.join(buildDir, relativePath);
        procesarImagenes(file, outputSubDir);
    });
    done();
}

function procesarImagenes(file, outputSubDir) {
    if (!fs.existsSync(outputSubDir)) {
        fs.mkdirSync(outputSubDir, { recursive: true })
    }
    const baseName = path.basename(file, path.extname(file))
    const extName = path.extname(file)
    const outputFile = path.join(outputSubDir, `${baseName}${extName}`)
    const outputFileWebp = path.join(outputSubDir, `${baseName}.webp`)
    const outputFileAvif = path.join(outputSubDir, `${baseName}.avif`)

    const options = { quality: 80 }
    sharp(file).jpeg(options).toFile(outputFile)
    sharp(file).webp(options).toFile(outputFileWebp)
    sharp(file).avif().toFile(outputFileAvif)
}

//Funcion que se ejecuta y observa el archivo sass
export function dev() {
    watch("src/scss/**/*.scss", css ) 
    watch("src/js/**/*.js", js ) 
    watch("src/js/**/*.{png, jpg}", imagenes ) 
    //Archivo que vas a obtener y funcion que ejecuta el código
}

export default series(crop, js,css, imagenes, dev)