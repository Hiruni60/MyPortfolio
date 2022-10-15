
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

    clear()
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
function clear(){
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
        clear()
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