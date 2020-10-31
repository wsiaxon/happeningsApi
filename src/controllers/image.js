const model = require('../models');
const { NotFoundError, ApplicationError } = require('../helpers/error');
const paginator = require('../helpers/paginator');
const upload = require('../services/image-upload');
const { Image } = model;

const singleUpload = upload.single('image');
module.exports = {
  uploadImage: async (req, res, next) => {
    singleUpload(req, res, async (err, doc) => {
      // console.log("UPLOAD RESULT: ", doc);
      if (err) {
        next(new ApplicationError(422, `Image Upload Error. ${err.message}`));
      }
      
      const imageResponse = await Image.create({url: req.file.location});
      return res.json({
        status: 'done',
        message: 'Image uploaded successfully',
        result: imageResponse
        });
    });
  },
  
  // uploadImage: (req, res) => {
  //   let result = await singleUpload(req, res);
  //   console.log("Upload Result", result);
  //   try{
  //     const imageResponse = await Image.create({url: req.file.location});
  //     return res.json({
  //       status: 'done',
  //       message: 'Image uploaded successfully',
  //       result: null
  //       });
  //   }
  //   catch(err){
  //     throw new ApplicationError(422, `Image Upload Error. ${err.message}`);
  //   }
  // },

  getAllImages: async (request, response) => {
    const { skip = 0, limit = 10 } = request.query;

    const { data, count } = await paginator(Image, { skip, limit, exclude: ['metadata'] });

    return response.status(200).json({
      status: 'success',
      result: {
        items: data,
        totalCount: count,
        skip: +skip,
        limit: +limit,
      }
    });
  },

  getPagedImages: async (request, response) => {
    const { skip = 1, limit = 10 } = request.query;

    const { data, count } = await paginator(Image, { skip, limit });

    return response.status(200).json({
      status: 'success',
      result: data,
      count,
      skip: +skip,
      limit: +limit,
    });
  },
  
  getImageById: async (request, response) => {
    const { id } = request.params;

    const image = await Image.findByPk(id);

    if (!image) throw new NotFoundError(`image with id ${id} doesn't exist`);

    return response.status(200).json({
      status: 'success',
      result: image.toJSON(),
    });
  },

  /**
   * @function editImage
   * @description controller for editing a image
   *
   * @todo check model, middleware and controller✅
   * @todo add more validation
   *
   * @param {Object} request
   * @param {Object} response
   *
   * @returns {Object} callback that executes the controller
   */
  editImage: async (request, response) => {
    const { id, name } = request.body;
    const { requestId } = request.params;
    if(id !== parseInt(requestId))
      throw new ApplicationError(400, "Id parameters do not match")

    const imageResponse = await Image.updateImage(request.body);

    return response.status(200).json({
      status: 'success',
      message: 'story successfully updated',
      result: imageResponse.dataValues,
    });
  },
};
