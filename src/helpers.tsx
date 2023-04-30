// NOTE: This is a temporary function used to generate unique ids for component keys
// TODO: Use database keys once backend is implemented
function genUniqueId() {
    return Math.random();
}

export default genUniqueId;