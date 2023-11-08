let students = [
  {
    id: 1,
    name: "Rayhan",
    department: "Computer Science",
    year: "2023 - present",
  },
  {
    id: 2,
    name: "Maruf",
    department: "Physics",
    year: "2023 - present",
  },
  {
    id: 3,
    name: "Yakub",
    department: "Science",
    year: "2023 - present",
  },
  {
    id: 4,
    name: "Tarek",
    department: "Computer Science",
    year: "2023 - present",
  },
];

const results = [
  {
    id: 10,
    studentId: 1,
    exam: "Half Year Exam",
    subjects: {
      bangla: 20,
      english: 50,
      math: 33,
      science: 60,
    },
  },
]

function studentResulit(studentId) {
  let id;
  let studentid;
  const newStudent = students.filter(student =>{
    if (student.id === studentId) {
      console.log(student);
      id = student.id
      studentid = studentId
      return student
    }
  })
  // console.log(newStudent);
  // console.log(studentid);
  const subjects = {
    ...newStudent[0],
    result: {
      id: id,
      studentId: studentid,
      exam: "Half Year Exam",
      subjects: {
        bangla: 20,
        english: 50,
        math: 33,
        science: 60,
      }
    }
    }
  students.push(subjects)
  students = subjects;
  console.log(students);
}

studentResulit(3)

