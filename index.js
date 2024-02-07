import express from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import cors from 'cors';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(express.static('public')); 

app.use(bodyParser.urlencoded({ extended: false })); // Parse URL-encoded forms

// Placeholder for database functionality (replace with your database logic)
const tasks = [];

app.use(cors()); // Allow all origins for simplicity (secure for production)

// Set the view engine
app.set('view engine', 'ejs');

// GET route for the main page
app.get('/', (req, res) => {
  res.render('index', {tasks: tasks});
});


// POST route for handling form submissions
app.post('/task', (req, res) => {
  //Logic below here
  const taskName = req.body.task_name;
    tasks.push({
        name: taskName
    }); // Add to placeholder array
  res.redirect('/');
});


// Add a new route for handling delete requests
app.post('/delete/:id', (req, res) => {
  const taskId = req.params.id;
  // Logic to delete the task with the specified ID
  tasks.splice(taskId, 1);
  res.redirect('/');
});

// Add a new route for handling Update requests
app.post('/update/:id', (req, res) => {
const taskId = req.params.id;
const updatedTaskName = req.body.updated_task_name;
  
  // Check if the task ID is valid
  if (taskId >= 0 && taskId < tasks.length) {
    // Update the task name
    tasks[taskId].name = updatedTaskName;
  }
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

