function loadCustomeCode(){
    $("#cmbCusCode").empty()
    for (let customer of customerArray){
        $("#cmbCusCode").append(`<option value="${customer.CusCode}">${customer.CusCode}</option>`)
    }
}

function loadItemCode(){
    $("#cmbItemCode").empty()
    for (let item of itemArray){
        $("#cmbItemCode").append(`<option>${item.itemCode}</option>`)
    }
}
//customer combobox click and set value textfeild
$('#cmbCusCode').click(function(){
    let val= $('#cmbCusCode').val()
    //    $('#cusid').val(val)
    let cus=searchCustomer(val);
    if (cus != null) {
        // $('#customerCode').val(cus.CusCode)
        $('#customerName2').val(cus.CusName)
        $('#customerAddress2').val(cus.CusAdd)
    }
})
//item combobox click and set value textfeild
$('#cmbItemCode').click(function(){
    let itemVal= $('#cmbItemCode').val()
    let items=searchItem(itemVal)
    if(items != null){
        // $('#itemCode').val(items.itemCode)
        $('#itemName2').val(items.itemName)
        $('#itemDescription2').val(items.itemDes)
        $('#unitPrice').val(items.itemPrice)
        $('#QtyOnHand').val(items.itemQty)
    }
})

$("#orderId").val(genarateOrderId())
//SAVE ORDER//
function genarateOrderId(){
    if (orderArray.length > 0) {
        let id = orderArray[orderArray.length - 1].orderId;
        let [pre, frag] = id.split("-");
        let num = parseInt(frag) + 1;
        let count = num.toString().length;
        if (count == 1) {
            return pre + "-00" + num;
        } else if (count == 2) {
            return pre + "-0" + num;
        } else {
            return pre + "-" + num;
        }
    } else {
        return "O-001";
    }
}
function saveOrder(){
    let orderId=$('#orderID').val();
    let customCode= $('#cmbCusCode').val();
    let date=$('#dateI').val()
    let itemsC=cartArray
    let total = $("#subTot").val()
    // let cusIds;
    // let itemCodes;
    // let itemNames;
    // let itemPrices;
    // let itemsqtys;
    // let balances;
    // for(let i of cartobj){
    //     cusIds=i.cusId
    //     itemCodes=i.itemCode
    //     itemNames=i.itemName
    //     itemPrices=i.itemPrice
    //     itemsqtys=i.itemsqty
    //     balances=i.balance

    // }

    var orderObj={
        orderId,
        customCode,
        itemsC,
        date,
        total
    }
    orderArray.push(orderObj)
    $("#orderId").val(genarateOrderId())
    // console.log('order='+orderArray)
    // console.log('price in= '+itemPrice)
}



////PLACE ORDER
$('#placeOrderBtn').click(function(){
    $('#orderTBody').empty();
    console.log("this runs")
    clear()
    saveOrder()
    //$('#orderId').val(calculateNextId())
    alert('order has been saved!')


})

//find order id
$('#orderId').on('keyup',function(event){
    if(event.which==13){

        let order = orderArray.find((orderO) => {
            return orderO.orderId ==  $('#orderId').val()
        })
        console.log(order)
        // $('#order-tabelbody').empty();
        order.itemsC.forEach(i => {
                var TbaleRow=`<tr ><td>${i.itemCode1}</td><td>${i.itemName1}</td><td>${i.itemDes1}</td><td>${i.itemPrice1}</td><td>${i.itemsqty}</td><td>${i.Total}</td><td>${'<button class="btn btn-outline-danger" style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;" id="btnRemove">remove</button>'}</td></tr>`
                $('#orderTBody').append(TbaleRow)
            }
        )

        $("#subTot").val(order.total)
        $("#cmbCusCode").val(order.customCode)

    }
}).va
//
// // subtotal
// function subtot(array){
//     let subtotal=0;
//     for (let i of array){
//         subtotal += (parseInt(i.itemPrice) * parseInt(i.itemsqty))
//     }
//     $('#subTot').val(subtotal);
// }
// //genrate order id
// $('#orderId').val(calculateNextId())
//
// function calculateNextId() {
//     if (orderArray.length > 0) {
//         let id = orderArray[orderArray.length - 1].orderId;
//         let [pre, frag] = id.split("-");
//         let num = parseInt(frag) + 1;
//         let count = num.ltoString().length;
//         if (count == 1) {
//             return pre + "-00" + num;
//         } else if (count == 2) {
//             return pre + "-0" + num;
//         } else {
//             return pre + "-" + num;
//         }
//     } else {
//         return "O-001";
//     }
// }
//
// // let oid=001;
// // $('#orderId').val('O000')
// // function genarateOrderId(){
// //     $('#orderId').val('O00'+oid++);
// // }

//CLEAR TEXTFEILD///
function clear(){
    $('#cmbCusCode').val('')
    $('#cmbItemCode').val('')
    $('#customerName2').val('')
    $('#customerAddress2').val('')
    $('#itemName2').val('')
    $('#itemDescription2').val('')
    $('#unitPrice').val('')
    $('#QtyOnHand').val('')
    $('#QtyItem').val('');
    $('#Tot').val('');
    // $('#customerpayment').val('')
    // $('itemsqty').val('');
}