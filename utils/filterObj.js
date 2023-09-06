const filterObj = (obj, ...allowedField) => {
    const newObj = {};
    Object.keys(obj).forEach((el) => {
        if(allowedFields.includes(el)) newObj[el] = onj[el];
    });
    return newObj;
}

module.exports = filterObj;