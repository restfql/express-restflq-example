import express from 'express';
import gql from 'graphql-tag';
const app = express();
const port = 3000;

const filterResponse = (response: any, model: any, acc: any) =>{
    for (const field of model.selectionSet.selections) {
        acc[field.name.value] = field.selectionSet? filterResponse(response[field.name.value], field, {}) : response[field.name.value]
    }
    return acc
}

app.use((req, res: any, next)=>{
    var originalJson = res.json;
    res.json = (args: any) => {
        const query = gql`${req.query.model}`
        originalJson.apply(res,[filterResponse(args,query.definitions[0], {})]);
    };
    next();
})

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