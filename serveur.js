const app = require('express')();

app.get('/',(req, res)=>{
    function calc(a,b){
        return new Promise((resoleve, reject)=>{
            const s = a+b;
            if(s) return resoleve(s);
            reject();
        })
    }
    calc(1,3).then(result=>console.log(result)).catch(()=>console.log('error!!'))
}).listen(8081)
