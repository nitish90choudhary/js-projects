//http://www.omdbapi.com/?apikey=6af8666c&s=dark

const autoCompleteConfig = {
    renderOption(movie) {
        const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
        return `
        <img src="${imgSrc}" />
        ${movie.Title}  (${movie.Year})
        `;
    },
    inputValue(movie) {
        return movie.Title;
    },
    async fetchData(searchKey) {
        const response = await axios.get('http://www.omdbapi.com', {
            params: {
                apikey: '6af8666c',
                s: searchKey
            }
        });
        if (response.data.Error) {
            return [{
                Title: response.data.Error
            }];
        }
        return response.data.Search;
    }
}
createAutoComplete({
    ...autoCompleteConfig,
    root: document.querySelector('#left-auto-complete'),
    onOptionSelect(movie) {
        document.querySelector('.tutorial').classList.add('is-hidden');
        onMovieSelect(movie, document.querySelector('#left-summary'), 'left');
    }
});

createAutoComplete({
    ...autoCompleteConfig,
    root: document.querySelector('#right-auto-complete'),
    onOptionSelect(movie) {
        document.querySelector('.tutorial').classList.add('is-hidden');
        onMovieSelect(movie, document.querySelector('#right-summary'), 'right');
    }
});

let rightMovie, leftMovie;
const onMovieSelect = async (movie, summaryElement, side) => {
    const movieDetail = await axios.get('http://www.omdbapi.com', {
        params: {
            apikey: '6af8666c',
            i: movie.imdbID
        }
    });
    //console.log(movieDetail.data);
    summaryElement.innerHTML = movieTemplate(movieDetail.data);

    if (side === 'left')
        leftMovie = movieDetail.data;
    else if (side === 'right')
        rightMovie = movieDetail.data;
    //comparison
    if (leftMovie && rightMovie)
        runComparison();
};
const runComparison = () => {
    const leftSideStats = document.querySelectorAll('#left-summary .notification');

    const rightSideStats = document.querySelectorAll('#right-summary .notification');
    leftSideStats.forEach((leftStat, index) => {
        const rightStat = rightSideStats[index];
        if (leftStat.dataset.value < rightStat.dataset.value) {
            leftStat.classList.remove('is-primary');
            leftStat.classList.add('is-warning');
        } else {
            rightStat.classList.remove('is-primary');
            rightStat.classList.add('is-warning');
        }
    });
}
const movieTemplate = (movieDetail) => {
    const dollar = parseInt(movieDetail.BoxOffice.replace(/\$/g, '').replace(/,/g, ''));
    const award = movieDetail.Awards.split(' ').reduce((prev, word) => {
        const value = parseInt(word);
        if (isNaN(value)) return prev;
        else return prev + value;
    }, 0);

    console.log(dollar, award)

    return `
    <article class="media">
        <figure class="media-left">
            <p class="image">
                <img src="${movieDetail.Poster}"/>
            </p>
        </figure>
        <div class ="media-content">
            <div class ="content">
                <h1>${movieDetail.Title}</h1>
                <h4>${movieDetail.Genre}</h4>
                <p>${movieDetail.Plot}</p>
            </div>
        </div>
    </article>
    <article data-value="${award}" class="notification is-primary">
        <p class="title">${movieDetail.Awards}</p>
        <p class="sub-title">Awards</p>
    </article>
    <article data-value="${dollar}" class="notification is-primary">
        <p class="title">${movieDetail.BoxOffice}</p>
        <p class="sub-title">Box Office</p>
    </article>
    <article data-value="${parseInt(movieDetail.Metascore)}" class="notification is-primary">
        <p class="title">${movieDetail.Metascore}</p>
        <p class="sub-title">Metascore</p>
    </article>
    <article data-value="${parseFloat(movieDetail.imdbRating)}" class="notification is-primary">
        <p class="title">${movieDetail.imdbRating}</p>
        <p class="sub-title">IMDB Ratings</p>
    </article>
    <article data-value="${parseInt(movieDetail.imdbVotes)}" class="notification is-primary">
        <p class="title">${movieDetail.imdbVotes}</p>
        <p class="sub-title">IMDB Votes</p>
    </article>
`;
};