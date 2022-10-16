
//save item
function saveItems(){
    let itemCode=$("#itemCode").val()
    let itemName=$("#itemName").val()
    let itemDes=$("#itemDescription").val()
    let itemPrice=$("#itemPrice").val()
    let itemQty=$("#itemQty").val()

    var itemObjet={itemCode,itemName,itemDes,itemPrice,itemQty}

    itemArray.push(itemObjet)
    console.log(itemArray)
}

$("#saveItem").click(function (){
    alert("Item Saved")
    saveItems()
    loadItem()
    bindRowClickEvents1()

    loadItemCode()

    clear2()
})

//load item
function loadItem(){
    $("#itemTbody").empty()
    for(var i of itemArray){
        var rawc=`<tr><td>${i.itemCode}</td><td>${i.itemName}</td><td>${i.itemDes}</td><td>${i.itemPrice}</td><td>${i.itemQty}</td></tr>`
        $("#itemTbody").append(rawc)
    }
}

$("#viewAllItem").click(function () {
    loadItem()
});

//table row val select
function bindRowClickEvents1() {
    $("#itemTbody>tr").click(function () {
        let Icode = $(this).children(":eq(0)").text();
        let Iname = $(this).children(":eq(1)").text();
        let Des = $(this).children(":eq(2)").text();
        let price = $(this).children(":eq(3)").text();
        let qty = $(this).children(":eq(4)").text();


        $('#itemCode').val(Icode);
        $('#itemName').val(Iname);
        $('#itemDescription').val(Des);
        $('#itemPrice').val(price);
        $('#itemQty').val(qty);


    });
}

//clear inputField
function clear2(){
    $('#itemCode').val('')
    $('#itemName').val('')
    $('#itemDescription').val('')
    $('#itemPrice').val('')
    $('#itemQty').val('')

}





$("#searchIBtn").click(function () {
    let typeCode=$("#itemSearch").val()
    let item = searchItem(typeCode);
    if (item != null) {
        $("#itemCode").val(item.itemCode);
        $("#itemName").val(item.itemName);
        $("#itemDescription").val(item.itemDes);
        $("#itemPrice").val(item.itemPrice);
        $("#itemQty").val(item.itemQty);

    }else {
        alert("error")
    }

});
function searchItem(itemId) {
    for (let item of itemArray) {
        if (item.itemCode == itemId) {
            return item;
        }
    }
    return null;
}
function setTestifiedValues1(Icode, Iname, Des, price,qty) {
    $("#itemCode").val(Icode);
    $("#itemName").val(Iname);
    $("#itemDescription").val(Des);
    $("#itemPrice").val(price);
    $("#itemQty").val(qty);

}

//update customer
$('#btnIUpdate').click(function(){
    let ItemCode=$('#itemCode').val()
    let response=updateItem(ItemCode)
    if(response){
        // Swal.fire({
        //   title: 'Customer Updated Successfully',
        // })
        alert("updated")
        $('#itemCode').val('')
        $('#itemName').val('')
        $('#itemDescription').val('')
        $('#itemPrice').val('')
        $('#itemQty').val('')

    }
    else{
        // Swal.fire("Update Failed" )
    }
})

function updateItem(itemCode) {
    let item = searchItem(itemCode);
    if (item != null) {
        item.itemCode = $("#itemCode").val();
        item.itemName= $("#itemName").val();
        item.itemDes = $("#itemDescription").val();
        item.itemPrice = $("#itemPrice").val();
        item.itemQty= $("#itemQty").val();

        loadItem()
        clear2()
        setTestifiedValues1()
        return true;
    } else {
        return false;
    }

}

//remove customer
$("#deleteIBtn").click(function () {
    let deleteCode = $("#itemSearch").val();

    let del = confirm("Do you really want to delete item code :" + deleteCode);
    if (del){
        if (deleteItem(deleteCode)) {
            setTestifiedValues1("", "", "", "","");
        } else {
            alert("No such customer to delete. please check the id");
        }
    }
});

function deleteItem(itemCode) {
    let item = searchItem(itemCode);
    if (item != null) {
        let indexNumber = itemArray.indexOf(item);
        itemArray.splice(indexNumber, 1);
        loadItem();
        return true;
    } else {
        return false;
    }
}

//validation

$("#itemCode").focus();

const itemIDRegEx = /^(I00-)[0-9]{1,3}$/;
const itemNameRegEx = /^[A-Z][a-z]{3,20}$/;
const itemDesRegEx = /^[A-Z][a-z]{3,20}$/;
const unitPriceRegEx = /^[0-9]{1,}$/;
const itemQtyRegEx = /^[0-9]{1,}$/;


let itemValidations = [];
itemValidations.push({reg: itemIDRegEx, field: $('#itemCode')});
itemValidations.push({reg: itemNameRegEx, field: $('#itemName'),error:''});
itemValidations.push({reg: itemDesRegEx, field: $('#itemDescription'),error:''});
itemValidations.push({reg: unitPriceRegEx, field: $('#itemPrice'),error:''});
itemValidations.push({reg: itemQtyRegEx, field: $('#itemQty'),error:''});



//disable key
$("#itemCode,#itemName,#itemDescription,#itemPrice,#itemQty").on('keydown', function (event) {
    if (event.key == "Tab") {
        event.preventDefault();
    }
});

$("#itemCode,#itemName,#itemDescription,#itemPrice,#itemQty").on('keyup', function (event) {
    checkItemValidity();
});

$("#itemCode,#itemName,#itemDescription,#itemPrice,#itemQty").on('blur', function (event) {
    checkItemValidity();
});

function checkItemValidity() {
    let errorCount=0;
    for (let validation of itemValidations) {
        if (check(validation.reg,validation.field)) {
            textItemSuccess(validation.field,"");
        } else {
            errorCount=errorCount+1;
            setItemTextError(validation.field,validation.error);
        }
    }
    setButtonState(errorCount);
}

function checkItems(regex, txtField) {
    let inputValue = txtField.val();
    return regex.test(inputValue) ? true : false;
}

function setItemTextError(txtField,error) {
    if (txtField.val().length <= 0) {
        defaultText(txtField,"");
    } else {
        txtField.css('border', '2px solid red');
        txtField.parent().children('span').text(error);
    }
}

function textItemSuccess(txtField,error) {
    if (txtField.val().length <= 0) {
        defaultItemText(txtField,"");
    } else {
        txtField.css('border', '2px solid green');
        txtField.parent().children('span').text(error);
    }
}

function defaultItemText(txtField,error) {
    txtField.css("border", "1px solid #ced4da");
    txtField.parent().children('span').text(error);
}

function focusText(txtField) {
    txtField.focus();
}

function setButtonState(value){
    if (value>0){
        $("#saveItem").attr('disabled',true);
    }else{
        $("#saveItem").attr('disabled',false);
    }
}