module.exports = function check(str, bracketsConfig) {
  if (str.length % 2) {
    return false;
  }

  const sameBrackets = bracketsConfig.filter(item => item[0] === item[1]).map(item => item[0]);

  const splitted = str.split('');
  const opened = [];

  let result = true;
  for (let i = 0; i < splitted.length; i++) {
    const element = splitted[i];

    if (!opened.length) {
      opened.push(element);
      continue;
    }

    if (sameBrackets.includes(element)) {
      if (opened[opened.length - 1] === element) {
        opened.pop();
        continue;
      }

      opened.push(element);
      continue;
    } else {
      if (checkIfOpening(bracketsConfig, element)) {
        opened.push(element);
        continue;
      }

      const lastOpened = opened.pop();
      if (getClosing(bracketsConfig, lastOpened) !== element) {
        result = false;
        break;
      }
    }
  }

  return result && !opened.length ? true : false;
};

function checkIfOpening(brackets, char) {
  return !!brackets.filter(item => item[0] === char).length;
}

function getClosing(brackets, char) {
  const filtered = brackets.filter(item => item[0] === char)[0];
  return filtered ? filtered[1] : null;
}

// const config6 = [['1', '2'], ['3', '4'], ['5', '6'], ['7', '7'], ['8', '8']];

// console.log(check('111115611111111222288888822225577877778775555666677777777776622222', config6));
