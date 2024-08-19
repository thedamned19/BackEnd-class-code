import {usersModel} from "../DAO/models/usersModel.js";


export const register = async(req=request, res=responseb) => {
    console.log("llegué aca controller")
    let {first_name, last_name, age, e_mail, password} = req.body;
    console.log(first_name)
    if(!first_name || !last_name || !age || e_mail || !password){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Complete name, email and password`})
    }

    let exists = await usersModel.getBy({e_mail})
    if(exists){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`It already exists ${e_mail}`})
    }

    // validar que el mail sea correcto...

    password=generaHash(password);

    try {
        let newUser = await usersModel.create({first_name, last_name, e_mail, age, password, cart, role:"user"});
        res.setHeader('Content-Type','application/json');
        res.status(200).json({ message:"Successful registration...!!!", newUser });
    } catch (error) {
        console.log(error);
        res.setHeader('Content-Type','application/json');
        return res.status(500).json(
            {
                error:`Unexpected server error - Try again later, or contact your administrator`,
                detalle:`${error.message}`
            }
        )
    }

}