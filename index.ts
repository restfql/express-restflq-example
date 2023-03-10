import express from 'express';
const app = express();
const port = 3000;

app.use((req, res: any, next)=>{
    var originalSend = res.send;
    res.send = function(args: any){
        console.log(args)
        originalSend.apply(res,["something else"]);
    };
    next();
})

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});