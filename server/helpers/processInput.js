/*
JOSEPH P. PASAOA
Server Input Processer Helper | Bingebook (a full-stack binge-facilitating app)
*/


const processInput = (input, location, inputName) => {
  switch (location) {

    case "idNum":
        const numCheck1 = isNaN(parseInt(input));
        const numCheck2 = input.length !== parseInt(input).toString().length;
        if (numCheck1 || numCheck2) {
          throw new Error(`400__error: invalid ${inputName} input. please re-enter and try again`);
        }
        return parseInt(input);

    case "imdbId":
        if (!input || !input.trim()) {
          throw new Error(`400__error: empty ${inputName}. please check input and try again`);
        }
        if (input.slice(0, 2) !== "tt" || input.length > 11) {
          throw new Error(`400__error: invalid imdb ID format. please verify imdb ID is correct`);
        }
        return input.trim();

    case "hardVarchar22":
        if (!input || !input.trim()) {
          throw new Error(`400__error: empty ${inputName} input. please re-enter and try again`);
        }
        if (input.trim().length > 22) {
          throw new Error(`400__error: ${inputName} is too long. please shorten`);
        }
        return input.trim();

    case "softVarchar22":
        if (!input || !input.trim()) {
          return "";
        }
        if (input.trim().length > 22) {
          throw new Error(`400__error: ${inputName} is too long. please shorten`);
        }
        return input.trim();

    case "watchStatus":
        if (!input || !input.trim()) {
          throw new Error(`400__error: missing ${inputName}. please check and try again`);
        }
        const accepted = {
          "onRadar": true,
          "now": true,
          "finished": true
        };
        if (accepted[input.trim()] !== true) {
          throw new Error(`400__error: unknown ${inputName}. please check and try again`);
        }
        return input.trim();

    case "show title":
        if (!input || !input.trim()) {
          throw new Error(`400__error: empty ${inputName} input. please re-enter and try again`);
        }
        if (input.trim().length > 90) {
          throw new Error(`400__error: ${inputName} is too long. please shorten and try again`);
        }
        return input.trim();

    case "softPicUrl":
        if (!input || !input.trim()) {
          return "";
        }
        const trimmed = input.trim();
        const protocolCheck = trimmed.slice(0, 7) !== "http://" && trimmed.slice(0, 8) !== "https://";
        const lengthCheck = trimmed.length < 12; // protocol (7) + name(1) + .file format extension (4)
        const acceptable = {
          ".jpg": true,
          ".png": true,
          ".gif": true,
          ".svg": true
        };
        const fileType = trimmed.slice(-4);
        const typeCheck = acceptable[fileType] !== true;
        if (protocolCheck || lengthCheck || typeCheck) {
          throw new Error(`400__error: invalid ${inputName}. Please enter a valid url`);
        }
        return input.trim();

    case "hardText":
        if (!input || !input.trim()) {
          throw new Error(`400__error: empty ${inputName}. Please enter a valid input`);
        }
        return input.trim();

    case "multiLineText":
        if (!input) {
          throw new Error(`400__error: empty ${inputName}. Please enter a valid input`);
        }
        return input;

    case "bool":
        if (input !== "true" && input !== "false") {
          throw new Error(`404__error: invalid ${inputName} data. Please check your input`);
        }
        return input;

    default:
        throw new Error("500__error: you're not supposed to be here. input not processed");
  }
}


module.exports = processInput;
