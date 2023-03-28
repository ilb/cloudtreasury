export default class File {
	constructor(buffer, contentType, name) {
		this.buffer = buffer;
		this.contentType = contentType;
		this.name = name;
	}
	getName() {
		return this.name;
	}

	getContentType() {
		return this.contentType;
	}

	getLength() {
		return this.buffer.length;
	}

	getBinary() {
		return this.buffer;
	}
}
