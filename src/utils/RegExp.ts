const RegExpEmail = /^[a-zA-Z_-\d]+@[a-zA-Z_-\d]+(\.[a-zA-Z_-\d]+)+$/g;
const RegExpPassword = /^(?![a-zA-Z\d]+$)(?![a-z\W\d_]+$)[a-zA-Z\d_\W]{8,32}$/g;

export { RegExpEmail, RegExpPassword };
