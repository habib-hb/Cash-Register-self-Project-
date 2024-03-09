// let price = 1.87;
let price = 3.5;
  let cid =[["PENNY", 1.01], ["NICKEL", 2.05],
  ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90], 
      ["FIVE", 55], 
      ["TEN", 20], 
      ["TWENTY", 60],
      ["ONE HUNDRED", 100]];

let inputEl = document.getElementById('cash');

let purchaseBtn = document.getElementById('purchase-btn') ;

let changeDueEl = document.getElementById('change-due');

purchaseBtn.addEventListener('click' , ()=>{
  if(Number(inputEl.value) < price){ 
    alert('Customer does not have enough money to purchase the item');
  }

  if(Number(inputEl.value) === price){
  changeDueEl.textContent ="No change due - customer paid with exact cash";
  return;
  }

 let totalCid = cid.reduce((acc, curr)=>{
          return acc + curr[1];
 }, 0)

console.log("total cid : " + totalCid) 

 if((Number(inputEl.value) - price) <= totalCid){//operation start -positive
    let changeDue = inputEl.value - price;
    // if(changeDue >= 100 && changeDue < 200){
      let incrementallyAvailable = 0; 
      let cidDuplicate = cid.slice(); 
      let statusMessage = `Status: OPEN `;
       for(let i=0; i < cid.length ; i++){
           incrementallyAvailable = cidDuplicate.pop()[1] 
           if(incrementallyAvailable <= changeDue){
             changeDue -= cid[cid.length - (i+1)][1];
             statusMessage += `${cid[cid.length - (i+1)][0]}: $${cid[cid.length - (i+1)][1]} `;
             cid[cid.length - (i+1)][1]= 0;
           }
           else if(incrementallyAvailable > changeDue){
             if(cid[cid.length - (i+1)][0] === "ONE HUNDRED"){
                 continue;
             }else if(cid[cid.length - (i+1)][0] === "TWENTY"){
                      if(changeDue < 20){
                        continue;
                      }else{
                         let twentySlot = Math.floor(changeDue / 20) * 20;
                         changeDue -= twentySlot;
                         cid[cid.length - (i+1)][1] -= twentySlot; 
                         statusMessage +=`${cid[cid.length - (i+1)][0]}: $${twentySlot} `;
                      }
             }
             else if(cid[cid.length - (i+1)][0] === "TEN"){
               if(changeDue < 10){
                        continue;
                      }else{
                         let tenSlot = Math.floor(changeDue / 10) * 10;
                         changeDue -= tenSlot;
                         cid[cid.length - (i+1)][1] -= tenSlot; 
                         statusMessage +=`${cid[cid.length - (i+1)][0]}: $${tenSlot} `;
                      }
             }
               else if(cid[cid.length - (i+1)][0] === "FIVE"){
               if(changeDue < 5){
                        continue;
                      }else{
                         let fiveSlot = Math.floor(changeDue / 5) * 5;
                         changeDue -= fiveSlot;
                         cid[cid.length - (i+1)][1] -= fiveSlot; 
                         statusMessage +=`${cid[cid.length - (i+1)][0]}: $${fiveSlot} `;
                      }
             }
               else if(cid[cid.length - (i+1)][0] === "ONE"){
               if(changeDue < 1){
                        continue;
                      }else{
                         let oneSlot = Math.floor(changeDue / 1) * 1;
                         changeDue -= oneSlot;
                         cid[cid.length - (i+1)][1] -= oneSlot; 
                         statusMessage +=`${cid[cid.length - (i+1)][0]}: $${oneSlot} `;
                      }
             }
              else if(cid[cid.length - (i+1)][0] === "QUARTER"){
               if(changeDue < 0.25){
                        continue;
                      }else{
                         let quarterSlot = Math.floor(changeDue / 0.25) * 0.25;
                         changeDue -= quarterSlot;
                         cid[cid.length - (i+1)][1] -= quarterSlot;
                         statusMessage +=`${cid[cid.length - (i+1)][0]}: $${quarterSlot} `; 
                      }
             }
              else if(cid[cid.length - (i+1)][0] === "DIME"){
               if(changeDue < 0.1){
                        continue;
                      }else{
                         let dimeSlot = Math.floor(changeDue / 0.1) * 0.1;
                         changeDue -= dimeSlot;
                         cid[cid.length - (i+1)][1] -= dimeSlot; 
                         statusMessage +=`${cid[cid.length - (i+1)][0]}: $${dimeSlot} `;
                      }
             }
               else if(cid[cid.length - (i+1)][0] === "NICKEL"){
               if(changeDue < 0.05){
                        continue;
                      }else{
                         let nickelSlot = Math.floor(changeDue / 0.05) * 0.05;
                         changeDue -= nickelSlot;
                         cid[cid.length - (i+1)][1] -= nickelSlot; 
                         statusMessage +=`${cid[cid.length - (i+1)][0]}: $${nickelSlot} `;
                      }
             }
                  else if(cid[cid.length - (i+1)][0] === "PENNY"){
               if(changeDue < 0.01){
                        continue;
                      }else{
                         let pennySlot = Math.ceil(changeDue / 0.01) * 0.01;
                         changeDue -= pennySlot;
                         cid[cid.length - (i+1)][1] -= pennySlot; 
                         statusMessage +=`${cid[cid.length - (i+1)][0]}: $${pennySlot} `;
                      }
             }




            //  cid[cid.length - (i+1)][1] -= changeDue ;
            //  changeDue = 0;
            //  break;  
           }
       }//for loop end
       console.log("change due : " + changeDue);
       console.log("input value : "+inputEl.value + " type: " + typeof Number(inputEl.value));
       console.log( Number(inputEl.value) - price)
      //  console.log(cid);
      //  console.log(incrementallyAvailable);
       changeDueEl.textContent = statusMessage;
        if((inputEl.value - price) === totalCid){
          changeDueEl.textContent = statusMessage.replace(/OPEN/, "CLOSED")  
        }else if(changeDue > 0){
          changeDueEl.textContent = "Status: INSUFFICIENT_FUNDS"
        }

    // }
 }//if((inputEl.value - price) < totalCid){
else{
     changeDueEl.textContent = "Status: INSUFFICIENT_FUNDS";
}
  
  // console.log(totalCid.toFixed(2));
  // console.log('hey ')
  // console.log(inputEl.value)
})
