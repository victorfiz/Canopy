export function multiSplice({mainArray, spliceIndices}) {
    // Sort spliceIndices in descending order
    // This is necessary to avoid changing the index of elements yet to be spliced
    spliceIndices.sort((a, b) => b - a);
    
    // Splice elements from the mainArray
    for (let index of spliceIndices) {
        if (index >= 0 && index < mainArray.length) {
            mainArray.splice(index, 1);
        }
    }
    return {mainArray};
}

