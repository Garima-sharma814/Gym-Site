const topBtn = document.getElementById("top");

window.onScroll = function () {
    scrollFunction();
};

function scrollFunction() {
    let scrollWindow = window.scrollY;
    if (scrollWindow / window.innerHeight > 0.5) {
        topBtn.style.display = 'block';
    }
    else {
        topBtn.style.display = 'none';
    }
}

function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}