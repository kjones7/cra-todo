let counter = 0;

// NOTE: This is a temporary function used to generate unique numbers for component keys
// TODO: Use database keys once backend is implemented
function genUniqueId() {
    counter += 1;
    return counter;
}

export default genUniqueId;