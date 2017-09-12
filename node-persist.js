// Load module node-persist

var storage = require('node-persist');

// ham khoi tao
// Load dữ liệu đã lưu trữ trên ổ đĩa

storage.initSync({
 dir : "students" // Cấu hình nơi lưu trữ dữ liệu nằm trong thư mục students
});

// Hàm lấy danh sách sinh viên

function getAllStudents() {
    var students = storage.getItemSync('students'); 
    // Nếu không có sinh viên thì trả về mảng rỗng.
    if (typeof students === "undefined") {
        return [];
    }

    // Ngược lại sẽ trả về danh sách sinh viên

    return students;
}

// Hàm lấy chi tiết sinh viên

function getStudent (studentId) {
    // lấy danh sách sinh viên được tìm thấy
    var students = getAllStudents();
    // Biến lưu sinh viên được tìm thấy
    var matchStudent = null;

    // Lặp sinh viên để tìm thấy

    for(var i = 0; i < students.length; i++) {
        if (studentId === students[i].id) {
            matchStudent = students[i];
            break;
        }
    }
    
    return matchStudent;
}

// Hàm thêm một sinh viên
function addStudent(id, fullname) {
    var students = getAllStudents();
    students.push({
        id: id,
        fullname: fullname
    });

    storage.setItemSync('students', students);
}
// Hàm xóa sinh viên
function removeStudent(studentId) {
    var students = getAllStudents();
    
    for(var i = 0; i < students.length; i++) {
        if (students[i].id === studentId) {
            students.splice(i, 1);
        }
    }

    storage.setItemSync('students', students);
}
// Hàm sửa sinh viên
function editStudent(studentId, studentName) {
    
  var students = getAllStudents();

  for(var i = 0; i < students.length; i++) {
      if (students[i].id === studentId)  {
          students[i].fullname = studentName;
      }
  }

  storage.setItemsync('students', students);
}

// hàm hiển thị danh sách sinh viên

function showStudents() {
    var students = getAllStudents();
    students.forEach(function(student) {
        console.log('Student: ' + student.fullname + '('+ student.id + ')');
    });
}
addStudent(1, 'Cường');
addStudent(2, 'Duy');
addStudent(3, 'Hoa');
addStudent(4, 'Thien');

showStudents();
