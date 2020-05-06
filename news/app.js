//Guardian code
//Make API Call
const GUARDIAN_API = 'https://content.guardianapis.com/search?api-key=d166d4a0-85b1-457e-8523-2d31e8c610bb';

// USING XHR to call api
// const request = new XMLHttpRequest();

// request.addEventListener("load", () => {
//     const data = JSON.parse(request.responseText);
//     // console.log("Successful request to api: ", request);
//     makeNewsPage(data.response);
// });

// request.addEventListener("error", () => {
//     console.log("API Error!!");
// });

// request.open("GET", GUARDIAN_API);
// request.send();

/// USING FETCH API

fetch(GUARDIAN_API).then(response => {
    if (response.ok) {
        response.json().then(data => {
            makeNewsPage(data.response);
        });
    } else
        console.log('Error in responsee: ', response.status);
}).catch(err => console.log("Error fetching API :", err));

//const api = JSON.parse('{"response":{"status":"ok","userTier":"developer","total":2190389,"startIndex":1,"pageSize":10,"currentPage":1,"pages":219039,"orderBy":"newest","results":[{"id":"politics/live/2020/may/05/uk-coronavirus-live-contact-tracing-app-trial-begins-on-isle-of-wight","type":"liveblog","sectionId":"politics","sectionName":"Politics","webPublicationDate":"2020-05-05T11:55:35Z","webTitle":"UK coronavirus live: too early to reopen schools in Scotland, says Scottish government","webUrl":"https://www.theguardian.com/politics/live/2020/may/05/uk-coronavirus-live-contact-tracing-app-trial-begins-on-isle-of-wight","apiUrl":"https://content.guardianapis.com/politics/live/2020/may/05/uk-coronavirus-live-contact-tracing-app-trial-begins-on-isle-of-wight","isHosted":false,"pillarId":"pillar/news","pillarName":"News"},{"id":"world/live/2020/may/05/coronavirus-live-news-who-and-five-eyes-reject-chinese-lab-theory-as-global-deaths-pass-250000","type":"liveblog","sectionId":"world","sectionName":"World news","webPublicationDate":"2020-05-05T11:53:03Z","webTitle":"Coronavirus live news: WHO urges countries to investigate suspicious early cases after French find","webUrl":"https://www.theguardian.com/world/live/2020/may/05/coronavirus-live-news-who-and-five-eyes-reject-chinese-lab-theory-as-global-deaths-pass-250000","apiUrl":"https://content.guardianapis.com/world/live/2020/may/05/coronavirus-live-news-who-and-five-eyes-reject-chinese-lab-theory-as-global-deaths-pass-250000","isHosted":false,"pillarId":"pillar/news","pillarName":"News"},{"id":"business/live/2020/may/05/uk-car-sales-tumble-services-pmi-recession-covid-19-business-live","type":"liveblog","sectionId":"business","sectionName":"Business","webPublicationDate":"2020-05-05T11:47:56Z","webTitle":"UK car sales almost wiped out in April amid Covid-19 lockdown - business live","webUrl":"https://www.theguardian.com/business/live/2020/may/05/uk-car-sales-tumble-services-pmi-recession-covid-19-business-live","apiUrl":"https://content.guardianapis.com/business/live/2020/may/05/uk-car-sales-tumble-services-pmi-recession-covid-19-business-live","isHosted":false,"pillarId":"pillar/news","pillarName":"News"},{"id":"news/2020/may/05/fears-rise-nazanin-zaghari-ratcliffe-may-be-returned-to-iran-jail","type":"article","sectionId":"news","sectionName":"News","webPublicationDate":"2020-05-05T11:35:18Z","webTitle":"Fears rise Nazanin Zaghari-Ratcliffe may be returned to Iran jail","webUrl":"https://www.theguardian.com/news/2020/may/05/fears-rise-nazanin-zaghari-ratcliffe-may-be-returned-to-iran-jail","apiUrl":"https://content.guardianapis.com/news/2020/may/05/fears-rise-nazanin-zaghari-ratcliffe-may-be-returned-to-iran-jail","isHosted":false,"pillarId":"pillar/news","pillarName":"News"},{"id":"film/2020/may/05/i-was-overwhelmed-with-joy-match-the-cast-member-to-their-cats-quote","type":"article","sectionId":"film","sectionName":"Film","webPublicationDate":"2020-05-05T11:35:06Z","webTitle":"\'I was overwhelmed with joy\': match the Cats cast member to their quote","webUrl":"https://www.theguardian.com/film/2020/may/05/i-was-overwhelmed-with-joy-match-the-cast-member-to-their-cats-quote","apiUrl":"https://content.guardianapis.com/film/2020/may/05/i-was-overwhelmed-with-joy-match-the-cast-member-to-their-cats-quote","isHosted":false,"pillarId":"pillar/arts","pillarName":"Arts"},{"id":"business/2020/may/05/inflation-collapses-world-coronavirus-pandemic-global-economy-business-great-depression-recession","type":"article","sectionId":"business","sectionName":"Business","webPublicationDate":"2020-05-05T11:34:03Z","webTitle":"Inflation collapses around the world amid coronavirus pandemic","webUrl":"https://www.theguardian.com/business/2020/may/05/inflation-collapses-world-coronavirus-pandemic-global-economy-business-great-depression-recession","apiUrl":"https://content.guardianapis.com/business/2020/may/05/inflation-collapses-world-coronavirus-pandemic-global-economy-business-great-depression-recession","isHosted":false,"pillarId":"pillar/news","pillarName":"News"},{"id":"culture/2020/mar/13/coronavirus-culture-arts-films-gigs-festivals-cancellations","type":"article","sectionId":"culture","sectionName":"Culture","webPublicationDate":"2020-05-05T11:27:38Z","webTitle":"Coronavirus and culture – a list of major cancellations","webUrl":"https://www.theguardian.com/culture/2020/mar/13/coronavirus-culture-arts-films-gigs-festivals-cancellations","apiUrl":"https://content.guardianapis.com/culture/2020/mar/13/coronavirus-culture-arts-films-gigs-festivals-cancellations","isHosted":false,"pillarId":"pillar/arts","pillarName":"Arts"},{"id":"world/2020/may/05/painful-to-see-rise-in-russian-medics-falling-prey-to-covid-19-as-death-toll-questioned","type":"article","sectionId":"world","sectionName":"World news","webPublicationDate":"2020-05-05T11:25:28Z","webTitle":"\'Painful to see\': rise in Russian medics falling prey to Covid-19 as death toll questioned","webUrl":"https://www.theguardian.com/world/2020/may/05/painful-to-see-rise-in-russian-medics-falling-prey-to-covid-19-as-death-toll-questioned","apiUrl":"https://content.guardianapis.com/world/2020/may/05/painful-to-see-rise-in-russian-medics-falling-prey-to-covid-19-as-death-toll-questioned","isHosted":false,"pillarId":"pillar/news","pillarName":"News"},{"id":"world/2020/may/05/genetics-in-focus-after-coronavirus-deaths-of-siblings-and-twins","type":"article","sectionId":"world","sectionName":"World news","webPublicationDate":"2020-05-05T11:17:34Z","webTitle":"Genetics in focus after coronavirus deaths of siblings and twins","webUrl":"https://www.theguardian.com/world/2020/may/05/genetics-in-focus-after-coronavirus-deaths-of-siblings-and-twins","apiUrl":"https://content.guardianapis.com/world/2020/may/05/genetics-in-focus-after-coronavirus-deaths-of-siblings-and-twins","isHosted":false,"pillarId":"pillar/news","pillarName":"News"},{"id":"world/2020/may/05/uk-coronavirus-death-toll-rises-above-32000-to-highest-in-europe","type":"article","sectionId":"world","sectionName":"World news","webPublicationDate":"2020-05-05T11:10:56Z","webTitle":"UK coronavirus death toll rises above 32,000 to highest in Europe","webUrl":"https://www.theguardian.com/world/2020/may/05/uk-coronavirus-death-toll-rises-above-32000-to-highest-in-europe","apiUrl":"https://content.guardianapis.com/world/2020/may/05/uk-coronavirus-death-toll-rises-above-32000-to-highest-in-europe","isHosted":false,"pillarId":"pillar/news","pillarName":"News"}]}}');

//console.log('Guardian API response', api.response.results);


const newsSections = results => {
    const sections = new Set();
    results.forEach(element => sections.add(element.sectionName));
    console.log("sections: ", sections);
    return sections;
};

const makeNewsHeadlineItem = headline => {
    const parentDiv = document.createElement('div');
    parentDiv.classList.add('col-lg-4', 'col-md-6', 'col-sm-8');

    const divL1 = document.createElement('div');
    divL1.classList.add('single-blog', 'mt-30', 'wow', 'fadeInUpBig');
    divL1.setAttribute('data-wow-duration', '1s');
    divL1.setAttribute('data-wow-delay', '0.7s');

    const divImage = document.createElement('div');
    divImage.classList.add('blog-image');

    const blogImageLink = document.createElement('a');
    blogImageLink.href = '#';
    blogImageLink.innerHTML = '<img src= "assets/images/news-1.jpg" alt="image"/>'

    divImage.appendChild(blogImageLink);
    //console.log(divImage);

    const divContent = document.createElement('div');
    divContent.classList.add('blog-content');

    const blogTitle = document.createElement('h4');
    blogTitle.classList.add('blog-title');

    const blogLink = document.createElement('a');
    blogLink.href = '#';
    blogLink.innerText = headline;

    // 
    blogTitle.appendChild(blogLink);
    divContent.appendChild(blogTitle);
    //console.log(divContent);

    divL1.appendChild(divImage);
    divL1.appendChild(divContent);

    parentDiv.appendChild(divL1);

    return parentDiv;
};

const makeNewsPage = response => {

    //Create sections
    const row = document.querySelector("#blog > div > div:nth-child(2)");
    const sections = newsSections(response.results);

    sections.forEach(sec => {
        // const li = document.createElement('li');
        const secItem = document.createElement('h4');
        secItem.classList.add('sub-title');
        secItem.innerText = sec;
        // console.log(secItem);
        const item = document.createElement('div');
        item.classList.add('col-lg-2');
        //  console.log(item);
        const itemL2 = document.createElement('div')
        itemL2.classList.add('section-title', 'text-center', 'pb-20', 'wow', 'fadeInUp');
        // console.log(itemL2);

        itemL2.appendChild(secItem);
        item.appendChild(itemL2);
        //console.log(item);
        row.appendChild(item);
    });

    // Create news headlines
    const newsHeadlineRow = document.querySelector("#blog > div > div:nth-child(3)")
    for (let news of response.results)
        newsHeadlineRow.appendChild(makeNewsHeadlineItem(news.webTitle));

}