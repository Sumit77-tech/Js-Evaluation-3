function Employee(name, age, salary) {
    this.name = name;
    this.age = age;
    this.salary = salary;
}

Employee.prototype.displayName = function() {
    return this.name;
};

Employee.prototype.increaseAge = function() {
    this.age += 1;
    return this.age;
};

Employee.prototype.decreaseAge = function() {
    this.age -= 1;
    return this.age;
};

Employee.prototype.displaySalary = function() {
    return this.salary;
};

function Manager(name, age, salary, department) {
    Employee.call(this, name, age, salary);
    this.department = department;
}
Manager.prototype = Object.create(Employee.prototype);
Manager.prototype.constructor = Manager;

Manager.prototype.displayDepartment = function() {
    return this.department;
};

Manager.prototype.increaseSalary = function(employee, amount) {
    employee.salary += amount;
    return employee.salary;
};
let employee1 = new Employee("Sumit", 24, 50000);
console.log(employee1.displayName()); 
console.log(employee1.increaseAge()); 
console.log(employee1.displaySalary()); 

let manager1 = new Manager("Rahul", 37, 70000, "Engineering");
console.log(manager1.displayName()); 
console.log(manager1.displayDepartment()); 
console.log(manager1.increaseSalary(employee1, 5000)); 
