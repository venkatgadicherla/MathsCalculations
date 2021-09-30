
export function evalu(inputStr) {
    let str = inputStr.join('');
    console.log('input string into eval' + str);
    var operandList = getListOfOperands(str);
   // console.log(operandList);
    var opList = getListOfOperators(str);
   // console.log('ops'+opList);
    
    var newStrArray = getNewArray(str,operandList, opList);
    console.log('Full array after operators' + newStrArray);
    var clearedUnaryStr = clearUnary(newStrArray);
    console.log('after unary operator' + clearedUnaryStr);
    var indexofDivOp = [];
    var indexofMulOP = [];
    var indexOfAddOp = [];
    var indexOfSubOp = [];
    var strArray = clearedUnaryStr.filter(e => { if (e != '') return e });
    console.log("before opearions" + strArray);
    var divisionResult = division(strArray);
    //var divisionResult=division(clearedUnaryStr);
    console.log("Division Result:" + divisionResult);
    var multiplyRes = multiply(divisionResult);
    console.log("Multiply result :" + multiplyRes);
    var total = addsub(multiplyRes);






    function getListOfOperands(str) 
    {
     if(str!=null)
        {
        let strArray1 = str.split(/[-,+,*,/,%]+/);
        let strArray = strArray1.filter(e => { if (e != '') return e });
        let uniStrArray=[...new Set(strArray)];
        console.log(strArray);
        let listOfOperands = [];
        class Operand {
            constructor(number, location) {
                this.number = Number(number);
                this.location = location;
            }
        }
        for(let i=0;i<uniStrArray.length;i++)
        {
          debugger;
            let opLocation=[];
          
            
            for (let j = 0; j < str.length; ++j) {
              
              
              if (str.substring(j, j + uniStrArray[i].length) === uniStrArray[i]) {
                opLocation.push(j);
               

              }
            
             
        }
         let operand= new Operand(uniStrArray[i],opLocation);
        console.log('operand'+operand);
        listOfOperands.push(operand);
      
      

       
    }
    console.log('inside the function'+listOfOperands);
    return listOfOperands;
}
    }
    
    

    function getListOfOperators(str) {
        let opList = [];
        class Operator{
        constructor (operator, opposition, opno) {
            this.operator = operator;
            this.opposition = opposition;
            this.opno = opno;
        }
        }
        let opCount = 0;
        let opLocation;

        for (let i = 0; i < str.length; i++) {
            switch (str[i]) {
                case '+':
                    opCount++;

                    let opObject1 = new Operator('+', i, opCount);
                    opList.push(opObject1);
                    break;
                case '-':
                    //    if(i>0){
                    //         if('+-*%/'.lastIndexOf(str[i-1])===0||str[i-1]!=='')
                    opCount++;

                    let opObject2 = new Operator('-', i, opCount);
                    opList.push(opObject2);
                    // }



                    break;
                case '*':
                    opCount++;

                    let opObject3 = new Operator('*', i, opCount);
                    opList.push(opObject3);
                    break;
                case '/':
                    opCount++;


                    let opObject4 = new Operator('/', i, opCount);
                    opList.push(opObject4);
                    break;
                case '%':
                    opCount++;
                    opLocation = i;


                    let opObject5 = new Operator('%', i, opCount);
                    opList.push(opObject5);
                    break;
                case ')':
                    opCount++;
                    opLocation = i;

                    let opObject6 = new Operator('+', i, opCount);
                    opList.push(opObject6);
                    break;
                case ')':
                    opCount++;
                    opLocation = i;
                    //var opObject={'opNO':opCount,'opObject.op':'(','opObject':opLocation};

                    let opObject7 = new Operator('+', i, opCount);
                    opList.push(opObject7);
                    break;
            }

        }


        return opList;
    }
  
    function getNewArray(str,operandList,opList) {
        let arrLen=str.length;
        let newArray=[arrLen];
        for(let i=0;i<operandList.length;i++)
        {
            for(let j=0;j<operandList[i].location.length;j++)
            {
                newArray[operandList[i].location[j]]=operandList[i].number;
            }
        }
        
        for(let k=0;k<opList.length;k++)
        {
            newArray[opList[k].opposition]=opList[k].operator;
        
        }
        console.log(newArray);
        return newArray;
    }
  



   

    function division(strArray) {
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
    function multiply(strArray) {
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
            // has a operaror has a operator before it replace it 
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