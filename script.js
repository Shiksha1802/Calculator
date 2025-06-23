const display = document.querySelector('input[name="display"]');
const buttons = document.querySelectorAll('input[type="button"]');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.value;
    const current = display.value;

    switch (value) {
      case 'AC':
        // Clear everything
        display.value = '';
        break;

      case 'CE':
        // Clear last entered character
        display.value = current.slice(0, -1);
        break;

      case 'DEL':
        // Same as CE? Usually DEL removes last character too.
        display.value = current.slice(0, -1);
        break;

      case '=':
        try {
          // Evaluate expression safely
          // Replace '×' or '÷' if you use those symbols
          display.value = eval(current);
        } catch {
          display.value = 'Error';
        }
        break;

      case 'x²':
        try {
          display.value = Math.pow(Number(current), 2);
        } catch {
          display.value = 'Error';
        }
        break;

      case '√':
      case '&radic;':
        try {
          display.value = Math.sqrt(Number(current));
        } catch {
          display.value = 'Error';
        }
        break;

      case '1/x':
        try {
          if (Number(current) === 0) {
            display.value = 'Error';
          } else {
            display.value = 1 / Number(current);
          }
        } catch {
          display.value = 'Error';
        }
        break;

      case '+/-':
        try {
          if (current.startsWith('-')) {
            display.value = current.slice(1);
          } else {
            display.value = '-' + current;
          }
        } catch {
          display.value = 'Error';
        }
        break;

      case '%':
        try {
          // Convert current to percentage (divide by 100)
          display.value = Number(current) / 100;
        } catch {
          display.value = 'Error';
        }
        break;

      case '.':
        // Prevent multiple dots in the current number segment
        // Split by operators and check last number segment
        let tokens = current.split(/[\+\-\*\/]/);
        let lastNumber = tokens[tokens.length - 1];
        if (!lastNumber.includes('.')) {
          display.value += '.';
        }
        break;

      default:
        // For numbers and operators, basic validation can be added:
        // Prevent two operators in a row (except minus for negative numbers)
        if (['+', '-', '*', '/'].includes(value)) {
          if (current === '' && value !== '-') {
            // Prevent starting with operator except minus
            break;
          }
          // Prevent two operators in a row
          if (['+', '-', '*', '/'].includes(current.slice(-1))) {
            // Replace the last operator with new operator
            display.value = current.slice(0, -1) + value;
            break;
          }
        }
        display.value += value;
        break;
    }
  });
});
