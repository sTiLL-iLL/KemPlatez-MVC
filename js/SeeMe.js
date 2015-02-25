
var SeeMe=(function() {
	var watchd={},mod1={};
	function Model (mod1) {
		this.base = mod1||{};
		this.get = function(k) {
			if (k) {
				var u = this.base;
				return u[k];
			}
			else {
				var uu = this.base;
				return uu;
			}
		};
		var ii = -1;
		this.iterate = function(prop){
			return this.get(prop).join("<li>");
		};
	};
	watchd = Model;
	watchd.prototype = Signals;
	watchd.prototype.wen = function(signalName, cbk) {
		this.receive(signalName, function(d) {
			return cbk.call(this.base,d);
		});
		return this;
	};
	watchd.prototype.emit = function(signalName, payload) {
		this.signal(signalName, payload);
		return this;
	};
	watchd.prototype.off = function(v) {
		this.drop(v);
		return this;
	};
	watchd.prototype.set = function(k, v) {
		if (v && v !== this.base[k]) {
			if (v===Array) {
				this.base[k].push(v);	
			} else {
				this.base[k]=v;
			}
			this.signal("change", this.base);
		}
		return this;
	};
        watchd = new watchd(mod1);
	return watchd;
}(Signals));
