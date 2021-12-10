const { src, dest, watch, parallel } = require('gulp');

//CSS
const sass = require('gulp-sass')(require('sass')); //Dependencia "sass"
const plumber = require('gulp-plumber'); //Dependencia "gulp-plumber"

//Imagenes(haciendo mas ligeras la imagenes sin perder calidad en varios formatos)
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin'); //Dependencia "gulp-imagemin"(Version = 7.1.0 funcionando (version 8 no funciona))a formato JPG
const webp = require('gulp-webp'); //Dependencia "gulp-webp" a formato WEBP
const avif = require('gulp-avif'); //Dependencia "gulp-avif" a formato AVIF

function css(done) {
    //Identificar el archivo .SCSS a compilar
    src('src/scss/**/*.scss') //Para hacer que escuche todos los cambios de todos los scss usamos "**/*.scss"
        .pipe(plumber())
        .pipe(sass()) //Compilarlo
        .pipe(dest('build/css')); //Almacenarlo en el disco duro
    done();
}

function imagenes(done) {
    const opciones = {
        optimizationLevel: 3,
    };
    src('src/img/**/*.{png,jpg}') //Para convertir todas las imagenes y las extensiones deben separadas por "," pero sin espacio
        .pipe(cache(imagemin(opciones)))
        .pipe(dest('build/img'));
    done();
}

function versionWebp(done) {
    const opciones = {
        quality: 50,
    };
    src('src/img/**/*.{png,jpg}') //Para convertir todas las imagenes y las extensiones deben separadas por "," pero sin espacio
        .pipe(webp(opciones)) //Calidad de la imagen
        .pipe(dest('build/img')); //Almacenarlo en el disco duro
    done();
}

function versionAvif(done) {
    const opciones = {
        quality: 50,
    };
    src('src/img/**/*.{png,jpg}') //Para convertir todas las imagenes y las extensiones deben separadas por "," pero sin espacio
        .pipe(avif(opciones)) //Calidad de la imagen
        .pipe(dest('build/img')); //Almacenarlo en el disco duro
    done();
}

function dev(done) {
    watch('src/scss/**/*.scss', css);

    done();
}

exports.css = css;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel(imagenes, versionWebp, versionAvif, dev);
