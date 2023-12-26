const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class LTMatrixADT {
    constructor(n = 0) {
        this.Arr = [];
        this.n = n;
    }

    set(i, j, value) {
        if(i >= j){
            //Row Major
            // this.Arr[i * (i - 1) / 2 + j - 1] = value;

            //Column Major
            this.Arr[this.n * (j - 1) + (j - 2) * (j - 1) / 2 + i - j] = value;
        }
    }

    get(i, j){
        if(i >= j){
            //Row Major
            // return this.Arr[i * (i - 1) / 2 + j - 1]; 

            //Column Major
            return this.Arr[this.n * (j - 1) + (j - 2) * (j - 1) / 2 + i - j];
        }
        return 0;
    }

    display(){
        for(let i = 1; i <= this.n; i++){
            let temp = '';
            for(let j = 1; j <= this.n; j++){
                if(i >= j){
                    //Row Major
                    // temp += this.Arr[i * (i - 1) / 2 + j - 1] + ' ';

                    //Column Major
                    temp += this.Arr[this.n * (j - 1) + (j - 2) * (j - 1) / 2 + i - j] + ' ';
                } else {
                    temp += 0 + ' ';
                }
            }
            console.log(temp);
        }
    }
}

const mainMenu = () => {

    rl.question("Enter dimension ", (dimension) => {
        let matrix = new LTMatrixADT(parseInt(dimension));
        fillMatrix(matrix, 1, 1, () => {
            matrix.display();
            rl.close();
        });
    });
}

const fillMatrix = (matrix, i, j, callback) => {
    if(i > matrix.n){
        callback();
        return;
    }

    rl.question(`Enter value for [${i},${j}]: `, (value) => {
        matrix.set(i, j, parseInt(value));

        if(j < matrix.n){
            fillMatrix(matrix, i, j + 1, callback);
        } else {
            fillMatrix(matrix, i + 1, 1, callback);
        }
    });
}

mainMenu();

