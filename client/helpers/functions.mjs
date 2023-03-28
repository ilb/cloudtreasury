if (!String.prototype.capitalizeWords) {
	Object.defineProperty(String.prototype, 'capitalizeWords', {
		value: function() {
			const words = this.toLowerCase().split(" ");

			for (let i = 0; i < words.length; i++) {
				words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
			}

			return words.join(" ");
		},
		enumerable: false
	});
}
