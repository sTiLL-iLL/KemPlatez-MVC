

//  Controller.js

var Controller = (function(User, TPEN) {
	
	// array for template strings, 
	// our template engine, and an array of target Ids.

	var kList = [], 
		TPE = new TPEN(), 
		Nodz = ["t1", "t2", "t3", "t4", "t5", "t6"];

	// this template string is pretty bulky, 
	// so Ill keep it stashed as a string, 
	// then inject it into its target when its time.

	var template6 = '~>{ if(User.get("canEdit")) { :}'+ 
			'~>{ for(var idx in User.get("skills")) { :}'+ 
			'<li><a href="#"> ~>{ User.get("skills")[idx] :}'+ 
			'</a></li> ~>{ } :}'+'~>{ } else { :}'+ 
			'<li>none</li>'+'~>{ } :}';

			
	// this array holds the template strings.
	// the innerText is where I extract them from the mark-up
	// notice how #5 is already defined

	
	var Templates = [t1.innerText,t2.innerText,t3.innerText,t4.innerText,t5.innerText,t6.innerText];


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

	
	// Set up the bindings
	var bb = document.getElementById("btn"),
		pps = document.getElementById('props'), 
		tgl = document.getElementById("tgl"),
		updateDom = function (d) {
			kList.forEach(function(itm) {
				TPE.BindSet(itm, d);
			});
		},
		updateModel = function (d) {
			User.set(pps.value, tgl.value);
			tgl.value = "";
			pps.value = "";
		return;
	};


	// When the button is pressed, this handler
	// in the controller hears it, grabs the new value
	// and updates the model.

	bb.addEventListener("click", updateModel);


	// When the model's value is changed, it fires a change event.
	// The handler here in the controller hears it,
	// grabs the new value, and then updates the dom
	 
	User.wen("change", updateDom);


	// This part basicly is what runs on window ready.
	// Now that everything is all set up..
	// we iterate over the array of kPlates that we stored earlier,
	// calling BindSet on each one. This renders the mark-up
	// to the dom at lightening speed, and there ya go!

	kList.forEach(function(itm) {
		TPE.BindSet(itm, User);
	});

}(User, TPEngine));

