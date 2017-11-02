//Data Controller
var dataController = (function(){
	var data = {
		students: [],
	}

	//Student constructor
	function Student(option,addStudent,addGrade){
		this.option = option;
		this.addStudent = addStudent;
		this.addGrade = addGrade;
	}
	Student.prototype.getInfo = function(){
		return this.option + this.addStudent + this.addGrade;
	}

	function addStudent(option,addStudent,addGrade){
		var student = new Student(option,addStudent,addGrade);

		data.students.push(student);

		return student;
	}

	return {
		addStudent: addStudent,
	}
})();


//UI Controller
var UIController = (function(){
	var DOMStrings = {
		selectOpt: '.add-subject',
		addStudent: '.add-student-name',
		addGrade: '.add-grade',
		buttonAdd: '.add-btn',
		divPassed: '.passed-list',
		divFailed: '.failed-list'
	}

	function collectInput(){
		var selectElement = document.querySelector(DOMStrings.selectOpt);
		var selectOption = selectElement.options[selectElement.selectedIndex];
		var addStudentElement = document.querySelector(DOMStrings.addStudent);
		var addGradeElement = document.querySelector(DOMStrings.addGrade);

		var result = {
			option: selectOption.value,
			addStudent: addStudentElement.value,
			addGrade: addGradeElement.value

		}
        return result;
        
    }
    
    function getLog(inputString){
        return console.log(inputString);
    }

	function displayStudent(student){
        var gradeValue = collectInput().addGrade
        if (gradeValue=5) {
			var grade = document.querySelector(DOMStrings.divFailed);
			var htmlItem = "<li>" + student.getInfo(); + "</li>"
			grade.insertAdjacentHTML('beforeend', htmlItem);
		}else if (gradeValue>5) {
			var grade = document.querySelector(DOMStrings.divPassed);
			var htmlItem = "<li>" + student.getInfo(); + "</li>"
			grade.insertAdjacentHTML('beforeend', htmlItem);
        }
        return grade;
	}

	function getDOMStrings(){
		return DOMStrings;
	}

	return {
		getInput: collectInput,
		getDOMStrings: getDOMStrings,
        displayStudent: displayStudent,
        consoleLog:getLog
	}
})();


//Main Controller
var mainController = (function(dataCtrl,UICtrl){
	function setupEventListeners(){
		var DOM = UICtrl.getDOMStrings();

		document.querySelector(DOM.buttonAdd).addEventListener('click',function(){
			ctrlAddstudent();
		});
	}

	function ctrlAddstudent(){
		//get form data
		var input = UICtrl.getInput();

		//add student to list
        var student = dataCtrl.addStudent(input.option,input.addStudent,input.addGrade);
        
        UICtrl.displayStudent(student);
	}



	return {
        init: function () {
            console.log("App has started");
            setupEventListeners();
            
        }
    }
})(dataController,UIController);
mainController.init();
