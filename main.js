let title = document.getElementById("title");
let price =document.getElementById('price');
let taxic =document.getElementById('taxic');
let ads =document.getElementById('ads');
let discount =document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let mood = 'create';
let tmp;


// getTotal
function getTotal(){
    if(price.value != ''){
        let result = (+price.value + +taxic.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = "#040";
    } else{
        total.innerHTML = '' ;
        total.style.background = "#86010189";
     }
};

// create product
let dataProduct;
if(localStorage.product != null){
dataProduct = JSON.parse(localStorage.product);
}
else{
     dataProduct = [];
}

submit.onclick = function(){
   let newproduct = {
    title:title.value,
    price:price.value,
    taxic:taxic.value,
    ads:ads.value,
    discount:discount.value,
    total:total.innerHTML,
    count:count.value,
    category:category.value,
   }

  //check count
  //if mood create or update 
  
  if(mood==='create'){

      if(newproduct.count > 1){
       for(let i = 0 ; i < newproduct.count; i++){
         dataProduct.push(newproduct);
        }
    }else{
          dataProduct.push(newproduct);
      }
    }  
    // mood update
          else{
            dataProduct[tmp] = newproduct; //update product not new product with length array
            mood = 'create';
            submit.innerHTML = 'Create';
            count.style.display = "block";  
        }

   dataProduct.push(newproduct);
   localStorage.setItem('product' , JSON.stringify(dataProduct));
   cleardata();
   datashow();
}

// clear inputs
function cleardata(){
 title.value = '';
 price.value = '';
 ads.value = '';
 taxic.value = '';
 total.innerHTML = '';
 discount.value = '';
 count.value = '';
 category.value = '';
}

// read data
function datashow(){
    getTotal();
    let table = '';
    for(let i = 0 ; i<dataProduct.length ; i++){
      table += `
      <tr>
        <td>${i}</td>
        <td>${dataProduct[i].title}</td>
        <td>${dataProduct[i].price}</td>
        <td>${dataProduct[i].taxic}</td>
        <td>${dataProduct[i].ads}</td>
        <td>${dataProduct[i].discount}</td>
        <td>${dataProduct[i].total}</td>
        <td>${dataProduct[i].category}</td>
        <td><button onclick="updateData(${i})" id="update" >update</button></td>
        <td><button onclick="Delete(${i})" id="delete" >delete</button></td>
      </tr>
      `
    }
    document.getElementById("tbody").innerHTML = table;
    // create button clear all
    let btnDelete = document.getElementById("deleteall");
    if(dataProduct.length>0){
        btnDelete.innerHTML = `
        <button onclick="clearall()"> delete All(${dataProduct.length}) </button>
        `
    }else{
        btnDelete.innerHTML = '';
    }
}
// call method becouse run continues show data with refresh in table
datashow();

// delete with button
function Delete(i){
  dataProduct.splice(i,1);
  localStorage.product = JSON.stringify(dataProduct);
  datashow();
}

// function clear all product with button
function clearall(){ 
    localStorage.clear(); //delete from local storage
    dataProduct.splice(0); //delete from array
    datashow();  //update data after deleting
}

//updateData
function updateData(i){
title.value = dataProduct[i].title;
price.value = dataProduct[i].price;
taxic.value = dataProduct[i].taxic;
ads.value = dataProduct[i].ads;
discount.value = dataProduct[i].discount;
getTotal();
count.style.display = 'none';
category.value = dataProduct[i].category;
submit.innerHTML='Update';
mood = 'Update'; // button control update 
tmp = i //acssess i in all function call top in else condition mood update
scroll({
    top :0,
    behavior:"smooth",
})
}

//search
let searchmood='title';
function getsearchmood(id){

    let search = document.getElementById('search');
    if(id ==='searchTitle'){ 
        searchmood='title';
        search.Placeholder = 'search By Title';
    }else{
        searchmood='category'
        search.Placeholder = 'search By Category';
    }
    search.focus();
    search.value = '';
    datashow();
}

function searchData(value){
    let table = '';
    if(searchmood==='title'){
       for(let i = 0 ; i<dataProduct.length;i++){
           if(dataProduct[i].title.includes(value)){
            table += `
            <tr>
              <td>${i}</td>
              <td>${dataProduct[i].title}</td>
              <td>${dataProduct[i].price}</td>
              <td>${dataProduct[i].taxic}</td>
              <td>${dataProduct[i].ads}</td>
              <td>${dataProduct[i].discount}</td>
              <td>${dataProduct[i].total}</td>
              <td>${dataProduct[i].category}</td>
              <td><button onclick="updateData(${i})" id="update" >update</button></td>
              <td><button onclick="Delete(${i})" id="delete" >delete</button></td>
            </tr>
            `
           }
       }
    }
    else{
        for(let i = 0 ; i<dataProduct.length;i++){
            if(dataProduct[i].category.includes(value)){
             table += `
             <tr>
               <td>${i}</td>
               <td>${dataProduct[i].title}</td>
               <td>${dataProduct[i].price}</td>
               <td>${dataProduct[i].taxic}</td>
               <td>${dataProduct[i].ads}</td>
               <td>${dataProduct[i].discount}</td>
               <td>${dataProduct[i].total}</td>
               <td>${dataProduct[i].category}</td>
               <td><button onclick="updateData(${i})" id="update" >update</button></td>
               <td><button onclick="Delete(${i})" id="delete" >delete</button></td>
             </tr>
             `
            }
        }
    }
    document.getElementById("tbody").innerHTML = table;
}



