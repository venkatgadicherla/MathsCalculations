
export function evalu(inputStr) {
    let str = inputStr.join('');
    console.log('input string into eval' + str);
    var newStrArray=str.split(/([+,/,*,%,^,-])/); 
//     var operandList = getListOfOperands(str);
//    // console.log(operandList);
//     var opList = getListOfOperators(str);
//    // console.log('ops'+opList);
    
//     var newStrArray = getNewArray(str,operandList, opList);
    console.log('Full array after operators' + newStrArray);
    var clearedUnaryStr = clearUnary1(newStrArray);
    console.log('after unary operator' + clearedUnaryStr);
    var indexofDivOp = [];
    var indexofMulOP = [];
    let indexofPowOP=[];
    var indexOfAddOp = [];
    var indexOfSubOp = [];
    var strArray = clearedUnaryStr.filter(e => { if (e != '') return e });
    console.log("before opearions" + strArray);
    let resultOfPower=powerOf(strArray);
     console.log('Power reusult'+resultOfPower);
    var divisionResult = division(resultOfPower);
    //var divisionResult=division(clearedUnaryStr);
    console.log("Division Result:" + divisionResult);
    var multiplyRes = multiply(divisionResult);
    console.log("Multiply result :" + multiplyRes);
    var total = addsub(multiplyRes);

    
 //   let resultOfPower=powerOf(nos);
     function powerOf(strArray) {
        if(strArray.includes('^'))
        { debugger;
        if (strArray.length > 0) {
            for (let i = 0; i < strArray.length; i++) {
                if (strArray[i] === '^') {
                    //  console.log("index of operator"+i)
                    indexofPowOP.push(i);
                }
            }
    
            console.log(strArray);
            if (indexofPowOP.length > 0) {
                var left = indexofPowOP[0] - 1;
                var right = indexofPowOP[0] + 1;
                var index = indexofPowOP[0];
                for (let i = 0; i < indexofPowOP.length; i++) {
    
                    let powerResult=1;
                    for(let i=0;i<strArray[right];i++)
                    {
                    powerResult=powerResult* strArray[left] 
                    }
                    // console.log(strArray[left]+"*"+strArray[right]+"=");
                    // console.log(divresult);
                    strArray.splice(left, 3, powerResult);
    
                    // console.log("Array after opearion no "+i+" : " +strArray);
                    index = Number(indexofPowOP[i + 1]);
                    left = index - 2 * (i + 1) - 1;
                    //console.log("left of index :"+left);
                    right = index - 2 * (i + 1) + 1;
    
                    //   console.log(a);
                }
            }
            return strArray;
        }
    }return strArray;
    }



    function division(strArray) {
        if(strArray.includes('/'))
        {
        if (strArray.length > 0) {
            for (let i = 0; i < strArray.length; i++) {
                if (strArray[i] === '/') {
                    // console.log("index of operator"+i)
                    indexofDivOp.push(i);
                }
            }

            console.log(strArray);
            if (indexofDivOp.length > 0) {
                var left = indexofDivOp[0] - 1;
                var right = indexofDivOp[0] + 1;
                var index = indexofDivOp[0];
                for (let i = 0; i < indexofDivOp.length; i++) {

                    let divresult = strArray[left]/strArray[right];
                    // console.log(strArray[left]+"/"+strArray[right]+"=");
                    // console.log(divresult);
                    strArray.splice(left, 3, divresult);

                    // console.log("Array after opearion no "+i+" : " +strArray);
                    index = Number(indexofDivOp[i + 1]);
                    left = index - 2 * (i + 1) - 1;
                    // console.log("left of index :"+left);
                    right = index - 2 * (i + 1) + 1;

                    //   console.log(a);
                }
            }
            return strArray;
        }
    }
    return strArray;

    }
    function multiply(strArray) {
        if(strArray.includes('*'))
        {
        if (strArray.length > 0) {
            for (let i = 0; i < strArray.length; i++) {
                if (strArray[i] === '*') {
                    //  console.log("index of operator"+i)
                    indexofMulOP.push(i);
                }
            }

            console.log(strArray);
            if (indexofMulOP.length > 0) {
                var left = indexofMulOP[0] - 1;
                var right = indexofMulOP[0] + 1;
                var index = indexofMulOP[0];
                for (let i = 0; i < indexofMulOP.length; i++) {

                    let divresult = strArray[left] * strArray[right];
                    // console.log(strArray[left]+"*"+strArray[right]+"=");
                    // console.log(divresult);
                    strArray.splice(left, 3, divresult);

                    // console.log("Array after opearion no "+i+" : " +strArray);
                    index = Number(indexofMulOP[i + 1]);
                    left = index - 2 * (i + 1) - 1;
                    //console.log("left of index :"+left);
                    right = index - 2 * (i + 1) + 1;

                    //   console.log(a);
                }
            }
            return strArray;
        }
    }return strArray;
    }
    function addsub(strArray) {
        let sum;
        if (strArray.length > 0) {

            if (strArray[0] === '-') {
                strArray.splice(0, 1);
                sum = strArray[0] * -1;

            }
            else
                if ((strArray[0] !== '-')) { sum = Number(strArray[0]); }
            for (let i = 0; i < strArray.length; i++) {

                if (strArray[i] === '+' || strArray[i] === '-') {
                    if (strArray[i] === '+') {
                        sum = Number(sum + Number(strArray[i + 1]));
                    }
                    else if (strArray[i] === '-') {
                        sum = Number(sum - Number(strArray[i + 1]));
                    }

                    
                }


            }
            return (sum);
        }
    }
    return total;
}
export function clearUnary(strArray)
 {


    for (let i = 0; i < strArray.length; i++) {
        if (strArray[0] === '-' && strArray[1] !== '(')// This condition for clearing unary operator when - is the 
        //first number has unary operator.
        {

            strArray[1] = Number(strArray[1]) * -1;
            strArray.splice(0, 1)
        }
        if (strArray[i] === '-' && i > 0 && strArray[i + 1] !== '(') {

            if ('(+*%/*-'.indexOf(strArray[i - 1]) >= 0)// This condtion will check if the unary operator 
            // has a operaror has  before it replace it 
            // by shifting to the next pl
            {
                //console.log(`Before Element${strArray[i-1]}`);
                //console.log(`After Element${strArray[i+1]}`);
                strArray[i + 1] = strArray[i + 1] * -1;
                strArray.splice(i, 1);
                // console.log(`modified element${strArray[i]}`)
            }
        }

        if (strArray[i] === '-' && strArray[i + 1] === '(') {

            if (i === 0)                          //This condtion will check if the unary operator 
            {
                strArray.splice(i, 1, '-1'); // This condition is  for replacing the unaray operator if it 
                strArray.splice(i + 1, 0, '*');
            }
            // at the start of the expression and before a ()

            if ('(+*%/*-'.indexOf(strArray[i - 1]) >= 0)   //This condtion for replacing a unary operator if its 
            // before a () and after a operator
            {

                strArray.splice(i, 1, '-1');
                strArray.splice(i + 1, 0, '*');
            }

            // console.log(`modified element${strArray[i]}`)

        }
    }
    // console.log(strArray);
    return strArray;
}
function clearUnary1(strArray)
 {


    for (let i = 0; i < strArray.length; i++) {
        if (strArray[0] === '-')// This condition for clearing unary operator when - is the 
        //first number has unary operator.
        {

            strArray[1] = Number(strArray[1]) * -1;
            strArray[0]=null;
        }
        if (strArray[i] === '-' ) {

            if ('(+*%/*-'.indexOf(strArray[i - 1]) >= 0)// This condtion will check if the unary operator 
            // has a operaror has  before it replace it 
            // by shifting to the next pl
            {
                //console.log(`Before Element${strArray[i-1]}`);
                //console.log(`After Element${strArray[i+1]}`);
                strArray[i + 1] = strArray[i + 1] * -1;
                strArray[i]=null;
                // console.log(`modified element${strArray[i]}`)
            }
        }




      

            // console.log(`modified element${strArray[i]}`)

        }
        let newArray=strArray.filter(e=> {if(e!==null)
        { return e}
        });
  return newArray;  
}