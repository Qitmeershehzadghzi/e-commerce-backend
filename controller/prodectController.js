
import multer from 'multer'


//  function for add product
export const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, Subcategory, sizes, bestseller } = req.body;

    // multer se images sahi se access karo
    const image1 = req.files?.image1 ? req.files.image1[0] : null;
    const image2 = req.files?.image2 ? req.files.image2[0] : null;
    const image3 = req.files?.image3 ? req.files.image3[0] : null;
    const image4 = req.files?.image4 ? req.files.image4[0] : null;

    console.log("Body:", name, description, price, category, Subcategory, sizes, bestseller);
    console.log("Files:", image1, image2, image3, image4);

    res.json({ success: true, message: "Product added successfully" });
  } catch (error) {
    console.log("❌ Error in addProduct:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// function for list product
export const listProduct =async (req,res)=>{

}
// function for remove product
export const removeProduct =async (req,res)=>{

}
// function for single product
export const singleProduct =async (req,res)=>{

}