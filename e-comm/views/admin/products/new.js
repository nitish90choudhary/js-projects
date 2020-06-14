const layout = require('../layout');
const {
    getError
} = require('../../helper');

module.exports = ({
    errors
}) => {
    return layout({
        content: `
        <form method="POST" enctype="multipart/form-data">
            <div>
                <input name="productName" placeholder="Title"/ >
                ${getError(errors,'productName')}
                <input name="price" placeholder="Price"/ >
                ${getError(errors,'price')}
                <input name="image"  type="file"/ >
                <button>Create Product</button>
            </div>
        </form>
        `
    })

};