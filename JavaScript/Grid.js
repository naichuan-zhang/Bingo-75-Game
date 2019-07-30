var currentMoney=100;
var aGenerateNumber;
var idOfClickedNumber;
var clickedNumber;
var num1,num2,num3,round=1;
var times=generateTimes();
var gameOver1=false;
var randomNumbers=new Array(times);
function playGame()
{
	$(".workArea").hide();
	$("#grid,#pos,.input,#numbers,#money").toggle();
	generateGrid();
	generateNumbersInBlock();
	$("#b2,#b3").attr("disabled","disabled");
	$(document).ready(function(){
		$("td").not("#32,#37,#42").unbind('click').click(function(event){
			idOfClickedNumber=$(this).attr("id");
			clickedNumber=document.getElementById(idOfClickedNumber).value;
			$(this).css("color","red").css("backgroundColor","#F5DEB3").attr("backgroundColor","#F5DEB3");
			$(this).attr("disabled","disabled");
			event.preventDefault();
			var isEqual=checkNumbersIfEqual();
			if(isEqual==true)
			{
				document.getElementById("warning").innerHTML="Well down!!!";
				$("#warning").css("fontWeight","bold").css("fontSize","100%").css("color","green").show();
				if(times > 0)
				{
					generateNumbersInBlock();
				}
				else
				{
					document.getElementById("warning").innerHTML="All the numbers have been generated!";
					$("#warning").css("fontWeight","bold").css("fontSize","100%").css("color","blue").show();
				}
			}
			else
			{
				document.getElementById("warning").innerHTML="The number you choose is not consistent " + 
															"with the number shown. Please re-try!";
				$("#warning").css("fontWeight","bold").css("fontSize","100%").css("color","red").show();
				$(this).css("color","black").css("background-color","#DEB887");
			}
			if(round==1&&times==0)
				$("#b2").attr("disabled",false);
			if(round==2&&times==0)
				$("#b3").attr("disabled",false);
			getRules();
		});
	});
	getCurrentMoney();
}

function generateGrid()
{
	for(var i=0;i<=14;i++)
	{
		if(document.getElementById(i))
		{
			generateRandomNumbers(15,1,15,0);
		}
	}
	for(var i=15;i<=29;i++)
	{
		if(document.getElementById(i))
		{
			generateRandomNumbers(15,16,30,15);
		}
	}
	for(var i=30;i<=41;i++)
	{
		if(document.getElementById(i))
		{
			generateRandomNumbers(15,31,45,30);
		}
	}
	for(var i=42;i<=56;i++)
	{
		if(document.getElementById(i))
		{
			generateRandomNumbers(15,46,60,45);
		}
	}
	for(var i=57;i<=71;i++)
	{
		if(document.getElementById(i))
		{
			generateRandomNumbers(15,61,75,60);
		}
	}
	num1=document.getElementById("32").value;
	num2=document.getElementById("37").value;
	num3=document.getElementById("42").value;
	$("#32,#37,#42").html("  ");
}

function generateRandomNumbers(n,min,max,x)
{
	var arr=[];
	for(var i=0;i<n;i++)
	{
		arr[i]=parseInt(Math.random()*(max-min+1)+min);
		for(var j=0;j<i;j++)
		{
			if(arr[i]==arr[j])
			{
				i=i-1;
				break;
			}
		}
	}
	for(var i=0,k=x;i<arr.length;i++,k++)
	{
		document.getElementById(k).value=arr[i];
		document.getElementById(k).innerHTML=arr[i];
	}
	arr.splice(0,arr.length);
}

function generateTimes()
{
	var times=0;
	times=parseInt(Math.random()*5+20);
	return times;
}

function checkNumbersIfEqual()
{
	if(clickedNumber == aGenerateNumber)
		return true;
	else
		return false;
}

function generateNumbersInBlock()
{
	var i,duplicateIndex;
	var uniqueNumbersRequired=randomNumbers.length;
	for(i=0;i<uniqueNumbersRequired; )
	{
		aGenerateNumber=parseInt(Math.random()*75+1);	//every random number - range 1 to 75
		randomNumbers[i]=aGenerateNumber;
		duplicateIndex=0;
		while(randomNumbers[duplicateIndex]!=aGenerateNumber)
		{
			duplicateIndex++;
		}
		if(i==duplicateIndex&&num1!=aGenerateNumber&&num2!=aGenerateNumber&&num3!=aGenerateNumber)
		{
			i++;
			$("#showNumbers").html(aGenerateNumber);
		}
	}
	times--;
}

function getCurrentMoney()
{
	document.getElementById("money").innerHTML=
			"Your current money is: "+'<span id="span1">'+currentMoney+'</span>';
	$("#money").css("fontWeight","bold");
}

function getRules()
{
	document.getElementById("rules").innerHTML=
			'<span id="span2">'+"Round "+round+'</span>'+
			'</br><span id="span3">'+(times+1)+'</span>'+" random numbers left";
}

function checkLine()
{
	var isWin=false;
	var k=0,i,j;
	for(i=0;i<=14;i++)
	{
		if(i==2 || i==7 || i==12)
		{
			var attrValue;
			for(j=i;j<=(i+(15*5));j+=15)
			{
				attrValue=$("#"+j).attr("backgroundColor");
				if(attrValue == "#F5DEB3")
					k++;
			}
			if(k==4)
			{
				isWin=true;
				k=0;
				break;
			}
		}
		else
		{
			var attrValue;
			for(j=i;j<=(i+(15*5));j+=15)
			{
				attrValue=$("#"+j).attr("backgroundColor");
				if(attrValue == "#F5DEB3")
					k++;
			}
			if(k==5)
			{
				isWin=true;
				k=0;
				break;
			}
		}
		k=0;
	}
	if(isWin)
	{
		finalResult.innerHTML="Congratulations, you win!<br/>You can get 50 money.";
		currentMoney+=50;
		getCurrentMoney();
		$("#b2,#b3").attr("disabled","disabled");
	}
	else
	{
		finalResult.innerHTML="Sorry, but you lost.<br/>You will lose 50 money.";
		round=2;
		currentMoney-=50;
		getCurrentMoney();
		$("#b2,#b3").attr("disabled","disabled");
		playRound2();
	}
	if(currentMoney==0)
		looseGame();
}

function playRound2()
{
	round=2;
	times=parseInt(Math.random()*5+40);
	getRules();
}

function checkPanel()
{
	var isWin=false;
	var a=b=c=0,i,j;
	var attrValue;
	for(i=0;i<=4;i++)
	{
		for(j=i;j<=(i+(15*5));j+=15)
		{
			attrValue=$("#"+j).attr("backgroundColor");
			if(attrValue == "#F5DEB3")
				a++;
		}
	}
	for(i=5;i<=9;i++)
	{
		for(j=i;j<=(i+(15*5));j+=15)
		{
			attrValue=$("#"+j).attr("backgroundColor");
			if(attrValue == "#F5DEB3")
				b++;
		}
	}
	for(i=10;i<=14;i++)
	{
		for(j=i;j<=(i+(15*5));j+=15)
		{
			attrValue=$("#"+j).attr("backgroundColor");
			if(attrValue == "#F5DEB3")
				c++;
		}
	}
	if(a==24 || b==24 || c==24)
	{
		finalResult.innerHTML="Congratulations, you win!<br/>You can get 50 money.";
		currentMoney+=50;
		getCurrentMoney();
		$("#b2,#b3").attr("disabled","disabled");
	}
	else
	{
		finalResult.innerHTML="Sorry, but you lost.<br/>You will lose 50 money.";
		currentMoney-=50;
		getCurrentMoney();
		$("#b2,#b3").attr("disabled","disabled");
	}
	if(currentMoney==0)
		looseGame();
}

function looseGame()
{
	$("#grid,#b2,#b3,#pos,#money,#warning,#finalResult,#rules").hide();
	$("#loose,#comeBack").toggle();
}

function quitGame()
{
	$(".workArea").hide();
	$("#quit").toggle();
	$("#comeBack").toggle();
}

function quitGame2()
{
	$("#grid,#b2,#b3,#pos,#money,#warning,#finalResult,#rules").hide();
	$("#quit,#comeBack").toggle();
}