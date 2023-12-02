class UnionFind {
    constructor(N) {
        this.id = Array.from({ length: N }, (_, index) => index);
        this.size = new Array(N).fill(1);
        this.max = Array.from({ length: N }, (_, index) => index); // Initialize max array with the element itself
    }

    root(i) {
        while (i !== this.id[i]) {
            this.id[i] = this.id[this.id[i]]; // Path compression
            i = this.id[i];
        }
        return i;
    }

    connected(p, q) {
        return this.root(p) === this.root(q);
    }

    union(p, q) {
        const rootP = this.root(p);
        const rootQ = this.root(q);
        if (rootP === rootQ) return;

        if (this.size[rootP] < this.size[rootQ]) {
            this.id[rootP] = rootQ;
            this.size[rootQ] += this.size[rootP];
            this.max[rootQ] = Math.max(this.max[rootQ], this.max[rootP]); // Update the max for the root
        } else {
            this.id[rootQ] = rootP;
            this.size[rootP] += this.size[rootQ];
            this.max[rootP] = Math.max(this.max[rootP], this.max[rootQ]); // Update the max for the root
        }
    }

    find(i) {
        return this.max[this.root(i)]; // Return the max element in the component
    }
}

// Usage
const uf = new UnionFind(10);
uf.union(1, 2);
uf.union(2, 6);
uf.union(6, 9);
console.log(uf.find(1)); // Should return 9
console.log(uf.find(2)); // Should return 9
console.log(uf.find(6)); // Should return 9
console.log(uf.find(9)); // Should return 9
