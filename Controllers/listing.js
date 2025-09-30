const Listing = require("../models/listings");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');

const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

//Index
module.exports.index = async (req,res)=>{
    const allListings = await Listing.find();
    res.render("listings/index.ejs",{allListings});    
}

//Show category wise
module.exports.categoriseListing = async (req,res)=>{
    let {category} = req.params;
    category = category.charAt(0).toUpperCase() + category.slice(1);
    const listings = await Listing.find({category});
    res.render("listings/category.ejs",{listings});
}

//Show country wise
module.exports.countrySearch = async (req,res)=>{
    let {country} = req.query;
    let listings = await Listing.find({country});
    res.render("listings/country.ejs",{listings});
}

//New form
module.exports.newListingForm = (req,res)=>{
    res.render("listings/new.ejs");
}

//Show
module.exports.showListing = async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id).populate({
                                            path:"reviews",
                                            populate:{
                                                path:"author"
                                            }}).populate("owner");
    if(!listing){
        req.flash("error","Listing does not exist");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs",{listing});
}

//Create
module.exports.createListing = async (req,res)=>{
    let result = await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1
      })
    .send()

    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url, filename};
    newListing.geometry = result.body.features[0].geometry
    await newListing.save();
    req.flash("success","New listing created");
    res.redirect("/listings");
}

//Edit
module.exports.editListingForm = async (req,res)=>{
    let {id} = req.params;
    let editListing = await Listing.findById(id);
    if(!editListing){
        req.flash("error","Listing does not exist");
        return res.redirect("/listings");
    }
    let originalImageUrl = editListing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload","/upload/c_scale,h_200,w_250");
    res.render("listings/edit.ejs",{editListing, originalImageUrl});
}

//Update
module.exports.updateListing = async(req,res)=>{
    let result = await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1
      })
    .send()

    let {id} = req.params;
    let listing = await Listing.findById(id);
    let updateListing = req.body.listing;

    if(typeof req.file!=="undefined"){
    let url = req.file.path;
    let filename = req.file.filename;
    updateListing.image = {url,filename};
    }
    await Listing.findByIdAndUpdate(id,updateListing,{runValidators:true,new:true});
    listing.geometry = result.body.features[0].geometry;
    await listing.save();
    req.flash("success","Listing updated");
    res.redirect(`/listings/${id}`); 
}

//Delete
module.exports.deleteListing = async(req,res)=>{
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    req.flash("success","Listing deleted");
    console.log(deletedListing);
    res.redirect("/listings");
}