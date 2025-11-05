const throw_if = (condition, error) => {
    if(condition){
        throw error;
    }
}

module.exports = {
    throw_if
}