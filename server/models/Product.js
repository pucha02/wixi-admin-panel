import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    type: { type: String },
    description: { type: String, default: null },
    cost: { type: String },
    discount: {
        percentage: { type: Number, default: 0 }, 
        startDate: { type: Date }, 
        endDate: { type: Date } 
    },
    color: [
        {
            color_name: { type: String },
            sizes: [{
                size_name: { type: String }
            }],
            img: [{
                img_link: { type: String }
            }]
        }
    ]
});

const Product = mongoose.model('Product', productSchema);

export default Product;