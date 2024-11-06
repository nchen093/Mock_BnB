// const express = require('express');
// const { Op } = require("sequelize");
// const { check } = require("express-validator");
// const bcrypt = require("bcryptjs");
// const { handleValidationErrors } = require("../../utils/validation");
// const { setTokenCookie, requireAuth } = require("../../utils/auth");
// const {validateLogin,authenticateUser } = require('../api/session');


// const {
//     User,
//     Review,
//     ReviewImage,
//     Spot,
//     SpotImage,
//     Booking,
//   } = require("../../db/models");

//   const router = express.Router();

// // Get all Spots owned by the Current User
// //   router.get('/users/:userId/spots', async(req, res) => {
// //     const { userId } = req.params;
// //     try {
// //         const owned = await Spot.findAll({
// //             where: {
// //                 ownerId: userId
// //               },
// //             attributes: [
// //                 'id',
// //                 'ownerId',
// //                 'address',
// //                 'city',
// //                 'state',
// //                 'country',
// //                 'lat',
// //                 'lng',
// //                 'name',
// //                 'description',
// //                 'price',
// //                 'createdAt',
// //                 'updatedAt',
// //                 'avgRating',
// //                 'previewImage'
// //             ],
// //         })
// //         return res.json({Spots: owned})

// //     }catch(e) {
// //         console.error(e)
// //         res.status(500)
// //         return res.json({"error": 'An error occured while fetching spots'})
// //     }
// //   })


//   // GET details of a Spot from an id
//   router.get('/:spotId', async(req, res)=> {
//     const {spotId} = req.params; 
//     try{
//         const spot = await Spot.findByPk(spotId, {
//             attributes: [
//                 'id',
//                 'ownerId',
//                 'address',
//                 'city',
//                 'state',
//                 'country',
//                 'lat',
//                 'lng',
//                 'name',
//                 'description',
//                 'price',
//                 'createdAt',
//                 'updatedAt',

//             ],
//             include: [
//                 {
//                     model: SpotImage,
//                     attributes: ['id', 'imageUrl', 'preview']
//                 },
//                 {
//                     model: User,
//                     as: 'Owner',
//                     attributes: ['id', 'firstName', 'lastName'],
//                 },
//             ],
//         });
        
//         if(!spot) {
//             res.status(404);
//             return res.json({ "message": "Spot couldn't be found" });
            
//         }

//         // calcuate the numReviews and AvgStarRating
//         const reviews = await Review.findAll({
//             where: {
//               spotId: spotId,
//             },
//             attributes: ['stars'],
//           });

//           // calculate the avg of staring for a spot
//           const sumStars = await reviews.reduce((sum, review) => sum + review.dataValues.stars, 0);
//           const avgStarRating = sumStars / reviews.length;

//           // calcuate the number of reivews
//           const numReviews = reviews.length;


//           return res.json({
//             ...spot.toJSON(),
//             numReviews,
//             avgStarRating
//           })

//     } catch (e) {
//         console.error(e);
//         res.status(500)
//         return res.json({ "error": 'An error occured while fetching spots' })
//     }
//   })

//   // Delete a spot
//   router.delete('/:spotId', async (req, res) => {
//     const { spotId } = req.params;
    
//     try {
//     const removeSpot = await Spot.findByPk(spotId);

//     if(!removeSpot) {
//         return res.status(404).json({ "message": "Spot couldn't be found"})
//     }

//     await removeSpot.destroy();

//     return res.status(200).json({"message": "Successfully deleted"})
    
//     } catch (e) {
//     console.error(e);
//     res.status(500)
//     return res.json({error: 'An error occured while fetching spots'})

// }
//   });

//   // Create a spot

//   router.post("/", [
//     check('address').notEmpty().withMessage('Street address is required'),
//     check('city').notEmpty().withMessage('City is required'),
//     check('state').notEmpty().withMessage('State is required'),
//     check('country').notEmpty().withMessage('Country is required'),
//     check('lat').isDecimal({ min: -90, max: 90 }).withMessage('Latitude must be within -90 and 90'),
//     check('lng').isDecimal({ min: -180, max: 180 }).withMessage('Longitude must be within -180 and 180'),
//     check('name').isLength({ max: 50 }).withMessage('Name must be less than 50 characters'),
//     check('description').notEmpty().withMessage('Description is required'),
//     check('price').isDecimal({ min: 0 }).withMessage('Price per day must be a positive number'),
//   ], 
    
//     handleValidationErrors, 
//     async (req, res) => {
//         const { user } = req;
//         if (!user) {
//             return res.status(401).json({ message: "Unauthorized" });
//         }
//         const { address, city, state, country, lat, lng, name, description, price } = req.body;
//         try {
//         // Build the new Spot instance from the request body
//         const spot = await Spot.create({
//           address,
//           city,
//           state,
//           country,
//           lat,
//           lng,
//           name,
//           description,
//           price,

//         });

//         return res.status(201).json(spot);

//       } catch(e) {
//         console.error(e); 
//         return res.status(500).json({ error: 'An unexpected error occurred while creating the spot.' });
//         }
//       });
//   // GET all Spots
//   router.get('/', async(req, res) => {
//     try {
//         const Spots = await Spot.findAll();
//         return res.json({ Spots });
//     }catch(e) {
//         console.error(e);
//         res.status(500);
//         return res.json({ error: 'An error occured while fetching spots' })
//     }
//   })


  
//   module.exports = router;
