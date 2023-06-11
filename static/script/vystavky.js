window.onload = function() {
    var searchResults = document.getElementById('scrollTo');
    if (searchResults) {
        window.scrollTo({
            top: searchResults.offsetTop,
            behavior: 'smooth'
        });
    }
};