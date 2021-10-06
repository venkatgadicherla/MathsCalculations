import {evalu,clearUnary} from './twoop.js';

document.querySelector('button').addEventListener('click', getResult);

export function getResult()
{
let str=document.getElementById('expTxt').value;
let newstr;
if(str.indexOf('**'))
{
    newstr= str.replace('**','^')
}
//let newStrArray=str.split(/['()']+/);
// var strArray=clearUnary(newstr.split(''));
var strArray=newstr.split('');
console.log(strArray);
var finalStr;
debugger;
if(strArray.includes('('))
{
 finalStr=resolveExp(strArray);
console.log('Result'+finalStr);
}
else{
console.log('Result'+finalStr);
finalStr=evalu(strArray);
}
document.getElementById('resultTxt').value=finalStr;
//console.log(newBracketarray);

function findBrackets(strArray)
{
   
   
    var bracketArray=[];
    function brackObject(bracket,postion)
    {
        this.bracket=bracket;
        this.postion=postion;
    }

    for(let i=0;i<strArray.length;i++)
    {
        if(strArray[i]==='(')
        {
            var bracket=new brackObject(strArray[i],i);
            bracketArray.push(bracket);
        }
        else if(strArray[i]===')')
        {
            var bracket=new brackObject(strArray[i],i);
            bracketArray.push(bracket);
        }
    }
    return bracketArray;


}
function resolveExp(strArray)
{
    // This function is a recursive function which calls the findbrackets function
    // to split the expression and evalutes the expression with in the brackets 
    //and eventually the whole expression and return the final result.

    
    let pairCounter=0;
  
    var newBracketArray=[];
    var replaceValues=[];
    function replaceExp(value,startLocation,length)// This object is used to store and
                                                    //replace the evaluated subexpression
                                                
    {
        this.value=value;
        this.startLocation=this.startLocation;
        this.length=length;
    }

  
    newBracketArray=findBrackets(strArray);
    console.log('NewBracket Array'+newBracketArray);
    
     if(newBracketArray.length===0)
    {
        console.log(`If Loop Array${strArray}`);
        //let finalExp=evalu(strArray.join(''));
        let finalExp=evalu(strArray);
        //console.log(finalExp);
        return finalExp;
      }
  
    else  {
           //console.log("New Array Length"+newBracketArray.length);
                for(let i=0;i<newBracketArray.length;i++)
                {

                    if(newBracketArray[i].bracket==='('&& newBracketArray[i+1].bracket===')')
                    { 
                        pairCounter++;
                        //console.log(`pairno${pairCounter}`)
                        let exp=[];
                        let expLen=newBracketArray[i+1].postion-newBracketArray[i].postion;
                        //console.log(expLen);
                        exp=strArray.slice(newBracketArray[i].postion+1,newBracketArray[i+1].postion);
                      //  let value=evalu(exp.join(''));
                        let value=evalu(exp);
                        var reExp= new replaceExp();
                        reExp.value=value;
                        reExp.length=newBracketArray[i+1].postion+1-newBracketArray[i].postion;
                        reExp.startLocation=newBracketArray[i].postion;
                        replaceValues.push(reExp);
                    // strArray.splice(newBracketArray[i].postion,expLen+1,value)
                        //console.log(`value:${evalu(exp.join(''))}`);
                        
                    }
                }

                console.log(`totalbrackets:${ pairCounter}`);

                let replaceLocation=0;
                for(let i=0;i<replaceValues.length;i++)
                {
                    
                strArray.splice(replaceValues[i].startLocation-replaceLocation,replaceValues[i].length,replaceValues[i].value);

                replaceLocation+=replaceValues[i].length-1;

                }
                console.log('Final Array'+strArray);
                return resolveExp(strArray);
  }
}
}
