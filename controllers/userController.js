import User from "../models/User.js";
import generateId from "../helpers/generateId.js";
import generateJWT from "../helpers/generateJWT.js";
import forgotPasswordEmail from '../helpers/forgotPasswordEmail.js'
import registerEmail from '../helpers/registerEmail.js'

const register = async (req, res) => {
  const { email, name } = req.body;

  //prevent duplicated users
  const existUser = await User.findOne({ email });
  if (existUser) {
    const error = new Error("Usuario ya registrado");
    return res.status(400).json({ msg: error.message });
  }
  // saving user
  try {
    const user = new User(req.body);
    const userSaved = await user.save();
    // email to user
    registerEmail({
      email,
      name,
      token: userSaved.token
    })

    res.json(userSaved);
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  // check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error("El usuario no existe");
    return res.status(403).json({ msg: error.message });
  }
  // Confirmed user check
  if (!user.confirmed) {
    const error = new Error("El usuario no está confirmado");
    return res.status(403).json({ msg: error.message });
  }
  // Revisar el password
  if (await user.checkPassword(password)) {
    // Autenticar al usuario
    res.json({
      _id: user.id,
      nombre: user.name,
      email: user.email,
      token: generateJWT(user.id),
    });
  } else {
    const error = new Error("El password es incorrecto");
    return res.status(403).json({ msg: error.message });
  }
  return;
};

const confirmUser = async (req, res) => {
  const { token } = req.params;

  const userToConfirm = await User.findOne({ token });

  if (!userToConfirm) {
    const error = new Error("Token no válido");
    return res.status(404).json({ msg: error.message });
  }
  try {
    userToConfirm.token = null;
    userToConfirm.confirmed = true;
    await userToConfirm.save();
    res.json({ msg: "Usuario confirmado correctamente..." });
  } catch (error) {
    console.log(error);
  }
};

const forgotPassword = async (req, res) => {
  const {email} = req.body;
  const existUser = await User.findOne({email})
  if(!existUser){
    const error = new Error("No existe un usuario registrado con ese correo");
    return res.status(400).json({ msg: error.message });
  }
  try {
    existUser.token = generateId()
    await existUser.save()

    //Send an email with instructions to the user
    forgotPasswordEmail({
      email,
      name: existUser.name,
      token: existUser.token
    })
    res.json({msg: 'Hemos enviado un email con las instrucciones'})
  } catch (error) {
    console.log(error)
  }
  return;
};

const newPassword = async (req, res) => {
  const { token } = req.params;
  const {password} = req.body;

  const user = await User.findOne({token})
  if(!user){
    const error = new Error("Token no válido");
    return res.status(400).json({ msg: error.message });
  }
  
  try {
    user.token = null;
    user.password = password
    await user.save()
    return res.json({msg: 'Password modificado correctamente'})
  } catch (error) {
    console.log(error);
  }
  return;
};

const checkToken = async (req, res) => {
  const { token } = req.params

  const validToken = await User.findOne({token})
  if (!validToken){
    const error = new Error('Invalid Token')
    return res.status(400).json({msg:error.message})
  } else{
    return res.json('Valid token. User exists')
  }
};

const getAccount = async (req, res) => {
  const { user } = req;
  res.json(user);
};

const updateUser = async (req, res) => {
  const user = await User.findById(req.params.id)
  const {email} = req.body;
  if(!user){
    const error = new Error("Hubo un error ");
    return res.status(400).json({ msg: error.message });
  }
  //prevent duplicates
  if (req.body.email !== user.email) {
    const existUser = await User.findOne({email });
    if (existUser) {
      const error = new Error("Otro usuario ya registrado con ese correo");
      return res.status(400).json({ msg: error.message });
    }
  }

  try {
    user.name = req.body.name;
    user.email = req.body.email;
    const updatedUser = await user.save()
    return res.json(updatedUser);
  } catch (error) {
    console.log(error)
  }
  return;
}

const updatePassword = async (req, res) => {
  const {id} = req.user
  const {pwd_old, pwd_new} = req.body

  const user = await User.findById(id)
  if(!user){
    const error = new Error("Hubo un error");
    return res.status(400).json({ msg: error.message });
  }
  if( await user.checkPassword(pwd_old)){
    user.password = pwd_new;
    await user.save()
    res.json({msg: 'Password almacenado correctamente'})
  }else{
    const error = new Error('El password actual no es correcto')
    return res.status(400).json({msg : error.message})
  }
}

export {
  register,
  login,
  confirmUser,
  forgotPassword,
  newPassword,
  checkToken,
  getAccount,
  updateUser,
  updatePassword
};
