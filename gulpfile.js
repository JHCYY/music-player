const {series,src,dest,watch} = require('gulp');
// js压缩
const {default:uglify} = require('gulp-uglify-es');
// html压缩
const htmlClean = require('gulp-htmlclean');
// less编译
const less = require('gulp-less');
// css压缩
const cleanCss = require('gulp-clean-css');
// 图片压缩
const imagemin = require('gulp-imagemin');
// 配置服务器
const connect = require('gulp-connect');
// 配置路径
const folder ={
    src:'./src',
    dist:'./dist'
}

function font(){
    return src(`${folder.src}/font/*`)
    .pipe(dest(`${folder.dist}/font`)) 
}
function html(){
    return src(`${folder.src}/html/*`)
        .pipe(htmlClean())
        .pipe(dest(`${folder.dist}`)) 
}
function css(){
    return src(`${folder.src}/css/*`)
        .pipe(less())
        .pipe(cleanCss())
        .pipe(dest(`${folder.dist}/css`)) 
}
function js(){
    return src(`${folder.src}/js/*`)
        // .pipe(uglify())
        .pipe(dest(`${folder.dist}/js`)) 
}
function img(){
    return src(`${folder.src}/img/*`)
        .pipe(dest(`${folder.dist}/img`)) 
}
function server(){
    return connect.server({
        root:'dist',
        port:8080,
        livereload: true
    })
}
watch(`${folder.src}/html/*`,function(){
    return html().pipe(connect.reload());
})
watch(`${folder.src}/css/*`,function(){
    return css().pipe(connect.reload());
})
watch(`${folder.src}/js/*`,function(){
    return js().pipe(connect.reload());
})
watch(`${folder.src}/img/*`,function(){
    return img();
})
exports.default = series(html,font,css,js,img,server)