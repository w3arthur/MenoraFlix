
const server = {
    AXIOS_BASE_URL: process.env?.NODE_ENV === 'development'  
            ? 'http://10.0.2.2:3500/menoraflix'
            : 'https://geo-trivia.com/menoraflix'
};
export default server;