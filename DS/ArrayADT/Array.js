const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class Array {
    constructor() {
        this.data = [];
        this.size = 0;
        this.length = 0;
    }

    append(element) {
        this.data[this.length] = element;
        this.length++;
    }

    insert(index, element){
        if(index >= 0 && index <= this.length){
            this.data.splice(index,0,element);
            this.length++;
        }
    }

    delete(index){
        if(index >= 0 && index <= this.length){
            this.data.splice(index,1);
            this.length--;
        }
    }

    swap(x, y){
        let temp = this.data[x];
        this.data[x] = this.data[y];
        this.data[y] = temp;
    }

    linearSearch(key){
        for(let i = 0; i < this.length; i++){
            if(key == this.data[i]){
                this.swap(i, 0);
                return i;
            }
        } 
        return -1;
    }

    binarySearch(key){
        let l = 0;
        let h = this.length - 1;
        let mid;
        while(l <= h){ 
            mid = Math.floor((l+h)/2);
            if(this.data[mid] == key){
                return mid;
            } else if(this.data[mid] > key){
                h = mid - 1;
            } else {
                l = mid + 1;
            }
        }
        return -1;
    }

    display() {
        for (let i = 0; i < this.length; i++) {
            console.log(this.data[i]);
        }
    }
}

const myArray = new Array();

const askForArrayElements = (index, total) => {
    if (index < total) {
        rl.question(`Enter number ${index + 1}: `, (val) => {
            myArray.append(val);
            askForArrayElements(index + 1, total);
        });
    } else {
        console.log("Search",myArray.binarySearch('3'));
        myArray.display();

        rl.close();
    }
};

const testArray = () => {
    rl.question('Enter number of array elements: ', (num) => {
        askForArrayElements(0, parseInt(num));
    });
};

testArray();
