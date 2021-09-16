import axios from 'axios';

export default axios.create({
    baseURL :"http://localhost:3000"
});

//aca uso axios para que sea mas escalable el proyecto