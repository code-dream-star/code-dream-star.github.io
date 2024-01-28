$(function () {
    function resize() {
        const history = $(".history")[0];
        history.style.setProperty('--history-max', ``);
        
        
        history.style.setProperty('--history-max', `${history.scrollWidth}px`);
    }
    $(window).on("resize", resize)
    resize();
});