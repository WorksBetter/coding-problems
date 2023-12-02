const readline = require('readline');

class QuickFindUF {
    constructor(N) {
        this.id = Array.from({ length: N }, (_, index) => index);
    }

    connected(p, q) {
        return this.id[p] === this.id[q];
    }

    union(p, q) {
        const pid = this.id[p];
        const qid = this.id[q];
        for (let i = 0; i < this.id.length; i++) {
            if (this.id[i] === pid) {
                this.id[i] = qid;
            }
        }
    }
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter the number of elements: ', N => {
    const qf = new QuickFindUF(parseInt(N));

    const executeCommand = () => {
        rl.question('Enter command (union or connected), followed by two numbers, or "exit": ', answer => {
            const [command, p, q] = answer.split(' ');

            if (command === 'exit') {
                rl.close();
                return;
            }

            const index1 = parseInt(p);
            const index2 = parseInt(q);

            if (command === 'union') {
                qf.union(index1, index2);
                console.log(`Performed union on elements ${index1} and ${index2}.`);
            } else if (command === 'connected') {
                const result = qf.connected(index1, index2) ? 'Yes' : 'No';
                console.log(`Are elements ${index1} and ${index2} connected? ${result}`);
            } else {
                console.log('Invalid command.');
            }

            executeCommand(); // Prompt for next command
        });
    };

    executeCommand(); // Start the prompt loop
});
