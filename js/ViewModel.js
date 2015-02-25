var user = {
	name1: "Richard",
	name2: "Longwood",
	occupation: "Software Engineer",
	age: 40,
	title: 'User!',
	subTitle: "Edit Me!",
	canEdit: true,
	skills: ["ajax", "css", "javascript", "HTML5", ".Net", "SQL", "json"]
};

// create an observable model of a user...

SeeMe.base = user;
var User = Object.create(SeeMe);
