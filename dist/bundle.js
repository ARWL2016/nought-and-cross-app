!function(n){function t(e){if(r[e])return r[e].exports;var i=r[e]={i:e,l:!1,exports:{}};return n[e].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var r={};return t.m=n,t.c=r,t.i=function(n){return n},t.d=function(n,r,e){t.o(n,r)||Object.defineProperty(n,r,{configurable:!1,enumerable:!0,get:e})},t.n=function(n){var r=n&&n.__esModule?function(){return n.default}:function(){return n};return t.d(r,"a",r),r},t.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)},t.p="/",t(t.s=2)}([function(n,t,r){"use strict";$(document).ready(function(){function n(){"X"==P?($("#player1").addClass("underline"),$("#player2").removeClass("underline")):($("#player2").addClass("underline"),$("#player1").removeClass("underline"))}function t(){if(x<9&&"in progress"==j){if(x+=1,P=x%2===0?"O":"X",A=x%2===0?O:C,H=x%2===0?C:O,n(),!("computer"==X&&x%2!==0||"computer"==G&&x%2===0))return;b()}else 9==x&&"in progress"==j&&$("#newGame").html("Play again?")}function r(){for(var n=0;n<N.length;n++)N[n][0]+N[n][1]+N[n][2]==3*A&&($(".boardButton").prop("disabled",!0),e(n),i(),j="winner",$("#newGame").html("Play again?"))}function e(n){$(T[n][0]).addClass("winAnimation"),$(T[n][1]).addClass("winAnimation"),$(T[n][2]).addClass("winAnimation")}function i(){"X"==P?B+=1:S+=1,$("#scoreBoard").html(B+" : "+S)}function o(){B=0,S=0,$("#scoreBoard").html(B+" : "+S)}function l(n){_[n]=A,d=[_[0],_[1],_[2]],m=[_[3],_[4],_[5]],p=[_[6],_[7],_[8]],h=[_[0],_[3],_[6]],v=[_[1],_[4],_[7]],y=[_[2],_[5],_[8]],k=[_[0],_[4],_[8]],g=[_[2],_[4],_[6]],w=[_[1],_[3],_[5],_[7]],N=[d,m,p,h,v,y,k,g],M=[_[4],_[0],_[2],_[6],_[8],_[1],_[3],_[5],_[7]]}function a(){for(var n=0,t=N.length;n<t;n++)if(N[n][0]+N[n][1]+N[n][2]==2*A){var r=T[n][N[n].indexOf(0)];return $(r).click(),!0}return!1}function c(){for(var n=0,t=N.length;n<t;n++)if(N[n][0]+N[n][1]+N[n][2]==2*H){var r=T[n][N[n].indexOf(0)];return $(r).click(),!0}return!1}function u(){for(var n in M)if(0===M[n]){$(q[n]).click();break}}function f(n,t){if(n.length!==t.length)return!1;for(var r=n.length;r--;)if(n[r]!==t[r])return!1;return!0}function s(n){for(var t=0,r=n.length;r--;)t+=n[r];return t}function b(){setTimeout(function(){var n=a();if(console.log("didwin"+n),!n){var t=c();if(console.log("didblock"+t),!t){if(5==x&&1==_[1]&&0===_[6])return void $("#btn6").click();if(4==x&&(f(k,[5,1,5])||f(g,[5,1,5])))return void $("#btn1").click();if(4==x&&6==s(d)&&5==s(p))return void $("#btn8").click();if(4==x&&5==s(d)&&6==s(p))return void $("#btn0").click();if(4==x&&6==s(h)&&5==s(y))return void $("#btn2").click();if(4==x&&5==s(h)&&6==s(y))return void $("#btn6").click();if(4==x&&(f(w,[1,0,5,5])||f(w,[1,5,0,5])||f(w,[5,5,1,0])||f(w,[0,5,1,5])))return void $("#btn6").click();if(4==x&&(f(w,[5,1,5,0])||f(w,[0,1,5,5])||f(w,[5,0,5,1])||f(w,[5,5,0,1])))return void $("#btn2").click();if(2==x)for(var r in w)if(5==w[r]){var e=z[r];return void $(e).click()}u()}}},200)}var d,m,p,h,v,y,k,g,w,C=5,O=1,x=1,X="human",G="computer",B=0,S=0,A=C,H=O,P="X",j="in progress",_=[0,0,0,0,0,0,0,0,0],M=[0,0,0,0,0,0,0,0,0],N=[[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]],T=[["#btn0","#btn1","#btn2"],["#btn3","#btn4","#btn5"],["#btn6","#btn7","#btn8"],["#btn0","#btn3","#btn6"],["#btn1","#btn4","#btn7"],["#btn2","#btn5","#btn8"],["#btn0","#btn4","#btn8"],["#btn2","#btn4","#btn6"]],q=["#btn4","#btn0","#btn2","#btn6","#btn8","#btn1","#btn3","#btn5","#btn7"],z=["#btn7","#btn5","#btn3","#btn1"];$("#player1").on("click",function(){"Human - X"==$(this).html()?($(this).html("Skynet - X"),X="computer"):($(this).html("Human - X"),X="human"),o(),$("#newGame").click()}),$("#player2").on("click",function(){"O - Human"==$(this).html()?($(this).html("O - Skynet"),G="computer"):($(this).html("O - Human"),G="human"),o(),$("#newGame").click()}),$("#newGame").on("click",function(){x=1,j="in progress",A=C,P="X",n(),_=[0,0,0,0,0,0,0,0,0],M=[0,0,0,0,0,0,0,0,0],N=[[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]],$("#scoreBoard").html(B+" : "+S),$(".boardButton").html("").removeClass("player1Style player2Style winAnimation").prop("disabled",!1),$("#newGame").html("New Game"),"computer"==X&&(console.log("computer should play now!!"),b())}),$(".boardButton").on("click",function(){$(this).html(P);var n=x%2===0?"player2Style":"player1Style";$(this).addClass(n),$(this).prop("disabled",!0);var e=$(this).data("num");l(e),r(),t()})}),r(1)},function(n,t){},function(n,t,r){n.exports=r(0)}]);