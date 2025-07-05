"use server";
import { conncetToDB } from './utils';
import { User, Product } from './models';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import bcrypt from 'bcrypt';

export const addUser = async (formData) => {

    const {username, email, password, phone, address, isAdmin, isActive } = Object.fromEntries(formData);

    try {
        conncetToDB();
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
export const addProduct = async (formData) => {
    const { title, desc, price, stock, color, size } = Object.fromEntries(formData);

    try {
        conncetToDB();
        const newProduct = new Product({title, desc, price, stock, color, size});
        await newProduct.save();
    } catch (error) {
        console.log(error);
        throw new Error("Faild to create product!");
    }
    revalidatePath("/dashboard/products"); 
    redirect("/dashboard/products");
}
