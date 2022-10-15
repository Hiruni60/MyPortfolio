// save details cart
function saveCart(){
    let itemCode1= $('#cmbItemCode').val();
    let itemName1= $('#itemName2').val();
    let itemDes1=$("#itemDescription2").val()
    let itemPrice1=$('#unitPrice').val();
    let itemsqty=$('#QtyItem').val();
    let Total= itemPrice1*itemsqty;

    var cartobj={

        itemCode1,
        itemName1,
        itemDes1,
        itemPrice1,
        itemsqty,
        Total
    }
    cartArray.push(cartobj)
    console.log(cartArray)


}
//LOAD ALL DATA TABLE
function loadAllOrders(){
    $('#orderTBody').empty();
    let total = 0
    for (var i of cartArray){
        total += parseInt(i.Total)
        var TbaleRow=`<tr ><td>${i.itemCode1}</td><td>${i.itemName1}</td><td>${i.itemDes1}</td><td>${i.itemPrice1}</td><td>${i.itemsqty}</td><td>${i.Total}</td><td><button class="btn btn-outline-danger btnRemove" style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;" onclick="removeFromCart()">remove</button></td></tr>`
        $('#orderTBody').append(TbaleRow)
    }
    $("#Tot").val(total)
}
//ADD CART
$('#addToCart').click(function(){
    $('#orderTBody').empty();
    saveCart();
    loadAllOrders();
    // genarateOrderId()
})
//////CALCULATE///
// $('#QtyItem').keyup(function(){
//     let price=$('#unitPrice').val()
//     let itqty=$('#QtyItem').val();
//     let total=price*itqty;
//     $('#Tot').val(total);
//     // let subtotal=total+$('#subtotal').val()
//     // $('#subtotal').val(subtotal ) ;
// })
// remove cart
// $('.btnRemove').click(function(){

// })
function removeFromCart(){
    alert('remove')
}
$('#discount').keyup(function (){
    let tot=$('#Tot').val()
    let discount=$('#discount').val()
    let subTot=tot-(tot*discount/100);
    $('#subTot').val(subTot)
})
$('#cash').keyup(function(){
    let subTot=  $('#subTot').val();
    let cash=$('#cash').val()
    if (cash>=subTot) {
        let balance = cash - subTot;
        $('#balance').val(balance);
    }else {
        // alert("insuffient credits")
    }
})