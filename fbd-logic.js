

	if (Modernizr.canvas) {
	  console.log("support canvas +");
	} else {
	  alert("Your browser does not support canvas!");
	}
	
	if (Modernizr.mutationobserver) {
	  console.log("support mutationobserver +");
	} else {
	  alert("Your browser does not support mutationobserver!");
	}
	
	if (Modernizr.cssgradients) {
	  console.log("support cssgradients +");
	} else {
	  alert("Your browser does not support cssgradients!");
	}			
	
	var arrowsArr = [];
	var blocksArr = [];
	var oId;
	var p2;
	var inUseObj = {};
	
	var ctObj = {};
	var btObj = {};
	
	var delMode = 0;

	function Menu(elem) {
		var idnumber = 4;
		
		this.switch = function() {
		  createBlock("sw", idnumber);
		  dragndrop();
		  idnumber++;
		};
		
		this.out = function() {
		  createBlock("out", idnumber);
		  dragndrop();
		  idnumber++;
		};
		
		this.and = function() {
		  createBlock("and", idnumber);
		  dragndrop();
		  idnumber++;
		};
		
		this.or = function() {
		  createBlock("or", idnumber);
		  dragndrop();
		  idnumber++;
		};
		
		this.xor = function() {
		  createBlock("xor", idnumber);
		  dragndrop();
		  idnumber++;
		};
		
		this.not = function() {
		  createBlock("not", idnumber);
		  dragndrop();
		  idnumber++;
		};
		
		this.nand = function() {
		  createBlock("nand", idnumber);
		  dragndrop();
		  idnumber++;
		};
		
		this.nor = function() {
		  createBlock("nor", idnumber);
		  dragndrop();
		  idnumber++;
		};
		
		this.delay = function() {
		  createBlock("delay", idnumber);
		  dragndrop();
		  idnumber++;
		};
		
		this.ton = function() {
		  createBlock("ton", idnumber);
		  dragndrop();
		  idnumber++;
		};
		
		this.tof = function() {
		  createBlock("tof", idnumber);
		  dragndrop();
		  idnumber++;
		};
		
		this.pulse = function() {
		  createBlock("pulse", idnumber);
		  dragndrop();
		  idnumber++;
		};
		
		this.rs = function() {
		  createBlock("rs", idnumber);
		  dragndrop();
		  idnumber++;
		};
		
		this.trig = function() {
		  createBlock("trig", idnumber);
		  dragndrop();
		  idnumber++;
		};
		
		this.delm = function() {
		  delMode = +!delMode;
		  var button = document.getElementsByClassName("menu-button");				  
		  var blNameObj = document.getElementsByClassName("block-name");
		  var blOutObj = document.getElementsByClassName("out");
		  var blInObj = document.getElementsByClassName("in");
		  
			if (delMode){
				for (var i = 0; i < blNameObj.length; i++) {					  
					blNameObj[i].classList.add("del-cursor");
				}
				
				for (var i = 0; i < blOutObj.length; i++) {					  
					blOutObj[i].classList.add("del-cursor");	 
				}
				
				for (var j = 0; j < blInObj.length; j++) {
					blInObj[j].classList.add("del-cursor");
				}
				
				for (var k = 0; k < button.length; k++) {
					//button[k].style.display = "none";
					button[k].setAttribute("disabled","");
				}	  
				
			}
			else {
				for (var i = 0; i < blNameObj.length; i++) {					  
					blNameObj[i].classList.remove("del-cursor");
				}
				
				for (var i = 0; i < blOutObj.length; i++) {					  
					blOutObj[i].classList.remove("del-cursor");	 
				}
				
				for (var j = 0; j < blInObj.length; j++) {
					blInObj[j].classList.remove("del-cursor");
				}
				
				for (var k = 0; k < button.length; k++) {
					//button[k].style.display = "inline-block";
					button[k].removeAttribute("disabled","");
				}
			  
			}
		};
		
		var self = this;

		elem.onclick = function(e) {
		  var target = e.target;
		  var action = target.getAttribute('data-action');
		  if (action) {
			self[action]();
		  }
		};
    }
	
	new Menu(menu);
	
	function getCoords(elem) { 
	  var box = elem.getBoundingClientRect();

	  return {
		top: box.top, //+ pageYOffset,
		left: box.left //+ pageXOffset
	  };

	}
	
	var arrowCur = $cArrows('#content');
	
	function arrowDivCur(){
		var arrowDiv = document.getElementById("arrow-div");
		if (arrowDiv) arrowDiv.remove();
		
		//var arrowCur = $cArrows('#content');	
		arrowCur.clear();
		
		var con = document.getElementById("content");
		
		var div = document.createElement('div');
		div.id = "arrow-div";
		div.className = "arrow-div";
		div.style.position = "absolute";
		div.style.left = event.clientX - getCoords(con).left - 2 + "px";
		div.style.top = event.clientY - getCoords(con).top - 2 + "px";				
		document.getElementById("content").appendChild(div);
		
		arrowCur.arrow('#'+oId, '#arrow-div',
			  { arrow: { connectionType: 'side', sideFrom: 'right', sideTo: 'left'}});
			  
	}
	
	function delArrowDivCur() {
		if(event.keyCode == 27) {   // Esc key
			var arrowDiv = document.getElementById("arrow-div");
			arrowCur.clear();
			if (arrowDiv) {
				document.getElementById("content").removeChild(arrowDiv);
				document.removeEventListener("mousemove", arrowDivCur);
			}	
		}
		
	}
	
	function ContentClick(elem) {
						
		this.startPoint = function() {
			event = event || window.event;
			oId = event.target.id;			  
			
			document.addEventListener("mousemove", arrowDivCur);
			document.addEventListener("keydown", delArrowDivCur);
		  
			if (delMode) {
				if (confirm("Delete arrow(s) from: " + oId + "?")) {
					delOutArrow(oId);
				}
			}								
		};
		
		this.endPoint = function() {
			event = event || window.event;
			p2 = event.target.id;
			
			if (delMode) {
				if (confirm("Delete arrow to: " + p2 + "?")) {
					delInArrow([p2]);
				}
			}
			else {
				if (!inUseObj[p2]) {
	
					var arrowDiv = document.getElementById("arrow-div");
					arrowCur.clear();
					if (arrowDiv) {
						document.getElementById("content").removeChild(arrowDiv);
						document.removeEventListener("mousemove", arrowDivCur);
					}
				
					var arrowsDrawerN = $cArrows('#content');	  
					arrowsDrawerN.arrow('#'+oId, '#'+p2,
					{ arrow: { connectionType: 'side', sideFrom: 'right', sideTo: 'left'}});
					arrowsArr.push([oId, p2, arrowsDrawerN]);
					document.getElementById(p2).innerHTML =
					document.getElementById(oId).innerHTML;						
					inUseObj[p2] = 1;				
				}
				else alert("Input is already in use");
			}	
		};
		
		this.canBeDel = function() {
			event = event || window.event;
			var delBl = event.target.parentElement;
			var delId = [];
			if (delMode) {
				if (confirm("Delete block: " + delBl.id +
				" and connected arrows?")){					 
					for (var i = 0; i < delBl.childNodes.length; i++) {							
						if (delBl.childNodes[i].className == "out del-cursor" ||
						delBl.childNodes[i].className == "in in" + (i - 1)
						+ " del-cursor") {
							delId.push(delBl.childNodes[i].id);
						}						
					}
					 
					for (var j = blocksArr.length - 1; j >= 0; j--) {
						if (blocksArr[j][1] == delId[delId.length-1]) {
							blocksArr.splice(j,1);
						}
					} 
					
					delOutArrow(delId[delId.length-1]);							
					
					delInArrow(delId);	
					
					delBl.remove();
				}
			
			} 
		};
		
		var self = this;

		elem.onclick = function(e) {
			var target = e.target;
			var action = target.getAttribute('data-action');
			if (action) {
				self[action]();
			}
		};
    }
	
	new ContentClick(content);
	
	function delInArrow(delArr) {
		for (var k = arrowsArr.length - 1; k >= 0; k--) {
			for (var l = 0; l < delArr.length; l++){
				if (arrowsArr[k]) {
					if (arrowsArr[k][1] == delArr[l]) {
						delete inUseObj[arrowsArr[k][1]];
						arrowsArr[k][2].clear();
						arrowsArr.splice(k,1);
					}
				}
			}
		} 		
	}
	
	function delOutArrow(delOutId) {
		for (var k = arrowsArr.length - 1; k >= 0; k--) {
			if (arrowsArr[k][0] == delOutId) {
				delete inUseObj[arrowsArr[k][1]];
				arrowsArr[k][2].clear();
				arrowsArr.splice(k,1);
			}
		}		
	}
	
	function createBlock(blockType, idn) {
	
		switch(blockType) {
		
		  case "sw":
			var div = document.createElement('div'),
				spanId = document.createElement('span'),
				div1 = document.createElement('div'),
				div2 = document.createElement('div'),
				btn = document.createElement('button');
			div.className = "ui-draggable new";
			div.id = "Block" + idn;
			spanId.className = "bl-span-id";
			spanId.innerHTML = div.id;
			div1.className = "block-name";
			div1.setAttribute("data-action","canBeDel");
			div1.innerHTML = "1/0";
			div2.className = "out";
			div2.id = "b" + idn + "out";
			div2.setAttribute("data-action","startPoint");
			div2.innerHTML = 0;
			btn.className = "sw-button";
			btn.innerHTML = "1/0";
			btn.setAttribute("onclick","init('" + div2.id + "')");
			document.getElementById("content").appendChild(div);
			document.getElementById("Block"+idn).appendChild(spanId);
			document.getElementById("Block"+idn).appendChild(div1);
			document.getElementById("Block"+idn).appendChild(div2);
			document.getElementById("Block"+idn).appendChild(btn);
		  break;
		  
		  case "out":
			var div = document.createElement('div'),
				spanId = document.createElement('span'),
				div1 = document.createElement('div'),
				div2 = document.createElement('div'),
				div3 = document.createElement('div');
			div.className = "ui-draggable new";
			div.id = "Block" + idn;
			spanId.className = "bl-span-id";
			spanId.innerHTML = div.id;					
			div1.className = "block-name";
			div1.setAttribute("data-action","canBeDel");
			div1.innerHTML = "OUT";
			div2.className = "in in1";
			div2.id = "b" + idn + "in1";
			div2.setAttribute("data-action","endPoint");					
			div3.className = "out";
			div3.id = "b" + idn + "out";
			div3.innerHTML = 0;					
			div3.setAttribute("data-action","startPoint");
			document.getElementById("content").appendChild(div);
			document.getElementById("Block"+idn).appendChild(spanId);
			document.getElementById("Block"+idn).appendChild(div1);
			document.getElementById("Block"+idn).appendChild(div2);
			document.getElementById("Block"+idn).appendChild(div3);
			
			blocksArr.push([outBl, div3.id, div2.id]);
			observer.observe(div2, options);
			
		  break;
		  
		  case "and":
			var div = document.createElement('div'),
				spanId = document.createElement('span'),
				div1 = document.createElement('div'),
				div2 = document.createElement('div'),
				div3 = document.createElement('div'),
				div4 = document.createElement('div');
			div.className = "ui-draggable new";
			div.id = "Block" + idn;
			spanId.className = "bl-span-id";
			spanId.innerHTML = div.id;					
			div1.className = "block-name";
			div1.setAttribute("data-action","canBeDel");
			div1.innerHTML = "&";
			div2.className = "in in1";
			div2.id = "b" + idn + "in1";
			div2.setAttribute("data-action","endPoint");
			div3.className = "in in2";
			div3.id = "b" + idn + "in2";					
			div3.setAttribute("data-action","endPoint");
			div4.className = "out";
			div4.id = "b" + idn + "out";
			div4.setAttribute("data-action","startPoint");
			div4.innerHTML = 0;	
			document.getElementById("content").appendChild(div);
			document.getElementById("Block"+idn).appendChild(spanId);
			document.getElementById("Block"+idn).appendChild(div1);
			document.getElementById("Block"+idn).appendChild(div2);
			document.getElementById("Block"+idn).appendChild(div3);
			document.getElementById("Block"+idn).appendChild(div4);
			
			blocksArr.push([andBl, div4.id, div2.id, div3.id]);
			observer.observe(div2, options);
			observer.observe(div3, options);
			
		  break;
		  
		  case "or":
			var div = document.createElement('div'),
				spanId = document.createElement('span'),
				div1 = document.createElement('div'),
				div2 = document.createElement('div'),
				div3 = document.createElement('div'),
				div4 = document.createElement('div');
			div.className = "ui-draggable new";
			div.id = "Block" + idn;
			spanId.className = "bl-span-id";
			spanId.innerHTML = div.id;					
			div1.className = "block-name";
			div1.setAttribute("data-action","canBeDel");
			div1.innerHTML = "OR";
			div2.className = "in in1";
			div2.id = "b" + idn + "in1";
			div2.setAttribute("data-action","endPoint");
			div3.className = "in in2";
			div3.id = "b" + idn + "in2";
			div3.setAttribute("data-action","endPoint");
			div4.className = "out";
			div4.id = "b" + idn + "out";
			div4.setAttribute("data-action","startPoint");
			div4.innerHTML = 0;	
			document.getElementById("content").appendChild(div);
			document.getElementById("Block"+idn).appendChild(spanId);
			document.getElementById("Block"+idn).appendChild(div1);
			document.getElementById("Block"+idn).appendChild(div2);
			document.getElementById("Block"+idn).appendChild(div3);
			document.getElementById("Block"+idn).appendChild(div4);
			
			blocksArr.push([orBl, div4.id, div2.id, div3.id]);
			observer.observe(div2, options);
			observer.observe(div3, options);
			
		  break;
		  
		  case "xor":
			var div = document.createElement('div'),
				spanId = document.createElement('span'),
				div1 = document.createElement('div'),
				div2 = document.createElement('div'),
				div3 = document.createElement('div'),
				div4 = document.createElement('div');
			div.className = "ui-draggable new";
			div.id = "Block" + idn;
			spanId.className = "bl-span-id";
			spanId.innerHTML = div.id;					
			div1.className = "block-name";
			div1.setAttribute("data-action","canBeDel");
			div1.innerHTML = "XOR";
			div2.className = "in in1";
			div2.id = "b" + idn + "in1";
			div2.setAttribute("data-action","endPoint");
			div3.className = "in in2";
			div3.id = "b" + idn + "in2";
			div3.setAttribute("data-action","endPoint");
			div4.className = "out";
			div4.id = "b" + idn + "out";
			div4.setAttribute("data-action","startPoint");
			div4.innerHTML = 0;	
			document.getElementById("content").appendChild(div);
			document.getElementById("Block"+idn).appendChild(spanId);
			document.getElementById("Block"+idn).appendChild(div1);
			document.getElementById("Block"+idn).appendChild(div2);
			document.getElementById("Block"+idn).appendChild(div3);
			document.getElementById("Block"+idn).appendChild(div4);
			
			blocksArr.push([xorBl, div4.id, div2.id, div3.id]);
			observer.observe(div2, options);
			observer.observe(div3, options);
			
		  break;
		  
		  case "not":
			var div = document.createElement('div'),
				spanId = document.createElement('span'),
				div1 = document.createElement('div'),
				div2 = document.createElement('div'),
				div3 = document.createElement('div');
			div.className = "ui-draggable new";
			div.id = "Block" + idn;
			spanId.className = "bl-span-id";
			spanId.innerHTML = div.id;					
			div1.className = "block-name";
			div1.setAttribute("data-action","canBeDel");
			div1.innerHTML = "NOT";
			div2.className = "in in1";
			div2.id = "b" + idn + "in1";
			div2.setAttribute("data-action","endPoint");					
			div3.className = "out";
			div3.id = "b" + idn + "out";
			div3.setAttribute("data-action","startPoint");
			div3.innerHTML = 1;	
			document.getElementById("content").appendChild(div);
			document.getElementById("Block"+idn).appendChild(spanId);
			document.getElementById("Block"+idn).appendChild(div1);
			document.getElementById("Block"+idn).appendChild(div2);
			document.getElementById("Block"+idn).appendChild(div3);
			
			blocksArr.push([notBl, div3.id, div2.id]);
			observer.observe(div2, options);
			
		  break;
		  
		  case "nand":
			var div = document.createElement('div'),
				spanId = document.createElement('span'),
				div1 = document.createElement('div'),
				div2 = document.createElement('div'),
				div3 = document.createElement('div'),
				div4 = document.createElement('div');
			div.className = "ui-draggable new";
			div.id = "Block" + idn;
			spanId.className = "bl-span-id";
			spanId.innerHTML = div.id;					
			div1.className = "block-name";
			div1.setAttribute("data-action","canBeDel");
			div1.innerHTML = "&NOT";
			div2.className = "in in1";
			div2.id = "b" + idn + "in1";
			div2.setAttribute("data-action","endPoint");
			div3.className = "in in2";
			div3.id = "b" + idn + "in2";
			div3.setAttribute("data-action","endPoint");
			div4.className = "out";
			div4.id = "b" + idn + "out";
			div4.setAttribute("data-action","startPoint");
			div4.innerHTML = 1;
			document.getElementById("content").appendChild(div);
			document.getElementById("Block"+idn).appendChild(spanId);
			document.getElementById("Block"+idn).appendChild(div1);
			document.getElementById("Block"+idn).appendChild(div2);
			document.getElementById("Block"+idn).appendChild(div3);
			document.getElementById("Block"+idn).appendChild(div4);
			
			blocksArr.push([nandBl, div4.id, div2.id, div3.id]);
			observer.observe(div2, options);
			observer.observe(div3, options);
			
		  break;
		  
		  case "nor":
			var div = document.createElement('div'),
				spanId = document.createElement('span'),
				div1 = document.createElement('div'),
				div2 = document.createElement('div'),
				div3 = document.createElement('div'),
				div4 = document.createElement('div');
			div.className = "ui-draggable new";
			div.id = "Block" + idn;
			spanId.className = "bl-span-id";
			spanId.innerHTML = div.id;					
			div1.className = "block-name";
			div1.setAttribute("data-action","canBeDel");
			div1.innerHTML = "ORNOT";
			div2.className = "in in1";
			div2.id = "b" + idn + "in1";
			div2.setAttribute("data-action","endPoint");
			div3.className = "in in2";
			div3.id = "b" + idn + "in2";
			div3.setAttribute("data-action","endPoint");
			div4.className = "out";
			div4.id = "b" + idn + "out";
			div4.setAttribute("data-action","startPoint");
			div4.innerHTML = 1;
			document.getElementById("content").appendChild(div);
			document.getElementById("Block"+idn).appendChild(spanId);
			document.getElementById("Block"+idn).appendChild(div1);
			document.getElementById("Block"+idn).appendChild(div2);
			document.getElementById("Block"+idn).appendChild(div3);
			document.getElementById("Block"+idn).appendChild(div4);
			
			blocksArr.push([norBl, div4.id, div2.id, div3.id]);
			observer.observe(div2, options);
			observer.observe(div3, options);
			
		  break;
		  
		  case "delay":
			var div = document.createElement('div'),
				spanId = document.createElement('span'),
				div1 = document.createElement('div'),
				div2 = document.createElement('div'),
				div3 = document.createElement('div'),
				input = document.createElement('input'),
				span = document.createElement('span');
			div.className = "ui-draggable new";
			div.id = "Block" + idn;
			spanId.className = "bl-span-id";
			spanId.innerHTML = div.id;					
			div1.className = "block-name";
			div1.setAttribute("data-action","canBeDel");
			div1.innerHTML = "DELAY";
			div2.className = "in in1";
			div2.id = "b" + idn + "in1";
			div2.setAttribute("data-action","endPoint");					
			div3.className = "out";
			div3.id = "b" + idn + "out";
			div3.setAttribute("data-action","startPoint");
			div3.innerHTML = 0;	
			input.id = "b" + idn + "input";
			input.setAttribute("type","number");
			input.setAttribute("min","0");
			input.setAttribute("value","1.5");
			input.setAttribute("step","0.5");
			span.innerHTML = "S";
			document.getElementById("content").appendChild(div);
			document.getElementById("Block"+idn).appendChild(spanId);
			document.getElementById("Block"+idn).appendChild(div1);
			document.getElementById("Block"+idn).appendChild(div2);
			document.getElementById("Block"+idn).appendChild(div3);
			document.getElementById("Block"+idn).appendChild(input);
			document.getElementById("Block"+idn).appendChild(span);
			
			blocksArr.push([delayBl, div3.id, div2.id, input.id]);
			observer.observe(div2, options);
			
		  break;
		  
		  case "ton":
			var div = document.createElement('div'),
				spanId = document.createElement('span'),
				div1 = document.createElement('div'),
				div2 = document.createElement('div'),
				div3 = document.createElement('div'),
				input = document.createElement('input'),
				span = document.createElement('span');
			div.className = "ui-draggable new";
			div.id = "Block" + idn;
			spanId.className = "bl-span-id";
			spanId.innerHTML = div.id;					
			div1.className = "block-name";
			div1.setAttribute("data-action","canBeDel");
			div1.innerHTML = "TON";
			div2.className = "in in1";
			div2.id = "b" + idn + "in1";
			div2.setAttribute("data-action","endPoint");					
			div3.className = "out";
			div3.id = "b" + idn + "out";
			div3.setAttribute("data-action","startPoint");
			div3.innerHTML = 0;
			input.id = "b" + idn + "input";
			input.setAttribute("type","number");
			input.setAttribute("min","0");
			input.setAttribute("value","1.5");
			input.setAttribute("step","0.5");
			span.innerHTML = "S";
			document.getElementById("content").appendChild(div);
			document.getElementById("Block"+idn).appendChild(spanId);
			document.getElementById("Block"+idn).appendChild(div1);
			document.getElementById("Block"+idn).appendChild(div2);
			document.getElementById("Block"+idn).appendChild(div3);
			document.getElementById("Block"+idn).appendChild(input);
			document.getElementById("Block"+idn).appendChild(span);
			
			blocksArr.push([tonBl, div3.id, div2.id, input.id]);
			observer.observe(div2, options);
			
		  break;
		  
		  case "tof":
			var div = document.createElement('div'),
				spanId = document.createElement('span'),
				div1 = document.createElement('div'),
				div2 = document.createElement('div'),
				div3 = document.createElement('div'),
				input = document.createElement('input'),
				span = document.createElement('span');
			div.className = "ui-draggable new";
			div.id = "Block" + idn;
			spanId.className = "bl-span-id";
			spanId.innerHTML = div.id;					
			div1.className = "block-name";
			div1.setAttribute("data-action","canBeDel");
			div1.innerHTML = "TOF";
			div2.className = "in in1";
			div2.id = "b" + idn + "in1";
			div2.setAttribute("data-action","endPoint");					
			div3.className = "out";
			div3.id = "b" + idn + "out";
			div3.setAttribute("data-action","startPoint");
			div3.innerHTML = 0;
			input.id = "b" + idn + "input";
			input.setAttribute("type","number");
			input.setAttribute("min","0");
			input.setAttribute("value","1.5");
			input.setAttribute("step","0.5");
			span.innerHTML = "S";
			document.getElementById("content").appendChild(div);
			document.getElementById("Block"+idn).appendChild(spanId);
			document.getElementById("Block"+idn).appendChild(div1);
			document.getElementById("Block"+idn).appendChild(div2);
			document.getElementById("Block"+idn).appendChild(div3);
			document.getElementById("Block"+idn).appendChild(input);
			document.getElementById("Block"+idn).appendChild(span);
			
			blocksArr.push([tofBl, div3.id, div2.id, input.id]);
			observer.observe(div2, options);
			
		  break;
		  
		  case "pulse":
			var div = document.createElement('div'),
				spanId = document.createElement('span'),
				div1 = document.createElement('div'),
				div2 = document.createElement('div'),
				div3 = document.createElement('div'),
				input = document.createElement('input'),
				span = document.createElement('span');
			div.className = "ui-draggable new";
			div.id = "Block" + idn;
			spanId.className = "bl-span-id";
			spanId.innerHTML = div.id;					
			div1.className = "block-name";
			div1.setAttribute("data-action","canBeDel");
			div1.innerHTML = "PULSE";
			div2.className = "in in1";
			div2.id = "b" + idn + "in1";
			div2.setAttribute("data-action","endPoint");					
			div3.className = "out";
			div3.id = "b" + idn + "out";
			div3.setAttribute("data-action","startPoint");
			div3.innerHTML = 0;
			input.id = "b" + idn + "input";
			input.setAttribute("type","number");
			input.setAttribute("min","0");
			input.setAttribute("value","1.5");
			input.setAttribute("step","0.5");
			span.innerHTML = "S";
			document.getElementById("content").appendChild(div);
			document.getElementById("Block"+idn).appendChild(spanId);
			document.getElementById("Block"+idn).appendChild(div1);
			document.getElementById("Block"+idn).appendChild(div2);
			document.getElementById("Block"+idn).appendChild(div3);
			document.getElementById("Block"+idn).appendChild(input);
			document.getElementById("Block"+idn).appendChild(span);
			
			blocksArr.push([pulseBl, div3.id, div2.id, input.id]);
			observer.observe(div2, options);
			
		  break;
		  
		  case "rs":
			var div = document.createElement('div'),
				spanId = document.createElement('span'),
				div1 = document.createElement('div'),
				div2 = document.createElement('div'),
				div3 = document.createElement('div'),
				div4 = document.createElement('div');
				span1 = document.createElement('span');
				span2 = document.createElement('span');
			div.className = "ui-draggable new";
			div.id = "Block" + idn;
			spanId.className = "bl-span-id";
			spanId.innerHTML = div.id;					
			div1.className = "block-name";
			div1.setAttribute("data-action","canBeDel");
			div1.innerHTML = "RS";
			div2.className = "in in1";
			div2.id = "b" + idn + "in1";
			div2.setAttribute("data-action","endPoint");
			span1.className = "i-span1";
			span1.innerHTML = "S";
			div3.className = "in in2";
			div3.id = "b" + idn + "in2";
			div3.setAttribute("data-action","endPoint");
			span2.className = "i-span2";
			span2.innerHTML = "R";
			div4.className = "out";
			div4.id = "b" + idn + "out";
			div4.setAttribute("data-action","startPoint");
			div4.innerHTML = 0;
			document.getElementById("content").appendChild(div);
			document.getElementById("Block"+idn).appendChild(spanId);
			document.getElementById("Block"+idn).appendChild(div1);
			document.getElementById("Block"+idn).appendChild(div2);
			document.getElementById("Block"+idn).appendChild(div3);
			document.getElementById("Block"+idn).appendChild(div4);
			document.getElementById("Block"+idn).appendChild(span1);
			document.getElementById("Block"+idn).appendChild(span2);
			
			blocksArr.push([rsBl, div4.id, div2.id, div3.id]);
			observer.observe(div2, options);
			observer.observe(div3, options);
			
		  break;
		  
		  case "trig":
			var div = document.createElement('div'),
				spanId = document.createElement('span'),
				div1 = document.createElement('div'),
				div2 = document.createElement('div'),
				div3 = document.createElement('div');
			div.className = "ui-draggable new";
			div.id = "Block" + idn;
			spanId.className = "bl-span-id";
			spanId.innerHTML = div.id;					
			div1.className = "block-name";
			div1.setAttribute("data-action","canBeDel");
			div1.innerHTML = "TRIG";
			div2.className = "in in1";
			div2.id = "b" + idn + "in1";
			div2.setAttribute("data-action","endPoint");					
			div3.className = "out";
			div3.id = "b" + idn + "out";
			div3.setAttribute("data-action","startPoint");
			div3.innerHTML = 0;	
			document.getElementById("content").appendChild(div);
			document.getElementById("Block"+idn).appendChild(spanId);
			document.getElementById("Block"+idn).appendChild(div1);
			document.getElementById("Block"+idn).appendChild(div2);
			document.getElementById("Block"+idn).appendChild(div3);
			
			blocksArr.push([trigBl, div3.id, div2.id]);
			observer.observe(div2, options);
			
		  break;
		  
		}
	
	}
	
	///////////// MutationObserver section
	
	var callback = function(mutationRecordsList){
	
	var mutId = []
	console.log(mutationRecordsList);
	mutationRecordsList.forEach(function(mutationRecord, i) {
		console.log("Type of mutation: " + mutationRecord.type);
		console.log("Target.id: " + mutationRecordsList[i].target.parentNode.id);
		mutId.push(mutationRecordsList[i].target.id);
	});			
	
		for (var i = 0; i < mutId.length; i++) {
			for (var j = 0; j < blocksArr.length; j++) {
				if (blocksArr[j][2] == mutId[i]  ||
				    blocksArr[j][3] == mutId[i]) {
					console.log('mutation loop', blocksArr[j][2], blocksArr[j][3], mutId[i]);
					blocksArr[j][0](blocksArr[j][1],blocksArr[j][2],blocksArr[j][3]);
					chColor(blocksArr[j][1]);
					chIn(blocksArr[j][1]);
				} 		
			}
		}					
	};
	
	var observer = new MutationObserver(callback);
	
	var options = {
		childList: true,
		characterData: true
	}
	
	///////////// End of MutationObserver section
	
	///////////// Blocks logic section
	
	function outBl(out,id1) {
		var parentBl = document.getElementById(id1).parentElement;
		var bv1 = document.getElementById(id1).innerHTML;
		document.getElementById(out).innerHTML = +bv1;
		+bv1 == 1 ? 
		parentBl.style.background = "radial-gradient(#F7F7F7 0%,green 100%)" :
		parentBl.style.background = "radial-gradient(#F7F7F7 0%,red 100%)";
	}
	
	function andBl(out,id1,id2) {
		var bv1 = document.getElementById(id1).innerHTML;
		var bv2 = document.getElementById(id2).innerHTML;
		document.getElementById(out).innerHTML = +bv1 & +bv2;
	}
	
	function orBl(out,id1,id2) {
		var bv1 = document.getElementById(id1).innerHTML;
		var bv2 = document.getElementById(id2).innerHTML;
		document.getElementById(out).innerHTML = +bv1 | +bv2;
	}
	
	function xorBl(out,id1,id2) {
		var bv1 = document.getElementById(id1).innerHTML;
		var bv2 = document.getElementById(id2).innerHTML;
		document.getElementById(out).innerHTML = +bv1 ^ +bv2;
	}
	
	function notBl(out,id1) {
		var bv1 = document.getElementById(id1).innerHTML;
		document.getElementById(out).innerHTML = +(!+bv1);
	}
	
	function nandBl(out,id1,id2) {
		var bv1 = document.getElementById(id1).innerHTML;
		var bv2 = document.getElementById(id2).innerHTML;
		document.getElementById(out).innerHTML = +!(+bv1 & +bv2);
	}
	
	function norBl(out,id1,id2) {
		var bv1 = document.getElementById(id1).innerHTML;
		var bv2 = document.getElementById(id2).innerHTML;
		document.getElementById(out).innerHTML = +!(+bv1 | +bv2);
	}
	
	function delayBl(out,id1,inpId) {
		var bv1 = document.getElementById(id1).innerHTML;
		var delay = document.getElementById(inpId).value * 1000;
		function initDelay() {
			document.getElementById(out).innerHTML = +bv1;
			chColor(out);
			chIn(out);
		}
		setTimeout(initDelay, delay);
	}
	
	function tonBl(out,id1,inpId) {
		var bv1 = document.getElementById(id1).innerHTML;
		var delay = document.getElementById(inpId).value * 1000;
		var timer;
		//var D = new Date();							
		clearTimeout(ctObj[out]);
		
		if (bv1 == 0) {
			document.getElementById(out).innerHTML = 0;
			btObj[out] = 0;
			
		}
		if (bv1 == 1 && !btObj[out]){
			timer = setTimeout(initDelay, delay, out, 1);
			ctObj[out] = timer;
		}
						
		//console.log(ctObj,ctObj[out]);
	}
	
	function tofBl(out,id1,inpId) {
		var bv1 = document.getElementById(id1).innerHTML;
		var delay = document.getElementById(inpId).value * 1000;
		var timer;
		//var D = new Date();							
		clearTimeout(ctObj[out]);

		if (bv1 == 1) {
			document.getElementById(out).innerHTML = 1;
			btObj[out] = 0;
			
		}
		if (bv1 == 0 && !btObj[out]){
			timer = setTimeout(initDelay, delay, out, 0);
			ctObj[out] = timer;
		}
						
		//console.log(ctObj,ctObj[out]);
	}
	

	function pulseBl(out,id1,inpId) {
		var bv1 = document.getElementById(id1).innerHTML;
		var delay = document.getElementById(inpId).value * 1000;
		var timer;
				
		if (bv1 == 1 && !btObj[out]){
			document.getElementById(out).innerHTML = 1;
			btObj[out] = 1;
			timer = setTimeout(initDelay, delay, out, 0);
			ctObj[out] = timer;
			setTimeout(function(){btObj[out] = 0;}, delay);

		}
		
	}			
	
	function initDelay(outId,val) {			
		document.getElementById(outId).innerHTML = val;
		chColor(outId);
		chIn(outId);
		btObj[outId] = 1;
	}
				
	function rsBl(out,id1,id2) {
		var x1 = +document.getElementById(id1).innerHTML;
		var x2 = +document.getElementById(id2).innerHTML;
		var y = +document.getElementById(out).innerHTML;
		
		setTimeout(yout, 10);
		function yout() {
			y =  !(!(x1 || y) || x2);
			document.getElementById(out).innerHTML = +y;
			chColor(out);
			chIn(out);
		}

	}
	
	function trigBl(out,id1) {
		var bv1 = +document.getElementById(id1).innerHTML;
		if (bv1) {
			document.getElementById(out).innerHTML = 1;
			setTimeout(initDelay, 15, out, 0);
		}
		
	}
				
	///////////// End of Blocks logic section
	
	function chColor(outId) {
		var bc = document.getElementById(outId);
		var bv = document.getElementById(outId).innerHTML;		
		if (bv == 0) {
			bc.style.background = '#fd3939'; //red
			for (var i = 0; i < arrowsArr.length; i++) {
				if (outId == arrowsArr[i][0]) {
					arrowsArr[i][2].updateOptions(
					{ render: {strokeStyle:'#fd3939'}})
					arrowsArr[i][2].redraw();
				} 
			}
		}
		else {
			bc.style.background = '#2d962d'; //green
			for (var i = 0; i < arrowsArr.length; i++) {
				if (outId == arrowsArr[i][0]) {
					arrowsArr[i][2].updateOptions(
					{ render: {strokeStyle:'#2d962d'}})
					arrowsArr[i][2].redraw();
				} 
			}
		} 
	}	  
  
    function init(outId){
		var bv = document.getElementById(outId).innerHTML;
		if (bv == 0) {
		  bv = 1;
		}
		else {
			bv = 0;
		}
		
		document.getElementById(outId).innerHTML = bv;
		chColor(outId);
		chIn(outId);
	  			  
    }
  
    function chIn(outId) {
		var bv = document.getElementById(outId).innerHTML;
		var p, idx;
		for (var i = 0; i < arrowsArr.length; i++) {
			if(arrowsArr[i].indexOf(outId) == 0) {
				p = i;
				idx = arrowsArr[p][1];
				document.getElementById(idx).innerHTML = bv;
				chColor(idx);	
			}
		}
	  		  		
    }
  
  // Redrawing draggable elements with jQuery Ui
	function dragndrop() {
		$( "#content .ui-draggable" ).draggable({
			containment: "#content",
			scroll: false,
			cursor: 'move',
			drag: function( event, ui ) {
				for (var i = 0; i < arrowsArr.length; i++) {
				arrowsArr[i][2].redraw();
				}
			}
		});			
	}
  
  dragndrop();
