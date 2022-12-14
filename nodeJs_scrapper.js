const axios = require('axios');
const cheerio = require('cheerio');

const fetchGames = async()=>{
    try{
        const response = await axios.get('https://www.amazon.com/s?i=specialty-aps&bbn=16225005011&rh=n%3A%2116225005011%2Cn%3A17720255011&ref=nav_em__nav_desktop_sa_intl_baby_care_0_2_10_5');
        const html = response.data;
        const $ = cheerio.load(html);
        const games = [];
        $('div.sg-col-4-of-12.s-result-item.s-asin.sg-col-4-of-16.sg-col.s-widget-spacing-small.sg-col-4-of-20').each((index,el)=>{
            const game = $(el);
            const title =game.find('span.a-size-base-plus.a-color-base.a-text-normal').text();
            games.push(title);
        });
        return games;
    }catch(err){
        console.log(err);
    }
};
fetchGames().then(game=>console.log(game));
