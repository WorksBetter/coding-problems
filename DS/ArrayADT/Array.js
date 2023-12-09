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

    get(index){
        if(index >= this.length || index < 0) return 
        return this.data[index];
    }

    set(index, value){
        if(index >= this.length || index < 0) return 
        return this.data[index] = value;
    }

    max(){
        let max = this.data[0];
        for(let i = 1; i < this.length; i++){
            if(this.data[i] > max) {
                max = this.data[i];
            }
        }
        return max;
    }

    min(){
        let min = this.data[0];
        for(let i = 1; i < this.length; i++){
            if(this.data[i] < min) {
                min = this.data[i];
            }
        }
        return min;
    }

    sum(){
        let total = 0;
        for(let i = 0; i < this.length; i++){
            total += this.data[i];
        }
        return total;
    }

    // JavaScript does not support method overloading in the same way as languages like Java or C#. So there cannot be 
    // two methods with the same name, having different number of arguments.

    sumUpTo(n){
        if(n < 0) return 0;
        else {
            return this.sum(n - 1) + this.data[n];
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

    reverse(){
        for (let i = 0; i < this.length/2; i++) {
            this.swap(i, this.length - i - 1);
        }
    }

    insertAtSorted(value){
        let i = this.length - 1;
        while(this.data[i] > value){
            this.data[i + 1] = this.data[i];
            i--;
        }
        this.data[i + 1] = value;
        this.length++;
    }

    isSorted(){
        for (let i = 0; i < this.length - 1; i++) {
            if(this.data[i] > this.data[i + 1]) return false;
        }
        return true;
    }

    negativeOnLeft(){
        let i = 0;
        let j = this.length - 1;

        while (i < j) {     
            while (this.data[i] < 0) {
                i++;
            }
            while(this.data[j] >= 0){
                j--;
            }
            if(i < j){
                this.swap(i, j);
            }
        }
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
            myArray.append(parseInt(val));
            askForArrayElements(index + 1, total);
        });
    } else {
        console.log("Max",myArray.max());
        console.log("Min",myArray.min());
        console.log("Sum", myArray.sum());
        console.log("Sum till n", myArray.sumUpTo(3));
        // myArray.reverse();
        myArray.insertAtSorted(5);
        console.log("Is Sorted", myArray.isSorted());
        myArray.negativeOnLeft();
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
