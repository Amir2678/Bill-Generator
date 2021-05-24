let menu = [
    {
        id: 1,
        name: "Pizza",
        price: 12000,
        image: "https://picsum.photos/100"
    },
    {
        id: 2,
        name: "Lobster",
        price: 15000,
        image: "https://picsum.photos/100"
    },
    {
        id: 3,
        name: "Lasanga",
        price: 14000,
        image: "https://picsum.photos/100"
    },
    {
        id: 4,
        name: "Salmon",
        price: 15000,
        image: "https://picsum.photos/100"
    },
    {
        id: 5,
        name: "Hamburger",
        price: 10000,
        image: "https://picsum.photos/100"
    }
]


let basket = {
    ordered: [],

    updateMenu: function (food, operaton) {
        if (operaton == "+") {
            this.ordered.push(food)
        } else {
            if (this.ordered.includes(food)) {
                this.ordered.splice(this.ordered.findIndex(element => element == food), 1)
            }
        }
        $(`#count_${food}`).html(`${count(this.ordered, food)}`)
        $(`#sum_${food}`).html(`${count(this.ordered, food) * menu[food].price}`);

        console.log(this.ordered)
        this.calculateTotal()
        this.calculateServices()
        this.calculateDiscount_final()
    },

    calculateTotal: function () {
        let total = 0

        this.ordered.forEach(food => {
            total += menu[food].price
        })

        $("#total").html(`${total}`);
        return total
    },

    calculateServices: function () {
        let cost = this.calculateTotal() * 0.99
        $("#services").html(`${cost}`);
        return cost
    },

    calculateDiscount_final: function () {
        let discountCode = $("#discountCode").val();

        if (discountCode == "Gold") {
            $("#discount").html(`15%`);
            $("#finalPrice").html(`${this.calculateServices() * 0.85}`);
        } else if (discountCode == "Silver") {
            $("#discount").html(`10%`);
            $("#finalPrice").html(`${this.calculateServices() * 0.9}`);
        } else if (discountCode == "Bronze") {
            $("#discount").html(`5%`);
            $("#finalPrice").html(`${this.calculateServices() * 0.95}`);
        } else {
            $("#discount").html(`0%`);
            $("#finalPrice").html(`${this.calculateServices()}`);
        }
    },

}


function render() {
    let mapped = menu.map((food, index) => {
        $("#menu").append(
            `<div class="row m-0 p-0 mt-4 text-center" style="font-size: 1.5rem;">
            <div class="col-2"><img class="rounded-circle" src="https://picsum.photos/100" alt=""></div>
            <div class="col-3 ml-5 d-flex flex-column justify-content-center align-items-center">
                <div class="name">${menu[index].name}</div>
                <div class="price">${menu[index].price}</div>
            </div>
            <div class="col-2 ml-n4 d-flex flex-row justify-content-around align-items-center">
                <div class="addRemove d-flex flex-column justify-content-around align-items-center ml-5">
                    <div class="add" onclick="basket.updateMenu(${index}, '+')" style="cursor: pointer;">+</div>
                    <div class="remove" onclick="basket.updateMenu(${index}, '-')" style="cursor: pointer;">-</div>
                </div>
                <div class="ml-4" id="count_${index}">0</div>
            </div>
            <div class="col-3 my-auto ml-auto" id="sum_${index}">0</div>
        </div>`
        );
    })

    $("#check").html(`
    <div class="col-4">
                <div class="d-flex flex-row justify-content-between"><span>Total</span> <span id="total" class="mr-2">0</span></div>
                <div class="d-flex flex-row justify-content-between"><span>Sevices</span> <span id="services" class="mr-2">0</span></div>
                <div class="d-flex flex-row justify-content-between"><span>Discount</span> <span id="discount" class="mr-2">0%</span></div>

                <div class="text-center mt-4" id="finalPrice">0</div>
            </div>
            <div class="col-8 d-flex flex-column justify-content-between align-items-center">
                <div class="mt-3">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                          <span class="input-group-text" id="basic-addon1">Discount Code</span>
                        </div>
                        <input type="text" id="discountCode" class="form-control" placeholder="Gold / Silver / Bronze">
                      </div>
                </div>
                <div class="w-100 text-center"><button type="button" class="btn btn-secondary w-50">Pay</button></div>
            </div>
    `);
}




function count(arr, element) {
    let count = 0;

    for (let i = 0; i < arr.length; i++)
        if (arr[i] == element)
            count++
    return count;
}