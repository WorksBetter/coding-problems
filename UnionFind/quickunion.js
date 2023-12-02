const readline = require('readline');

class QuickFindUF {
    constructor(N) {
        this.id = Array.from({ length: N }, (_, index) => index);
    }

    root(i){
        while (i !== this.id[i]) 
            i = this.id[i];
        return i;
    }

    connected(p, q) {
        return this.root(p) === this.root(q);
    }

    union(p, q) {
        const proot = this.root(p);
        const qroot = this.root(q);
        this.id[proot] = qroot;
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
