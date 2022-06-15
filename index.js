function createEmployeeRecord(array) {
    const obj = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
        return obj
}
function createEmployeeRecords(arrays) {
    return arrays.map(array => {
        return createEmployeeRecord(array)
  }) 
}
function createTimeInEvent(employee, dateStamp) {
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(dateStamp.slice(11, 15)),
        date : dateStamp.slice(0, 10)
    })
    return employee
}
function createTimeOutEvent(employee, dateStamp) {
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(dateStamp.slice(11, 15)),
        date : dateStamp.slice(0, 10)
    })
    return employee
}
function hoursWorkedOnDate(employee, dateStamp) {
    const index = employee.timeOutEvents.findIndex(object => {
      return object.date === dateStamp;
    });
      let hoursWorked = employee.timeOutEvents[index].hour - employee.timeInEvents[index].hour;
      hoursWorked = hoursWorked.toString().slice(0, -2)
      hoursWorked = parseInt(hoursWorked)
      return hoursWorked
  }
  function wagesEarnedOnDate(employee, dateStamp) {
    let wagesEarned = employee.payPerHour * hoursWorkedOnDate(employee, dateStamp);
    return wagesEarned
  }
  function allWagesFor(employee) {
    let daysWorked = employee.timeInEvents.map(object =>  object.date)
    let dailyPay = daysWorked.map(dateStamp =>  wagesEarnedOnDate(employee, dateStamp))
    const totalOwed = dailyPay.reduce((partialSum, a) => partialSum + a, 0)
    return totalOwed
  }
  function calculatePayroll(employees) {
    let listOfIndvWages = employees.map(employee => allWagesFor(employee))
    const totalToPay = listOfIndvWages.reduce((partialSum, a) => partialSum + a, 0)
    return totalToPay
  }