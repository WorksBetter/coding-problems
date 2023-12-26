const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});


class SparseMatrixADT {
    constructor() {
        this.n = 0;
        this.m = 0;
        this.num = 0;
        this.list = [];
    }

    display() {
        let k = 0;
        for(let i = 0; i < this.m; i++){
            let temp = '';
            for(let j = 0; j < this.n; j++){
                if(k < this.num && i == this.list[k].i && j == this.list[k].j){
                    temp += this.list[k++].x + ' ';
                } else {
                    temp += '0 '
                }
            }
            console.log(temp);
        }
    }
}

const create = (matrix) => {
    rl.question('Enter dimension ', (input) => {
        const dimensions = input.split(' ').map(Number);
        matrix.m = dimensions[0];
        matrix.n = dimensions[1];
        rl.question('Enter number of non-zero elements ', (val) => {
            matrix.num = parseInt(val);
            fillElementsList(matrix, 1, () => {
                matrix.display();
                rl.close();
            });
        })
    });
}

const fillElementsList = (matrix, count, callback) => {
    if(count > matrix.num){
        callback();
        return;
    }

    rl.question(`Enter space-separated sparse info for element ${count}: `, (elementInfo) => {
        const info = elementInfo.split(' ').map(Number);
        matrix.list[count - 1] = {
            i: info[0],
            j: info[1],
            x: info[2]
        }
        fillElementsList(matrix, count + 1, callback);
    });
}

const mainMenu = () => {
    let sparseMat = new SparseMatrixADT();
    create(sparseMat);

}

mainMenu();