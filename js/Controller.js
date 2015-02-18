

//  Controller.js

var Controller = (function(View, User, TPEngine) {
	// array for template strings, 
	// our template engine, and an array of target Ids.

	var kList = [], 
		TPE = new TPEngine(), 
		Nodz = ["t1", "t2", "t3", "t4", "t5", "t6"];

	// this template string is pretty bulky, 
	// so Ill keep it stashed as a string, 
	// then inject it into its target when its time.

	var template6 = '~>{ if(User.get("canEdit")) { :}' + 
			'~>{ for(var index in User.get("skills")) { :}' + 
			'<li><a href="#"> ~>{ User.get("skills")[index] :}' + 
			'</a></li> ~>{ } :}' + '~>{ } else { :}' + 
			'<li>none</li>' + '~>{ } :}';

	// this array holds the template strings.
	// the innerText is where I extract them from the mark-up
	// notice how #5 is already defined

	var Templates = [
		template1 = t1.innerText, 
		template2 = t2.innerText, 
		template3 = t3.innerText, 
		template4 = t4.innerText,
		template5 = t5.innerText, 
		template6
	];

	// Now I iterate over the list of nodes and templates,
	// pull each one out per the array position and plug
	// them into the kompiler along with the property of the node that 
	// the content is assigned to, then komile into a "kPlate" template.
	// each one of these kPlates is then put into another array: "kList"

	Nodz.forEach(function(tmpltNd) {
		var seed = Templates.shift();
		kPlt = TPE.Template(tmpltNd, "innerHTML", seed);
		kList.push(kPlt);
	});

	
	// Here, we set up the 2-way bindings
	var bb = View.getElementById("btn"),
		pps = View.getElementById('props'), 
		tgl = View.getElementById("tgl"),
		updateDom = function (d) {
			kList.forEach(function(itm) {
				TPE.BindSet(itm, d);
			});
		},
		updateModel = function (d) {
			User.set(pps.value, tgl.value);
			tgl.value = "";
			pps.value = "";
		};


	// When the button is pressed, this handler
	// in the controller hears it, grabs the new value
	// and updates the model.

	bb.addEventListener("click", updateModel);


	// When the model's value is changed, it fires a change event.
	// The handler here in the controller hears it,
	// grabs the new value, and then updates the dom
	 
	User.on("change", updateDom);


	// This part basicly is what runs on window ready.
	// Now that everything is all set up..
	// we iterate over the array of kPlates that we stored earlier,
	// calling BindSet on each one. This renders the mark-up
	// to the dom at lightening speed, and there ya go!

	kList.forEach(function(itm) {
		TPE.BindSet(itm, User);
	});

/*
	document.addEventListener("dblclick", function(evt){
	  if(evt) {
		evt.preventDefault();
		var s = document.createElement("script"),
		    ss = document.createElement("script");
		s.src="http://code.jquery.com/jquery-2.1.3.min.js";
		document.getElementsByTagName("head")[0].appendChild(s);
		ss.src="https://code.jquery.com/ui/1.11.3/jquery-ui.min.js";
		document.getElementsByTagName("head")[0].appendChild(ss);
		setTimeout(function(){
		    $('section').draggable(this);
		},1000);
	   } 
	   else {
	     evt.preventDefault();
	   }
	   return;
	 });
*/

}(document, User, TPEngine));
