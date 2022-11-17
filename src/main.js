let shop = document.getElementById('shop')


let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateshop =()=> {
    return (shop.innerHTML = shopItemData.map((x)=>{
        let {id,name,price,desc,img} = x;
        let search = basket.find((x)=>x.id === id) || [];
        return `
        <div id=product-id-${id} class="item">
            <img width="220" src=${img}>
            <div class="details">
                <h3>${name}</h3>
                <p>${desc}
                </p>
                <div class="price-quantity">
                    <h2>$ ${price}</h2>
                    <div class="buttons">
                        <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                        <div id=${id} class="quantity">
                        ${search.item === undefined ? 0: search.item}</div>
                        <i onclick="decrement(${id})"  class="bi bi-dash-lg"></i>
                    </div>
                </div>
            </div>
        </div>
        `;
    }).join("")); 
          
};

generateshop();

let increment = (id) =>{
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);

    if(search === undefined){
        basket.push({
            id: selectedItem.id,
            item: 1,
        });
    }
    else{
        search.item += 1;
    }
    
    update(selectedItem.id);
    localStorage.setItem("data",JSON.stringify(basket));
    // generateCartItem(); 
}
let decrement = (id) =>{
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);
    if(search === undefined) return;
    else if(search.item === 0) return;
    
    else{
        search.item -= 1;
    }
    
    
    // generateCartItem();
    update(selectedItem.id);
    basket = basket.filter((x)=>x.item !== 0);
    localStorage.setItem("data",JSON.stringify(basket));
}
let update = (id) =>{
    let search = basket.find((x) => x.id === id);

    // console.log(id);
    document.getElementById(id).innerHTML = search.item;
    calculation();
};

let calculation = ()=>{
    let cartIcon = document.getElementById("cartAmount");
    // console.log();
    cartIcon.innerHTML = basket.map((x) =>x.item).reduce((x,y)=>x+y, 0);
};

calculation();
// 2.50 // 