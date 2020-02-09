/*
JOSEPH P. PASAOA
Server Input Process Helper | Bingebook (a full-stack binge-facilitating app)
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

    case "varchar22":
        if (!input || !input.trim()) {
          throw new Error(`400__error: empty ${inputName} input. please re-enter it and try again`);
        }
        if (input.trim().length > 22) {
          throw new Error(`400__error: ${inputName} is too long. please shorten`);
        }
        return input.trim();

    case "softUrl":
        if (!input || !input.trim()) {
          return "";
        }
        const trimmed = input.trim();
        const protocolCheck = trimmed.slice(0, 7) !== "http://" && trimmed.slice(0, 8) !== "https://";
        const lengthCheck = trimmed.length < 12; // protocol (7) + name(1) + .file format extension (4)
        const acceptableFileTypes = {
          ".jpg": true,
          ".png": true,
          ".gif": true,
          ".svg": true
        };
        const fileType = trimmed.slice(-4);
        const typeCheck = acceptableFileTypes[fileType] !== true;
        if (protocolCheck || lengthCheck || typeCheck) {
          throw new Error(`400__error: invalid ${inputName}. please enter a valid url`);
        }
        return input.trim();

    default:
        throw new Error("500__error: you're not supposed to be here. input not processed");
  }
}


module.exports = processInput;
