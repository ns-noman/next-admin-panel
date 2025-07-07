import { updateProduct } from "@/app/lib/actions";
import { fetchProduct } from "@/app/lib/data";
import styles from "@/app/ui/dashboard/products/singleProduct/singleProduct.module.css";
import Image from "next/image";

const SingleProduct = async ({params}) => {

  const {id} = params;
  const product = await fetchProduct(id);

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src="/noavatar.png" alt="" fill />
        </div>
        {product.title}
      </div>
      <div className={styles.formContainer}>
        <form action={updateProduct} className={styles.form}>
        <label>Title</label>
        <input type="text" placeholder={product.title} name="title"/>
        <label>Cat</label>
        <select name="cat" id="cat">
          <option value="general">Choose a Category</option>
          <option value="kitchen">Kitchen</option>
          <option value="phone">Phone</option>
          <option value="computer">Computer</option>
        </select>
        <label>Price</label>
        <input type="number" placeholder={product.price} name="price" />
        <label>Stock</label>
        <input type="number" placeholder={product.stock} name="stock" />
        <label>Color</label>
        <input type="text" placeholder="color" name="color" />
        <label>Size</label>
        <input type="text" placeholder="size" name="size" />
        <label>Description</label>
        <textarea name="desc" id="desc" rows="16" placeholder={product.desc}></textarea>
        <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default SingleProduct;