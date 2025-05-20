let userEmail = document.querySelector('#UserEmail') ;
let UserPhone = document.querySelector('#UserPhone') ;
let userName = document.querySelector('#UserName');
let sec = document.querySelectorAll('main .slider .section');
let inpParent = document.querySelectorAll(".inp-box")

userName.oninput = function() {
    let value = userName.value.trim();
    if (value.length < 1 || /^[a-z ]+$/i.test(value) === false) {
        this.parentElement.classList.add('error');
    } else {
        this.parentElement.classList.remove('error');
    }
}

userEmail.oninput= function checkEmail() { 
    let value = userEmail.value.trim();
    let regEx = /\w+@\w+\.(com|org|net)/
    if(!regEx.test(value)){
        this.parentElement.classList.add('error');
    }else{
        this.parentElement.classList.remove('error');
    }
}

UserPhone.oninput = function () {
    if(UserPhone.value.trim().length >= 4){
        UserPhone.parentElement.classList.remove('error');
    }else{
        UserPhone.parentElement.classList.add('error');
    }
}
let inputStatus = false ;

// Personal Info End


// عناصر الـ summary
let plan_cost = document.querySelector(".table .plan-cost");
let plan_Name = document.querySelector(".description .plan-name");

// دالة تحدث الاسم والسعر مع بعض
function updateSummaryPlan() {
  const selected = document.querySelector("input[name='plan']:checked");
  const label = selected.nextElementSibling;
  plan_Name.textContent = label.querySelector(".title h3").textContent;
  plan_cost.textContent = label.querySelector(".title p").textContent;
}

document.querySelectorAll("input[name='plan']").forEach(input => {
    input.addEventListener("change", () => {
      updateSummaryPlan();
      total(); // لو عايز تحدث المجموع مباشرة
    });
  });
  


let switchInp = document.querySelector(".switch-the-plan [name = 'switch']")
let yearly_offer = document.querySelectorAll(".select-plan .plan-box .plan label .title span")
let price = document.querySelectorAll(".select-plan .plan-box .plan label .title p.price")
// ------- Cost ------- 
let cost = document.querySelectorAll(".pick-box .box .cost");
let plan_chose = document.querySelectorAll(".plan-chose");
// Total Amount Start
let total_amount = document.querySelector(".finish  .total .total-amount") ;


// Total Amount End

let desc = 12 - 2; 

let arcadeMonth = 9 ;
let advanceMonth = 12 ;
let proMonth = 15 ;

price[0].textContent = `$${arcadeMonth}/Mo` ;
price[1].textContent = `$${advanceMonth}/Mo`;
price[2].textContent = `$${proMonth}/Mo`;

let OnlineService = 1 ;
let LargerStorage = 2 ;
let CustomizableProfile = 1 ;

cost[0].textContent = `+$${OnlineService}/mo`
cost[1].textContent = `+$${LargerStorage}/mo`
cost[2].textContent = `+$${CustomizableProfile}/mo`;
switchInp.addEventListener('change', function() {
    // حدّد إذا Monthly ولا Yearly
    const isYearly = switchInp.checked;
    // عدّل النصوص في صفحة الاختيار
    yearly_offer.forEach(sp => sp.classList.toggle("year-offer", isYearly));
    plan_chose.forEach(sp => sp.textContent = isYearly ? '(Yearly)' : '(Monthly)');
  
    // حدّد الضربات مسبقاً
    const factor = isYearly ? desc : 1;
    // حدّد suffix
    const suffix = isYearly ? '/Yr' : '/mo';
  
    // حدّد الأسعار الشهرية الأصلية
    const base = [arcadeMonth, advanceMonth, proMonth];
    [0,1,2].forEach(i => {
      price[i].textContent = `$${base[i] * factor}${suffix}`;
      cost[i].textContent  = `+$${[OnlineService, LargerStorage, CustomizableProfile][i] * factor}${suffix}`;
    });
  
    // حدّث سعر الخطة في الـ summary
    updatePlanCost();
  
    // عدّل أسعار الخدمات الموجودة في الـ summary
    document.querySelectorAll(".thePrice").forEach(el => {
      const idx = +el.parentElement.getAttribute("data-index");
      el.textContent = cost[idx].textContent;
    });
  
    // احسب المجموع مرة واحدة
    total();
  });
  


let pocket = document.querySelector(".table .pocket");
let inputChose = document.querySelectorAll(".pick-box .box input");
inputChose.forEach((checked,index) => {
    checked.addEventListener("change", function addOns() {
        checked.setAttribute("data-index",index);   
            let label = checked.nextElementSibling;
            let choseCost = label.querySelector(".cost"); 
            let title = label.querySelector(".header h3"); 
            let ser = document.createElement("div"); 
            ser.classList.add("service");
            
            let services = document.createElement("span");
            services.classList.add("info_title");
            let serviceTitle = document.createTextNode(title.textContent);
            services.appendChild(serviceTitle);
            
            ser.appendChild(services);
            
            let thePrice = document.createElement("span");
            thePrice.classList.add("thePrice");
            let thePriceText = document.createTextNode(choseCost.textContent);
            thePrice.append(thePriceText);
            ser.appendChild(thePrice);
            ser.setAttribute("data-index",index);
            pocket.appendChild(ser);
            // Append In Pocket 
            total();
        
            if(!checked.checked){
                let service = document.querySelectorAll(".service");
                service.forEach(se => {
                    if(checked.getAttribute("data-index") === se.getAttribute("data-index")){
                        se.remove();
                    }
                })
                
            }
            
    })
})

let next = document.querySelector(".next-and-back #next");
let back = document.querySelector(".next-and-back #back");
let main = document.querySelector('main');
let stepNum = document.querySelectorAll("aside .step .step-number");

let currentPage = 0; 
moveToPage(0); // ← أضف السطر ده

next.addEventListener("click", () => {
    if (currentPage === 0) {
        checkInputs();
        if (inputStatus) {
            moveToPage(currentPage + 1);
        } else {
            document.querySelectorAll("form input").forEach(inputs => {
                if (inputs.value.trim() === "") {
                    inputs.parentElement.classList.add('error') ;
                }
            });
        }
    } else {
        moveToPage(currentPage + 1);
    }
});

back.addEventListener("click", () => {
    if (currentPage > 0) {
        moveToPage(currentPage - 1);
    }
});

document.querySelector(".description .change").addEventListener("click",function(){
    moveToPage(0);
})

function moveToPage(pageIndex) {
    sec[currentPage].classList.add("page-stp");
    sec[pageIndex].classList.remove("page-stp");
    currentPage = pageIndex ;
    if (currentPage === 0) {
        back.style.display = "none" ;
    } else {
        back.style.display = "inline-block" ;
    }
    if (currentPage === sec.length - 1) {
        next.style.display = "none" ;
    }else if(currentPage === 3){
        next.innerHTML = 'Confirm';
    }
    else {
        next.style.display = "inline-block" ;
        next.innerHTML = 'Next Step';
    }
    stepNumbers();  
}

function checkInputs() {
    inputStatus = Array.from(inpParent).every(inp => !inp.classList.contains("error"));
}

function stepNumbers() {
    stepNum.forEach((step, index) => {
        if (index === currentPage) {
            step.classList.add("active");
        } else {
            step.classList.remove("active") ;
        }
    });
}


// Show Total Amount
function total() {
    let total = 0;

    let allPrices = document.querySelectorAll(".thePrice");

    allPrices.forEach(priceElement => {
        let text = priceElement.textContent.trim();
        let number = parseFloat(text.replace(/[^\d.]/g, ''));
        total += number;
    });

    let planText = plan_cost.textContent.trim();
    let planNumber = parseFloat(planText.replace(/[^\d.]/g, ''));

    total += planNumber;

    total_amount.textContent = `$${total}${switchInp.checked ? '/Yr' : '/Mo'}`;
}


function updatePlanCost() {
    // العنصر اللي عليه الراديو المختار
    const selected = document.querySelector("input[name='plan']:checked");
    const label = selected.nextElementSibling;
    // p.price داخل الـ label بيحمل النص الجديد مثل "$150/Yr"
    const priceText = label.querySelector("p.price").textContent.trim();
    plan_cost.textContent = priceText;
  }
  
// finish page  