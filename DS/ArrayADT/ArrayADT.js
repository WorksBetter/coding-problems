const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class ArrayADT {
    constructor(arr=[], size=0, length=0) {
        this.data = []
        for(let i = 0; i < length; i++){
            this.data[i] = arr[i];
        }
        this.size = size;
        this.length = length;
    }

    append(element) {
        this.data[this.length] = element;
        this.length++;
        if(this.length == this.size) {
            this.size *= 2;
        }
    }

    insert(index, element){
        if(index >= 0 && index <= this.length){
            this.data.splice(index,0,element);
            this.length++;
            if(this.length == this.size) {
                this.size *= 2;
            }
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
        if(this.length == this.size) {
            this.size *= 2;
        }
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

    merge(arr1, arr2) {
        let i, j, k;
        i = j = k = 0;

        while(i < arr1.length && j < arr2.length) {
            if(arr1.data[i] < arr2.data[j]) {
                this.data[k++] = arr1.data[i++];
            } else {
                this.data[k++] = arr2.data[j++];
            }
        } 
        for(; i < arr1.length; i++){
            this.data[k++] = arr1.data[i];
        }
        for(; j < arr2.length; j++){
            this.data[k++] = arr2.data[j];
        }
        this.length = k;
        this.size = k * 2;
    }

    union(arr1, arr2) {
        let i, j, k;
        i = j = k = 0;

        while(i < arr1.length && j < arr2.length) {
            if(arr1.data[i] < arr2.data[j]) {
                this.data[k++] = arr1.data[i++];
            } else if(arr2.data[j] < arr1.data[i]) {
                this.data[k++] = arr2.data[j++];
            } else {
                this.data[k++] = arr2.data[j++];
                i++;
            }
        } 
        for(; i < arr1.length; i++){
            this.data[k++] = arr1.data[i];
        }
        for(; j < arr2.length; j++){
            this.data[k++] = arr2.data[j];
        }
        this.length = k;
        this.size = k * 2;
    }

    intersection(arr1, arr2) {
        let i, j, k;
        i = j = k = 0;

        while(i < arr1.length && j < arr2.length) {
            if(arr1.data[i] < arr2.data[j]) {
                i++;
            } else if(arr2.data[j] < arr1.data[i]) {
                j++;
            } else if(arr2.data[j] == arr1.data[i]){
                this.data[k++] = arr2.data[j++];
                i++;
            }
        } 
        this.length = k;
        this.size = k * 2;
    }

    difference(arr1, arr2) {
        let i, j, k;
        i = j = k = 0;

        while(i < arr1.length && j < arr2.length) {
            if(arr1.data[i] < arr2.data[j]) {
                this.data[k++] = arr1.data[i++];
            } else if(arr2.data[j] < arr1.data[i]) {
                j++;
            } else if(arr2.data[j] == arr1.data[i]){
                j++;
                i++;
            }
        } 
        for(; i < arr1.length; i++){
            this.data[k++] = arr1.data[i];
        }

        this.length = k;
        this.size = k * 2;
    }

    findMissingElementInPositiveInt() {
        let low = this.min();
        let high = this.max();
        let hashTable = new Array(high + 1).fill(0);
        
        for(let i = 0; i < this.length; i++){
            hashTable[this.data[i]]++;
        }
        for(let i = low; i <= this.max(); i++){
            if(hashTable[i] == 0){
                console.log("Missing element ", i);
            }
        }
    }

    findMissingElementInSortedArr() {
        let low = this.min();        
        let diff = low - 0;

        for(let i = 0; i < this.length; i++){
            if(this.data[i] - i != diff) {
                while(diff < this.data[i] - i){
                    console.log("Missing element ", i + diff);
                    diff++; 
                }
            }
        }
    }

    display() {
        for (let i = 0; i < this.length; i++) {
            console.log(this.data[i]);
        }
    }
}

const myArray = new ArrayADT();

const testArray = () => {

    const arr1 = new ArrayADT([6, 4, 15, 10, 25], 10, 5);

    arr1.findMissingElementInPositiveInt();
    // const arr2 = new ArrayADT([3, 6 , 7, 15, 20], 10, 5);

    // const arr3 = new ArrayADT();
    // arr3.difference(arr1, arr2);
    // arr3.display();

};


const mainMenu = () => {
    console.log("\nChoose an operation:");
    console.log("1. Append Element");
    console.log("2. Insert Element");
    console.log("3. Delete Element");
    console.log("4. Get Element");
    console.log("5. Set Element");
    console.log("6. Display Max");
    console.log("7. Display Min");
    console.log("8. Sum of Elements");
    console.log("9. Reverse Array");
    console.log("10. Merge with another Array");
    console.log("11. Display Array");
    console.log("12. Exit");
    rl.question("Enter your choice: ", (choice) => {
        switch(choice) {
            case '1':
                appendElement();
                break;
            case '2':
                insertElement();
                break;
            case '3':
                deleteElement();
                break;
            case '4':
                getElement();
                break;
            case '5':
                setElement();
                break;
            case '6':
                displayMax();
                break;
            case '7':
                displayMin();
                break;
            case '8':
                sumElements();
                break;
            case '9':
                reverseArray();
                break;
            case '10':
                mergeArrays();
                break;
            case '11':
                displayArray();
                break;
            case '12':
                rl.close();
                break;
            default:
                console.log("Invalid choice. Please try again.");
                mainMenu();
        }
    });
}

const appendElement = () => {
    rl.question("Enter element to append: ", (element) => {
        myArray.append(parseInt(element));
        console.log("Element appended.");
        mainMenu();
    });
}

const insertElement = () => {
    rl.question("Enter index to insert at: ", (index) => {
        rl.question("Enter element to insert: ", (element) => {
            myArray.insert(parseInt(index), parseInt(element));
            console.log("Element inserted.");
            mainMenu();
        });
    });
}

const deleteElement = () => {
    rl.question("Enter index to delete: ", (index) => {
        myArray.delete(parseInt(index));
        console.log("Element deleted.");
        mainMenu();
    });
}

const getElement = () => {
    rl.question("Enter index of element to get: ", (index) => {
        const element = myArray.get(parseInt(index));
        console.log("Element at index " + index + ": " + element);
        mainMenu();
    });
}

const setElement = () => {
    rl.question("Enter index of element to set: ", (index) => {
        rl.question("Enter new value: ", (value) => {
            myArray.set(parseInt(index), parseInt(value));
            console.log("Element set.");
            mainMenu();
        });
    });
}

const displayMax = () => {
    console.log("Max element: " + myArray.max());
    mainMenu();
}

const displayMin = () => {
    console.log("Min element: " + myArray.min());
    mainMenu();
}

const sumElements = () => {
    console.log("Sum of elements: " + myArray.sum());
    mainMenu();
}

const reverseArray = () => {
    myArray.reverse();
    console.log("Array reversed.");
    myArray.display();
    mainMenu();
}

const mergeArrays = () => {
    createArray("Enter size of the first array to merge: ", (arr1) => {
        createArray("Enter size of the second array to merge: ", (arr2) => {
            arr1.display();
            arr2.display();
            myArray.merge(arr1, arr2);
            console.log("Arrays merged.");
            myArray.display();
            mainMenu();
        });
    });
}

const createArray = (promptMessage, callback) => {
    rl.question(promptMessage, (size) => {
        const arr = new ArrayADT();
        fillArray(arr, 0, parseInt(size), () => {
            callback(arr);
        });
    });
}

const fillArray = (arr, index, total, callback) => {
    if (index < total) {
        rl.question(`Enter element ${index + 1} of ${total}: `, (element) => {
            arr.append(parseInt(element));
            fillArray(arr, index + 1, total, callback);
        });
    } else {
        callback();
    }
}

const displayArray = () => {
    myArray.display();
    mainMenu();
}

// Start the program
// mainMenu();
testArray();


