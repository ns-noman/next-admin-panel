"use server";

import { revalidatePath } from "next/cache";
import { Product, User } from "./models";
import { connectToDB } from "./utils";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { signIn } from "../auth";

export const addUser = async (formData) => {

    const {username, email, password, phone, address, isAdmin, isActive } = Object.fromEntries(formData);

    try {
        connectToDB();
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({username, email, password: hashedPassword, phone, address, isAdmin, isActive });
        await newUser.save();
    } catch (error) {
        console.log(error);
        throw new Error("Faild to create user!");
    }
    revalidatePath("/dashboard/users"); 
    redirect("/dashboard/users");
}

export const updateUser = async (formData) => {

    const {id, username, email, password, phone, address, isAdmin, isActive } = Object.fromEntries(formData);

    try {
        connectToDB();

        const updateFields = {
            username, email, password, phone, address, isAdmin, isActive,
        }

        Object.keys(updateFields).forEach((key)=>{
            (updateFields[key] === "" || updateFields[key] === undefined) && delete updateFields[key];
        });

        await User.findByIdAndUpdate(id, updateFields);

    } catch (error) {
        console.log(error);
        throw new Error("Faild to Update user!");
    }
    revalidatePath("/dashboard/users"); 
    redirect("/dashboard/users");
}

export const addProduct = async (formData) => {
    const { title, desc, price, stock, color, size } = Object.fromEntries(formData);

    try {
        connectToDB();
        const newProduct = new Product({title, desc, price, stock, color, size});
        await newProduct.save();
    } catch (error) {
        console.log(error);
        throw new Error("Faild to create product!");
    }
    revalidatePath("/dashboard/products"); 
    redirect("/dashboard/products");
}
export const updateProduct = async (formData) => {

    const {id, title, desc, price, stock, color, size } = Object.fromEntries(formData);

    try {
        connectToDB();

        const updateFields = {
            id, title, desc, price, stock, color, size,
        }

        Object.keys(updateFields).forEach((key)=>{
            (updateFields[key] === "" || updateFields[key] === undefined) && delete updateFields[key];
        });

        await Product.findByIdAndUpdate(id, updateFields);

    } catch (error) {
        console.log(error);
        throw new Error("Faild to Update product!");
    }
    revalidatePath("/dashboard/products"); 
    redirect("/dashboard/products");
}

export const deleteProduct = async (formData) => {
    const { id } = Object.fromEntries(formData);
    try {
        connectToDB();
        await Product.findByIdAndDelete(id);
    } catch (error) {
        console.log(error);
        throw new Error("Faild to delete product!");
    }
    revalidatePath("/dashboard/products"); 
    redirect("/dashboard/products");
}
export const deleteUser = async (formData) => {
    const { id } = Object.fromEntries(formData);
    try {
        connectToDB();
        await User.findByIdAndDelete(id);
    } catch (error) {
        console.log(error);
        throw new Error("Faild to delete user!");
    }
    revalidatePath("/dashboard/users"); 
    redirect("/dashboard/users");
}

export const authenticate = async (prevState, formData) => {
  try {
    const { username, password } = Object.fromEntries(formData);
    await signIn("credentials", { username, password ,redirect: false });
  } catch (err) {
    console.log(err);
    
    if (err.message.includes("CredentialsSignin")) {
      return "Wrong Credentials";
    }
  }
};