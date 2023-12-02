class WeightedQuickUnionPC {
    constructor(n) {
        this.parent = Array.from({ length: n }, (_, index) => index);
        this.size = new Array(n).fill(1);
        this.groups = n;
    }

    root(i) {
        while (i !== this.parent[i]) {
            this.parent[i] = this.parent[this.parent[i]]; // Path compression
            i = this.parent[i];
        }
        return i;
    }

    union(p, q) {
        const rootP = this.root(p);
        const rootQ = this.root(q);

        if (rootP !== rootQ) {
            if (this.size[rootP] < this.size[rootQ]) {
                this.parent[rootP] = rootQ;
                this.size[rootQ] += this.size[rootP];
            } else {
                this.parent[rootQ] = rootP;
                this.size[rootP] += this.size[rootQ];
            }
            this.groups--;
        }
    }

    connected(p, q) {
        return this.root(p) === this.root(q);
    }

    allConnected() {
        return this.groups === 1;
    }
}

function findEarliestTimestamp(logFile) {
    const wqupc = new WeightedQuickUnionPC(n);
    let earliestTime = null;

    for (const entry of logFile) {
        const { timestamp, member1, member2 } = entry;
        if (!wqupc.connected(member1, member2)) {
            wqupc.union(member1, member2);
            if (wqupc.allConnected()) {
                earliestTime = timestamp;
                break;
            }
        }
    }

    return earliestTime;
}
