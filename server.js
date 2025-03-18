const express = require('express');
const app = express();
const port = 7778;

app.use(express.json());

const students = [];

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Endpoint to add a student
app.post('/add-student', (req, res) => {
    console.log('/add-student called');
    console.log(req.body);
    const { name, marathiMarks, hindiMarks, englishMarks, scienceMarks, historyMarks } = req.body;
    const id = students.length > 0 ? Math.max(...students.map(student => student.id)) + 1 : 1;
    const student = { id, name, marathiMarks, hindiMarks, englishMarks, scienceMarks, historyMarks };
    students.push(student);
    res.status(201).send(student);
});

// Endpoint to fetch all students
app.get('/students', (req, res) => {
    console.log('/students called');
    res.send(students);
});

// Endpoint to delete a student
app.delete('/students/:id', (req, res) => {
    console.log('/students/:id called' + req.params);
    const { id } = req.params;
    const index = students.findIndex(student => student.id == id);
    if (index !== -1) {
        students.splice(index, 1);
        res.status(200).send({ message: 'Student deleted successfully' });
    } else {
        res.status(404).send({ message: 'Student not found' });
    }
});

// Endpoint to edit a student
app.put('/students/:id', (req, res) => {
    console.log(' Put /students/:id called' + req.params);
    const { id } = req.params;
    const { name, marathiMarks, hindiMarks, englishMarks, scienceMarks, historyMarks } = req.body;
    const student = students.find(student => student.id == id);
    if (student) {
        student.name = name;
        student.marathiMarks = marathiMarks;
        student.hindiMarks = hindiMarks;
        student.englishMarks = englishMarks;
        student.scienceMarks = scienceMarks;
        student.historyMarks = historyMarks;
        res.status(200).send(student);
    } else {
        res.status(404).send({ message: 'Student not found' });
    }
});
