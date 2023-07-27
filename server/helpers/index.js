const calculateAverageRate = (comments) => {
    if (!comments || comments.length === 0) {
        return 0;
    }

    const totalRate = comments.reduce((sum, comment) => sum + comment.rate, 0);
    return (totalRate / comments.length).toFixed(1);
};

module.exports = {
    calculateAverageRate
}