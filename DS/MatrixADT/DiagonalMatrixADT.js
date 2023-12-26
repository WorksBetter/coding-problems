// const readline = require('readline');

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });


class DiagonalMatrixADT {
    constructor(n=0) {
        this.Arr = [];
        this.n = n;
    }
    set(i, j, value){
        if(i == j){
            this.Arr[i - 1] = value;
            this.n++; 
        }
    }
    
    get(i, j) {
        if(i == j) {
            return this.Arr[i - 1];
        }
        return 0;
    }
    
    display() {
        let i, j;
        for(i = 0; i < this.n; i++){
            let temp = '';
            for(j = 0; j < this.n; j++){
                if(i == j){
                    temp += this.Arr[i] + ' ';
                } else {
                    temp += 0 + ' ';
                }
            }
            console.log(temp);
        }
    }
}


const mainMenu = () => {
    let matrix = new DiagonalMatrixADT();
    matrix.set(1, 1, 5);
    matrix.set(2, 2, 8);
    matrix.set(3, 3, 9);
    matrix.set(4, 4, 12);

    console.log(matrix.get(2, 2));
    
    matrix.display();
}

mainMenu();