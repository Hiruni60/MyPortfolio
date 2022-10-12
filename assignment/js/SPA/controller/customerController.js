
//save customer


function saveCustomer(){
    // var customerObject ={CustomerCode,CustomerName,CustomerNIC,CustomerDOB,CustomerAddress,CustomerSalary}
    let CusCode=$("#customerCode").val()
    let CusName=$("#customerName").val()
    let CusNic=$("#customerNIC").val()
    let CusDob=$("#customerDOB").val()
    let CusAdd=$("#customerAddress").val()
    let CusSalary=$("#customerSalary").val()

    var customerObject ={CusCode,CusName,CusNic,CusDob,CusAdd,CusSalary}

    customerArray.push(customerObject)
    console.log(customerArray)

}

$("#saveCus").click(function (){
    alert("Customer Saved")
    saveCustomer()
    loadCustomer()
    bindRowClickEvents()
    clear()
})
//load customer//
function loadCustomer(){
    $("#CusTbody").empty()
    for(var i of customerArray){
        var raw=`<tr><td>${i.CusCode}</td><td>${i.CusName}</td><td>${i.CusNic}</td><td>${i.CusDob}</td><td>${i.CusAdd}</td><td>${i.CusSalary}</td></tr>`
        $("#CusTbody").append(raw)
    }
}

$("#viewAllCus").click(function () {
    loadCustomer();
});

//table row val select
function bindRowClickEvents() {
    $("#CusTbody>tr").click(function () {
        let code = $(this).children(":eq(0)").text();
        let name = $(this).children(":eq(1)").text();
        let nic = $(this).children(":eq(2)").text();
        let dob = $(this).children(":eq(3)").text();
        let address = $(this).children(":eq(4)").text();
        let salary = $(this).children(":eq(5)").text();

        $('#customerCode').val(code);
        $('#customerName').val(name);
        $('#customerNIC').val(nic);
        $('#customerDOB').val(dob);
        $('#customerAddress').val(address);
        $('#customerSalary').val(salary);

    });
}

//clear inputField
function clear(){
    $('#customerCode').val('')
    $('#customerName').val('')
    $('#customerNIC').val('')
    $('#customerDOB').val('')
    $('#customerAddress').val('')
    $('#customerSalary').val('')
}

//search customer
// $("#customerCode").on('keyup', function (event) {
//   if (event.code == "Enter") {
//     let typedId = $("#customerCode").val();
//     let customer = searchCustomer(typedId);
//     if (customer != null) {
//       setTestifiedValues(customer.cusCode, customer.cusName, customer.cusNic, customer.cusDob,customer.cusAddress,customer.cusSalary);
//     } else {
//       alert("There is no customer available for that " + typedId);
//       setTestifiedValues("", "", "", "","","");
//     }
//   }
// });



$("#searchBtn").click(function () {
    let typeCode=$("#txtSearch").val()
    let customer = searchCustomer(typeCode);
    if (customer != null) {
        $("#customerCode").val(customer.CusCode);
        $("#customerName").val(customer.CusName);
        $("#customerNIC").val(customer.CusNic);
        $("#customerDOB").val(customer.CusDob);
        $("#customerAddress").val(customer.CusAdd);
        $("#customerSalary").val(customer.CusSalary);
    }else {
        alert("error")
    }

});
function searchCustomer(CusId) {
    for (let customer of customerArray) {
        if (customer.CusCode == CusId) {
            return customer;
        }
    }
    return null;
}
function setTestifiedValues(code, name, nic, dob,address,salary) {
    $("#customerCode").val(code);
    $("#customerName").val(name);
    $("#customerNIC").val(nic);
    $("#customerDOB").val(dob);
    $("#customerAddress").val(address);
    $("#customerSalary").val(salary);
}

//update customer
$('#btnUpdate').click(function(){
    let customerCode=$('#customerCode').val()
    let response=updateCustomer(customerCode)
    if(response){
        // Swal.fire({
        //   title: 'Customer Updated Successfully',
        // })
        alert("updated")
        $('#customerCode').val('')
        $('#customerName').val('')
        $('#customerNIC').val('')
        $('#customerDOB').val('')
        $('#customerAddress').val('')
        $('#customerSalary').val('')
    }
    else{
        // Swal.fire("Update Failed" )
    }
})

function updateCustomer(cusCode) {
    let customer = searchCustomer(cusCode);
    if (customer != null) {
        customer.CusCode = $("#customerCode").val();
        customer.CusName= $("#customerName").val();
        customer.CusNic = $("#customerNIC").val();
        customer.CusDob = $("#customerDOB").val();
        customer.CusAdd = $("#customerAddress").val();
        customer.CusSalary = $("#customerSalary").val();
        loadCustomer();
        clear()
        setTestifiedValues()
        return true;
    } else {
        return false;
    }

}

//remove customer
$("#btnDelete").click(function () {
    let deleteCode = $("#txtSearch").val();

    let del = confirm("Do you really want to delete customer id :" + deleteCode);
    if (del){
        if (deleteCustomer(deleteCode)) {
            setTestifiedValues("", "", "", "","","");
        } else {
            alert("No such customer to delete. please check the id");
        }
    }
});

function deleteCustomer(customerID) {
    let customer = searchCustomer(customerID);
    if (customer != null) {
        let indexNumber = customerArray.indexOf(customer);
        customerArray.splice(indexNumber, 1);
        loadCustomer();
        return true;
    } else {
        return false;
    }
}