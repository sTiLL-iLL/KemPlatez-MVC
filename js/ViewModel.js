

var User = (function(Signals) {
	var Usr = {},
	user1 = {
		name1: "Richard",
		name2: "Longwood",
		occupation: "Software Engineer",
		age: "40",
		title: 'User!',
		subTitle: "Edit Me!",
		canEdit: true,
		skills: []
	};
	function UserModel (usr) {
		this.user = usr;
		this.get = function(k) {
			if (k) {
				var u = this.user;
				return u[k];
			} 
			else {
				var u = this.user;
				return u;
			}
		};
	};
	Usr = UserModel;
	Usr.prototype = Signals;
	Usr.prototype.on = function(v, cbk) {
		this.receive(v, function(d) {
			cbk.call(this.user, d);
		});
	};
	Usr.prototype.emit = function(v) {
		this.signal("change", v);
	};
	Usr.prototype.off = function(v) {
		this.dropReceivers(v);
	};
	Usr.prototype.set = function(k, v) {
		if (v && v !== this.user[k]) {
			if (k == "skills") {
				this.user[k].push(v);
			} else {
				this.user[k] = v;
			}
			this.signal("change", this.user);
		}
	};
	Usr = new Usr(user1);
	return Usr;
}(Signals));
	