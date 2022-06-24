import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { apiHandler } from "helpers/api-handler";
import { ObjectId } from "mongodb";

export default apiHandler({
    post: handler
})

async function handler({ req, res, usersCollection, listsCollection }) {
    const { userCreds } = req.body;

    const exist = await usersCollection.findOne({ email: userCreds.email })
    if (exist) throw "User already exists";

    const hashedPassword = await bcrypt.hash(userCreds.password, 12);
    const userId = new ObjectId();

    const newList = {
        questions: [],
        ownerId: userId,
        name: 'My First List',
        access: 'Private',
        ownerName: userCreds.username,
        likes: 0
    }
    const insertList = await listsCollection.insertOne(newList);
    
    const newUser = {
        _id: userId,
        uuid: uuidv4(),
        username: userCreds.username,
        email: userCreds.email,
        password: hashedPassword,
        defaultList: insertList.insertedId.toString()
    }
    const insertUser = await usersCollection.insertOne(newUser);

    const token = jwt.sign({ id: insertUser.insertedId }, process.env.SECRET);

    newUser.id = insertUser.insertedId;
    newUser.token = token;
    delete newUser.uuid;
    delete newUser.password;
    delete newUser._id;
    return res.status(200).json(newUser);
}