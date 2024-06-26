import express from 'express';
import bodyParser from 'body-parser';
import { promises as fs } from 'fs';
// hardcoded values to use instead of a database
import people from './people';

const app = express();

// takes extra data sent with a POST request and puts it on to the end of the post endpoint
app.use(bodyParser.json());

// basic GET endpoint that just prints out Hello
app.get('/hello', (req, resp) => {
  resp.send('Hello');
});

// GET endpoint to get all people objects
app.get('/people', (req, resp) => {
  resp.json(people);
});

// GET endpoint to get a specific person object
app.get('/people/:name', (req, resp) => {
  const { name } = req.params;

  const person = people.find((x) => x.name.toUpperCase === name.toUpperCase);

  resp.json(person);
});

// GET endpoint to get people data from people-data.json file
app.get('/file-data', async (req, resp) => {
  const data = await fs.readFile(`${__dirname}/people-data.json`);
  const peeps = JSON.parse(data);

  resp.json(peeps);
});

app.post('/people', (req, resp) => {
  const newPerson = req.body;
  people.push(newPerson);
  resp.json(people);
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
