        
import express from 'express';
import restfql from 'express-restfql';
const app = express();
const port = 3000;

app.use(restfql)

app.get('/', (req, res) => {
  res.json({
    message: 'Hello World!', 
    description: "awesome description",
    tags:{
        mandatory: ["mand_tag1","mand_tag1"],
        optional:  ["opt_tag1","opt_tag1"],
    }
});
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});