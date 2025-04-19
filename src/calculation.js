function prec(ch) {
  if (ch === "+" || ch === "-") return 1;
  else if (ch === "/" || ch === "*") return 2;
  else if (ch === "^") return 3;
  else return 0;
}

function isDigit(ch) {
  if (ch >= "0" && ch <= "9") return true;
  else return false;
}

const isEmpty = (arr) => {
  if (arr.length == 0) return true;
  else return false;
};

function infixToPostfix(exp) {
  try {
    const postfix = [];
    const stack = [];
    let num = "";
    for (const ch of exp) {
      if (ch == " ") continue; // ignore spaces in between

      //* case for operand
      if (isDigit(ch) || ch == ".") num += ch;
      else {
        if (num != "") {
          postfix.push(num);
          console.log(postfix);
          num = "";
        }

        // ?case for '('
        if (ch == "(") {
          stack.push("(");
        }

        //?case for ')'
        else if (ch == ")") {
          while (stack.at(-1) != "(") {
            postfix.push(stack.pop());
          }
        }

        // *case for operator
        else {
          //? incoming operator has higher precedance
          if (
            isEmpty(stack) ||
            stack.at(-1) == "(" ||
            prec(ch) > prec(stack.at(-1))
          ) {
            stack.push(ch);
          }

          // ? incoming operator has low precedance
          else if (prec(ch) <= prec(stack.at(-1))) {
            while (isEmpty(stack) && prec(ch) <= prec(stack.at(-1))) {
              postfix.push(stack.pop());
            }
            stack.push(ch);
          }
        }
      }
    }

    if (num != "") {
      postfix.push(num);
    }

    while (!isEmpty(stack)) postfix.push(stack.pop());

    return postfix;
  } catch (error) {
    console.log("Error: ", error.message);
  }
}

const operators = {
  "*": (a, b) => a * b,
  "/": (a, b) => a / b,
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "^": (a, b) => a ** b,
};

function evaluatePostfix(exp) {
  try {
    const stack = [];
    let result = 0;
    for (const ch of exp) {
      if (isDigit(ch[0])) {
        stack.push(ch);
      } else {
        let op1 = stack.pop();
        let op2 = stack.pop();
        const opFunc = operators[ch];
        if (opFunc) {
          let result = opFunc(op2, op1);
          stack.push(result);
        } else {
          throw new Error("Unsupported operator: " + ch);
        }
      }
    }

    return stack.at(-1);
  } catch (error) {
    console.log("Error: ", error.message);
    return "error";
  }
}

function calculateExpression(exp) {
  try {
    const postfixExp = infixToPostfix(exp);
    return evaluatePostfix(postfixExp);
  } catch (error) {
    console.log("Error: ", error.message);
    return "error";
  }
}

export default calculateExpression;
