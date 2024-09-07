import express from 'express' 
import { scheduleJob} from 'node-schedule'
import { User } from './database/index.js'
import cloudinary from './src/utils/constant/cloudinary.js'
import { bootstrap } from './src/modules/bootstrp.js'
import { dbConn } from './database/dbConnection.js'


const app = express()
const port = 3000


app.use("/uploads", express.static("uploads"));
app.use(express.json())

bootstrap(app)

scheduleJob('1 2 1 * * *', async() => {
    const users = await User.find({ isDeleted: true, updatedAt: { $lte: Date.now()- 3 * 30 * 24 * 60 * 60 * 1000}})
    let userIds = []
    for (const user of users) {
        await cloudinary.uploader.destroy(user.image.public_id)
        userIds.push(user._id)
    }
    User.deleteMany({ $in: userIds})
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))