const todoDB = require("../models/ToDO");

exports.AddItems = async (req, res) => {
  try {
    // const file = req.file;
    const files = req.files;
    // if (!file) {
    //   return res.status(400).json({ message: "No file uploaded" });
    // }
    const blogHeadingImage = files.blogHeadingImage?.[0]?.filename || null;
    const blogWriterImage = files.blogWriterImage?.[0]?.filename || null;
    const newItem = {
      ...req.body,
      // blogHeadingImage: file.filename, 
      // Save the uploaded file's filename
      blogHeadingImage,
      blogWriterImage,
    };

    const addedItem = await todoDB.create(newItem);

    return res.status(200).json({
      message: "Successful",
      newItem: addedItem,
    });
  } catch (error) {
    console.log(error);
    // return res.status(400).json(error);
   return res.status(400).json({ "ErrorMessage": error.message });
  }
};

exports.GetTodoItems = async (req, res) => {
 

  
  // const page = req.query.page || 1;
  const page = parseInt(req.query.page) || 1;  // Ensures page is a number

  const perPageRecords = 4;
  try {

    const skip = (page - 1) * perPageRecords;

    const totalItemsInDb = await todoDB.countDocuments();
    console.log("totalItemsInDb",totalItemsInDb)

    const getAllTodoItems = await todoDB.find().skip(skip).limit(perPageRecords);
    console.log("getAllTodoItems======>",getAllTodoItems.length);
    const totalPages = Math.ceil(totalItemsInDb/perPageRecords);


    
    res.status(200).json({perPageRecords,getAllTodoItems,totalItemsInDb,totalPages});
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.DeleteItems = async (req, res) => {
  const { itemid } = req.params;
  try {
    const deleteItem = await todoDB.findByIdAndDelete(itemid);
    if (!deleteItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json(deleteItem); // Return the deleted item
  } catch (error) {
    res.status(400).json({ message: "Failed to delete item", error });
  }
};

// exports.UpdateItem = async (req, res) => {
//   const {
//     blogsMainHeading,
//     blogMainDescription,
//     blogWriterName,
//     blogWriterIntro,
//     blogWriterLinkdeinLink,
//     blogImageBackgroundColor,
//     blogsPostDate,
//   } = req.body; // Extract updated name from the request body

//   // Check if a new file is uploaded
//   const file = req.file;
//   if (file) {
//     // If a new image is uploaded, save the filename
//     blogHeadingImage = file.filename;
//   }

//   try {
//     let itemid = req.params.itemid;

//     const findItems = await todoDB.findOne({ _id: itemid });
//     console.log("itemid", itemid);
//     console.log("findItems====>",findItems)
//     if (!findItems) {
//       return res.json({ error: "No such record found" });
//     }

//     let file = req.file ? req.file.filename : null;

//     findItems.blogsMainHeading = blogsMainHeading || findItems.blogsMainHeading;
//     findItems.blogMainDescription = blogMainDescription || findItems.blogMainDescription;
//     findItems.blogWriterName = blogWriterName || findItems.blogWriterName;
//     findItems.blogWriterIntro = blogWriterIntro || findItems.blogWriterIntro;
//     findItems.blogImageBackgroundColor = blogImageBackgroundColor || findItems.blogImageBackgroundColor;
//     findItems.blogWriterLinkdeinLink =
//       blogWriterLinkdeinLink || findItems.blogWriterLinkdeinLink;
//     findItems.blogsPostDate = blogsPostDate || findItems.blogsPostDate;

//     if (file) {
//       findItems.blogHeadingImage = file;
//     }

//     const BlogsUpdate = await todoDB.findOneAndUpdate(
//       { _id: itemid },
//       findItems,
//       { new: true }
//     );

//     return res.status(200).json({
//       message: "Updated successfully",
//       data: BlogsUpdate,
//     });
//   } catch (error) {
//     console.log("Error:", error);
//     return res.status(500).json({ error: "Unable to update the Product" });
//   }
// };


exports.UpdateItem = async (req, res) => {
  try {
    const { itemid } = req.params;
    const files = req.files;

    const updateData = {
      ...req.body,
    };

    if (files.blogHeadingImage) {
      updateData.blogHeadingImage = files.blogHeadingImage[0].filename;
    }
    if (files.blogWriterImage) {
      updateData.blogWriterImage = files.blogWriterImage[0].filename;
    }

    const updatedItem = await todoDB.findByIdAndUpdate(itemid, updateData, {
      new: true,
    });

    return res.status(200).json({
      message: "Updated successfully",
      data: updatedItem,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Unable to update the Product" });
  }
};


exports.getItemByid = async (req, res) => {
  const itemid = req.params.itemid;
  // console.log("itemid", itemid);
  try {
    const itemData = await todoDB.findOne({ _id: itemid });

    if (itemData) {
      // console.log("SingleItemToEdit", itemData);
      return res.status(200).json(itemData);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal error" });
  }
};
