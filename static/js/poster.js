const config = [
    {
        url: 'https://code-dream-star.github.io/code-blockly',
        img: './static/img/poster/Code-Blockly-2.0.png'
    },
    {
        url: 'https://cdstar.top',
        img: './static/img/poster/anniversary.png'
    },
    {
        url: 'https://cdstar.top',
        img: './static/img/poster/cdstar.png'
    },
    {
        url: 'https://cdstar.top',
        img: './static/img/poster/cdstar-onlie.png'
    },
    {
        url: 'https://cdstar.top',
        img: './static/img/poster/Code-Dream-Star-colorful.png'
    },
]
const posters = $('.posters')

for (let poster of config) {
    let el = $('<div class="poster"></div>')
    let img = $('<img></img>')
    img.attr('src', poster.img).appendTo(el)
    el.appendTo(posters);
}

let page = 1;

function getWidth() {
    return $(window).width() - 80
}
function update() {
    posters.children().each((index, poster) => {
        $(poster).css('transform', `translateX(${-((page - index) * getWidth())}px)`)
    })
}

update();