document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('display');
    const buttons = Array.from(document.getElementsByClassName('button'));
    let currentInput = '';
    let previousInput = '';
    let operation = null;

    buttons.map(button => {
        button.addEventListener('click', (e) => {
            const value = e.target.getAttribute('data-value');

            if (value === 'C') {
                currentInput = '';
                previousInput = '';
                operation = null;
                display.innerText = '0';
            } else if (value === '=') {
                if (currentInput && previousInput && operation) {
                    currentInput = evaluate(previousInput, currentInput, operation);
                    operation = null;
                    previousInput = '';
                    display.innerText = currentInput;
                }
            } else if (['+', '-', '*', '/'].includes(value)) {
                if (currentInput && !previousInput) {
                    operation = value;
                    previousInput = currentInput;
                    currentInput = '';
                }
            } else {
                currentInput += value;
                display.innerText = currentInput;
            }
        });
    });

    function evaluate(a, b, operation) {
        const num1 = parseFloat(a);
        const num2 = parseFloat(b);

        switch (operation) {
            case '+':
                return (num1 + num2).toString();
            case '-':
                return (num1 - num2).toString();
            case '*':
                return (num1 * num2).toString();
            case '/':
                return (num1 / num2).toString();
            default:
                return '';
        }
    }
});
