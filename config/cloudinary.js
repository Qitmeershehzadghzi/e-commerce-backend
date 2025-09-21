import {v2 as clodinary} from 'cloudinary'
const ConnectCloud =async()=>{
clodinary.config({
cloud_name:process.env.CLOUDINARY_Name,
api_key:process.env.CLOUDINARY_API_KEY,
api_secret:process.env.CLOUDINARY_SECRET_KEY,
api_url:process.env.CLOUDINARY_URL

})
}
export default ConnectCloud