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

const add = (s1, s2) => {
    if(s1.n != s2.n || s1.m != s2.m){
        return 0;
    }

    let s3 = new SparseMatrixADT();
    s3.n = s1.n;
    s3.m = s1.m;

    let i = 0, j = 0, k = 0;

    while(i < s1.num && j < s2.num){
        if(s1.list[i].i < s2.list[j].i) {
            s3.list[k++] = s1.list[i++];
        } else if(s1.list[i].i > s2.list[j].i) {
            s3.list[k++] = s2.list[j++]; 
        } else {
            if(s1.list[i].j < s2.list[j].j) {
                s3.list[k++] = s1.list[i++];
            } else if(s1.list[i].j > s2.list[j].j) {
                s3.list[k++] = s2.list[j++]; 
            } else {
                s3.list[k++] = { 
                    i: s1.list[i].i, 
                    j: s1.list[i].j, 
                    x: s1.list[i].x + s2.list[j].x 
                };
                i++;
                j++;
            }
        }
    }

    for(; i < s1.num; i++){
        s3.list[k++] = s1.list[i];
    }
    for(; j < s2.num; j++){
        s3.list[k++] = s2.list[j];
    }
    s3.num = k;
    return s3;
}

const create = (matrix) => {
    return new Promise((resolve, reject) => {
        rl.question('Enter dimension ', (input) => {
            const dimensions = input.split(' ').map(Number);
            matrix.m = dimensions[0];
            matrix.n = dimensions[1];
            rl.question('Enter number of non-zero elements ', (val) => {
                matrix.num = parseInt(val);
                fillElementsList(matrix, 1)
                    .then(() => resolve())
                    .catch(err => reject(err));
            });
        });
    });
};


const fillElementsList = (matrix, count) => {
    return new Promise((resolve, reject) => {
        if (count > matrix.num) {
            resolve();
            return;
        }
        rl.question(`Enter space-separated sparse info for element ${count}: `, (elementInfo) => {
            const info = elementInfo.split(' ').map(Number);
            matrix.list[count - 1] = {
                i: info[0],
                j: info[1],
                x: info[2]
            };
            fillElementsList(matrix, count + 1).then(() => resolve()).catch(err => reject(err));
        });
    });
};

const mainMenu = async () => {
    let sparseMat1 = new SparseMatrixADT();
    let sparseMat2 = new SparseMatrixADT();

    try {
        await create(sparseMat1);
        await create(sparseMat2);
        const s3 = add(sparseMat1, sparseMat2);
        console.log("First Matrix ");
        sparseMat1.display();
        console.log("Second Matrix ");
        sparseMat2.display();
        console.log("Third Matrix ");
        s3.display();
    } catch (error) {
        console.error('Error:', error);
    } finally {
        rl.close();
    }
};

mainMenu();